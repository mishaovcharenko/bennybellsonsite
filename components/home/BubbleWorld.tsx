"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BubbleModalType } from "@/lib/types";
import { bubbles, getBubbleRadius } from "@/data/bubbles";
import {
  createBubbleBodies,
  createEngine,
  createWalls,
  getBodyPositions,
  getBodyAtPoint,
  getGridLayout,
  getInitialPositions,
  removeWalls,
  clampBodiesToBounds,
  GRAVITY_ON,
  type PhysicsBubbleBody,
} from "@/lib/physics";
import { PhysicsBubble } from "./PhysicsBubble";
import { NoiseOverlay } from "./NoiseOverlay";
import { GlassOverlay } from "@/components/modals/GlassOverlay";
import { ListenModalContent } from "@/components/modals/ListenModal";
import { ShowsModalContent } from "@/components/modals/ShowsModal";
import { InfoModalContent } from "@/components/modals/InfoModalContent";
import { HistoryModalContent } from "@/components/modals/HistoryModalContent";
import { UnreleasedModalContent } from "@/components/modals/UnreleasedModalContent";
import { TNLModalContent } from "@/components/modals/TNLModalContent";

const POINTER_HISTORY_MS = 100;
const THROW_VELOCITY_SCALE = 0.06;
const THROW_MAX_SPEED = 14;
const TAP_SPEED_THRESHOLD = 20;
const SUPPRESS_CLICK_MS = 220;

const TRAIL_LENGTH = 10;
const TRAIL_MIN_DISTANCE = 12;

interface TrailDot {
  x: number;
  y: number;
  radius: number;
}

export function BubbleWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number; radius: number }>>({});
  const [mounted, setMounted] = useState(false);
  const [activeModal, setActiveModal] = useState<BubbleModalType | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [gravityOn, setGravityOn] = useState(false);
  const [trails, setTrails] = useState<Record<string, TrailDot[]>>({});

  const engineRef = useRef<ReturnType<typeof createEngine> | null>(null);
  const bodiesRef = useRef<PhysicsBubbleBody[]>([]);
  const wallsRef = useRef<import("matter-js").Body[]>([]);
  const rafRef = useRef<number>(0);
  const MatterRef = useRef<typeof import("matter-js") | null>(null);
  const boundsRef = useRef({ width: 0, height: 0 });
  const pointerHistoryRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const suppressNextClickRef = useRef(false);
  const grabbedBodyRef = useRef<import("matter-js").Body | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const didDragRef = useRef(false);
  const trailsRef = useRef<Record<string, TrailDot[]>>({});
  const resetTargetsRef = useRef<Map<string, { x: number; y: number }> | null>(null);

  const handlePointerDown = useCallback((e: { clientX: number; clientY: number }) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const Matter = MatterRef.current;
    const bodies = bodiesRef.current;
    if (!Matter || bodies.length === 0) {
      pointerHistoryRef.current = [{ x, y, t: performance.now() }];
      return;
    }
    const body = getBodyAtPoint(Matter, bodies, x, y);
    pointerStartRef.current = { x, y };
    didDragRef.current = false;
    if (body) {
      grabbedBodyRef.current = body;
      dragOffsetRef.current = { x: x - body.position.x, y: y - body.position.y };
      resetTargetsRef.current = null;
    }
    pointerHistoryRef.current = [{ x, y, t: performance.now() }];
  }, []);

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const body = grabbedBodyRef.current;
    const Matter = MatterRef.current;
    if (body && Matter) {
      Matter.Body.setPosition(body, {
        x: x - dragOffsetRef.current.x,
        y: y - dragOffsetRef.current.y,
      });
      if (!didDragRef.current && pointerStartRef.current) {
        const dx = x - pointerStartRef.current.x;
        const dy = y - pointerStartRef.current.y;
        if (dx * dx + dy * dy > 25) didDragRef.current = true;
      }
      const now = performance.now();
      const history = pointerHistoryRef.current;
      history.push({ x, y, t: now });
      const cut = now - POINTER_HISTORY_MS;
      while (history.length > 1 && history[0].t < cut) history.shift();
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    const body = grabbedBodyRef.current;
    grabbedBodyRef.current = null;
    const wasDrag = didDragRef.current;
    didDragRef.current = false;
    pointerStartRef.current = null;
    const Matter = MatterRef.current;
    const history = pointerHistoryRef.current;

    if (wasDrag) {
      suppressNextClickRef.current = true;
      setTimeout(() => { suppressNextClickRef.current = false; }, SUPPRESS_CLICK_MS);
    }

    if (body && Matter && history.length >= 2) {
      const now = performance.now();
      const recent = history.filter((p) => now - p.t < POINTER_HISTORY_MS);
      if (recent.length >= 2) {
        const last = recent[recent.length - 1];
        const first = recent[0];
        const dt = (last.t - first.t) / 1000;
        if (dt > 0) {
          let vx = ((last.x - first.x) / dt) * THROW_VELOCITY_SCALE;
          let vy = ((last.y - first.y) / dt) * THROW_VELOCITY_SCALE;
          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > THROW_MAX_SPEED) {
            const f = THROW_MAX_SPEED / speed;
            vx *= f;
            vy *= f;
          }
          if (speed > 1) {
            requestAnimationFrame(() => {
              if (body && MatterRef.current) MatterRef.current.Body.setVelocity(body, { x: vx, y: vy });
            });
          }
        }
      }
    }
    pointerHistoryRef.current = [];
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hintDismissed) return;
    const t = setTimeout(() => setHintDismissed(true), 4500);
    return () => clearTimeout(t);
  }, [hintDismissed]);

  const dismissHint = useCallback(() => setHintDismissed(true), []);

  const handleModeButton = useCallback(() => {
    if (!gravityOn) {
      resetTargetsRef.current = null;
      if (engineRef.current) engineRef.current.gravity.y = GRAVITY_ON;
      setGravityOn(true);
    } else {
      const engine = engineRef.current;
      const Matter = MatterRef.current;
      const bodies = bodiesRef.current;
      const { width: w, height: h } = boundsRef.current;
      if (!engine || !Matter || bodies.length === 0 || w <= 0 || h <= 0) return;
      engine.gravity.y = 0;
      setGravityOn(false);
      grabbedBodyRef.current = null;
      const homePositions = getInitialPositions(bubbles, w, h);
      const posById = new Map(bubbles.map((b, i) => [b.id, homePositions[i]]));
      const randomOffset = () => (Math.random() - 0.5) * 40;
      const targets = new Map<string, { x: number; y: number }>();
      bodies.forEach(({ body, config, radius }) => {
        if (body.isStatic) return;
        const pos = posById.get(config.id);
        if (!pos) return;
        const x = Math.max(radius, Math.min(w - radius, pos.x + randomOffset()));
        const y = Math.max(radius, Math.min(h - radius, pos.y + randomOffset()));
        targets.set(config.id, { x, y });
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
      });
      resetTargetsRef.current = targets;
    }
  }, [gravityOn]);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const el = containerRef.current;
    let rafId = 0;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    function initPhysics(w: number, h: number) {
      if (w <= 0 || h <= 0) return;
      boundsRef.current = { width: w, height: h };

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        const posList = getInitialPositions(bubbles, w, h);
        const pos: Record<string, { x: number; y: number; radius: number }> = {};
        bubbles.forEach((b, i) => {
          const p = posList[i];
          if (p) pos[b.id] = p;
        });
        setPositions(pos);
        return;
      }

      const Matter = require("matter-js") as typeof import("matter-js");
      MatterRef.current = Matter;
      const engine = createEngine(Matter);
      engineRef.current = engine;
      const bodies = createBubbleBodies(Matter, engine.world, bubbles, w, h);
      bodiesRef.current = bodies;
      wallsRef.current = createWalls(Matter, engine.world, w, h);

      let last = performance.now();
      function tick() {
        const now = performance.now();
        const delta = Math.min(now - last, 50);
        last = now;
        const grabbed = grabbedBodyRef.current;
        if (grabbed) Matter.Body.setVelocity(grabbed, { x: 0, y: 0 });
        Matter.Engine.update(engine, delta);

        const targets = resetTargetsRef.current;
        if (targets && targets.size > 0) {
          for (const { body, config } of bodies) {
            if (body.isStatic) continue;
            const target = targets.get(config.id);
            if (!target) continue;
            const dx = target.x - body.position.x;
            const dy = target.y - body.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.5) {
              Matter.Body.setPosition(body, target);
              Matter.Body.setVelocity(body, { x: 0, y: 0 });
              targets.delete(config.id);
            } else {
              Matter.Body.setPosition(body, {
                x: body.position.x + dx * 0.1,
                y: body.position.y + dy * 0.1,
              });
              Matter.Body.setVelocity(body, { x: 0, y: 0 });
            }
          }
          if (targets.size === 0) resetTargetsRef.current = null;
        }

        clampBodiesToBounds(Matter, bodies, boundsRef.current.width, boundsRef.current.height);
        const bodyPositions = getBodyPositions(bodies);
        const newTrails = trailsRef.current;
        for (const bp of bodyPositions) {
          const body = bodies.find((b) => b.config.id === bp.id)?.body;
          const speed = body ? Math.hypot(body.velocity.x, body.velocity.y) : 0;
          const isMoving = speed > 0.5 || (grabbed && body === grabbed);
          const prev = newTrails[bp.id];
          if (isMoving) {
            const tail = prev?.[prev.length - 1];
            if (!tail || Math.hypot(bp.x - tail.x, bp.y - tail.y) > TRAIL_MIN_DISTANCE) {
              const arr = prev ?? [];
              arr.push({ x: bp.x, y: bp.y, radius: bp.radius });
              if (arr.length > TRAIL_LENGTH) arr.shift();
              newTrails[bp.id] = arr;
            }
          } else if (prev && prev.length > 0) {
            prev.shift();
            if (prev.length === 0) delete newTrails[bp.id];
          }
        }
        trailsRef.current = newTrails;
        setTrails({ ...newTrails });
        setPositions(
          bodyPositions.reduce(
            (acc, p) => { acc[p.id] = { x: p.x, y: p.y, radius: p.radius }; return acc; },
            {} as Record<string, { x: number; y: number; radius: number }>
          )
        );
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    function onResize() {
      const rect = el.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) return;
      if (!engineRef.current) {
        initPhysics(w, h);
        return;
      }
      boundsRef.current = { width: w, height: h };
      const M = MatterRef.current!;
      removeWalls(M, engineRef.current!.world, wallsRef.current);
      wallsRef.current = createWalls(M, engineRef.current!.world, w, h);

      const { scale } = getGridLayout(w, h);

      bodiesRef.current.forEach((entry) => {
        const newRadius = getBubbleRadius(entry.config.size) * scale;
        const scaleFactor = newRadius / entry.radius;
        if (scaleFactor !== 1) {
          M.Body.scale(entry.body, scaleFactor, scaleFactor);
          entry.radius = newRadius;
        }
        if (entry.body.isStatic) {
          M.Body.setPosition(entry.body, { x: w / 2, y: h / 2 });
        } else {
          M.Body.setPosition(entry.body, {
            x: Math.max(newRadius, Math.min(w - newRadius, entry.body.position.x)),
            y: Math.max(newRadius, Math.min(h - newRadius, entry.body.position.y)),
          });
        }
      });
    }

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onResize, 50);
    });
    ro.observe(el);
    onResize();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(rafId);
      if (MatterRef.current && engineRef.current) {
        MatterRef.current.Composite.clear(engineRef.current.world, true);
        MatterRef.current.Engine.clear(engineRef.current);
      }
      engineRef.current = null;
      bodiesRef.current = [];
      wallsRef.current = [];
      grabbedBodyRef.current = null;
    };
  }, [mounted]);

  if (!mounted) {
    return <div className="fixed inset-0 bg-black" aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bubble-world-bg overflow-hidden touch-none"
      onPointerDown={(e) => { handlePointerDown(e); dismissHint(); }}
      onPointerMove={(e) => { handlePointerMove(e); dismissHint(); }}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="fixed top-6 right-6 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={handleModeButton}
          className="px-4 py-2 text-[11px] tracking-wide uppercase text-white/50 hover:text-white/80 border border-white/10 hover:border-white/25 rounded-sm backdrop-blur-sm bg-white/[0.03] transition-all"
          aria-label={gravityOn ? "Reset layout" : "Enable gravity"}
        >
          {gravityOn ? "Reset" : "Gravity"}
        </button>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-10">
        <h1 className="text-white/40 text-sm font-serif font-normal">Benny Bellson</h1>
        <AnimatePresence>
          {!hintDismissed && (
            <motion.p
              className="text-white/30 text-xs font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Drag a bubble to move it
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(0)" }}>
        {bubbles.map((config) => {
          const trail = trails[config.id];
          if (!trail || trail.length < 2) return null;
          return trail.slice(0, -1).map((dot, i) => {
            const progress = (i + 1) / trail.length;
            const size = dot.radius * 2;
            const opacity = progress * 0.18;
            return (
              <span
                key={`${config.id}-trail-${i}`}
                className="absolute rounded-full bg-white pointer-events-none"
                style={{
                  left: dot.x - size / 2,
                  top: dot.y - size / 2,
                  width: size,
                  height: size,
                  opacity,
                }}
              />
            );
          });
        })}
        {bubbles.map((config) => {
          const pos = positions[config.id];
          if (!pos) return null;
          return (
            <PhysicsBubble
              key={config.id}
              config={config}
              x={pos.x}
              y={pos.y}
              radius={pos.radius}
              onModalOpen={setActiveModal}
              suppressNextClickRef={suppressNextClickRef}
            />
          );
        })}
      </div>
      <NoiseOverlay />
      <div className="vignette-overlay" aria-hidden />

      <GlassOverlay isOpen={activeModal === "listen"} onClose={() => setActiveModal(null)} title="Listen Now">
        <ListenModalContent />
      </GlassOverlay>
      <GlassOverlay isOpen={activeModal === "shows"} onClose={() => setActiveModal(null)} title="Shows">
        <ShowsModalContent />
      </GlassOverlay>
      <GlassOverlay isOpen={activeModal === "info"} onClose={() => setActiveModal(null)} title="Info">
        <InfoModalContent />
      </GlassOverlay>
      <GlassOverlay isOpen={activeModal === "history"} onClose={() => setActiveModal(null)} title="History">
        <HistoryModalContent />
      </GlassOverlay>
      <GlassOverlay isOpen={activeModal === "unreleased"} onClose={() => setActiveModal(null)} title="Unreleased">
        <UnreleasedModalContent />
      </GlassOverlay>
      <GlassOverlay isOpen={activeModal === "tnl"} onClose={() => setActiveModal(null)} title="TNL">
        <TNLModalContent />
      </GlassOverlay>
    </div>
  );
}
