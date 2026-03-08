import type Matter from "matter-js";
import type { BubbleConfig } from "@/lib/types";
import { getBubbleRadius } from "@/data/bubbles";

const WALL_THICKNESS = 60;
const BODY_OPTIONS = {
  restitution: 0.4,
  friction: 0.005,
  frictionAir: 0.02,
  density: 0.001,
};

/** Gravity magnitude when Gravity button is on (only affects dynamic bodies; BB is static). */
export const GRAVITY_ON = 1.2;

export interface PhysicsBubbleBody {
  body: Matter.Body;
  config: BubbleConfig;
  radius: number;
}

const DESIGN_MAX_RADIUS = 210;

/**
 * Scale bubbles linearly with viewport. Layout needs 3 columns and 4 rows,
 * so maxRadius is derived from whichever dimension is tighter.
 */
export function getGridLayout(w: number, h: number): { scale: number; maxRadius: number } {
  const maxRadius = Math.min(w / 6, h / 6.5);
  const scale = maxRadius / DESIGN_MAX_RADIUS;
  return { scale, maxRadius };
}

/** Desktop (landscape) spawn positions. */
const SPAWN_DESKTOP: Record<string, { xPct: number; yPct: number }> = {
  unreleased: { xPct: 0.42, yPct: 0.12 },
  listen:     { xPct: 0.12, yPct: 0.48 },
  history:    { xPct: 0.52, yPct: 0.76 },
  twitter:    { xPct: 0.28, yPct: 0.28 },
  bb:         { xPct: 0.50, yPct: 0.46 },
  shows:      { xPct: 0.88, yPct: 0.30 },
  watch:      { xPct: 0.62, yPct: 0.22 },
  merch:      { xPct: 0.80, yPct: 0.82 },
  info:       { xPct: 0.72, yPct: 0.56 },
  tnl:        { xPct: 0.30, yPct: 0.76 },
};

/** Mobile (portrait) spawn positions. */
const SPAWN_MOBILE: Record<string, { xPct: number; yPct: number }> = {
  unreleased: { xPct: 0.45, yPct: 0.10 },
  listen:     { xPct: 0.18, yPct: 0.42 },
  history:    { xPct: 0.54, yPct: 0.68 },
  twitter:    { xPct: 0.28, yPct: 0.26 },
  bb:         { xPct: 0.50, yPct: 0.46 },
  shows:      { xPct: 0.85, yPct: 0.24 },
  watch:      { xPct: 0.62, yPct: 0.26 },
  merch:      { xPct: 0.82, yPct: 0.78 },
  info:       { xPct: 0.74, yPct: 0.56 },
  tnl:        { xPct: 0.22, yPct: 0.74 },
};

function getSpawnPositions(w: number, h: number) {
  return h > w ? SPAWN_MOBILE : SPAWN_DESKTOP;
}

export function getInitialPositions(
  bubbles: BubbleConfig[],
  w: number,
  h: number
): { x: number; y: number; radius: number }[] {
  const { scale } = getGridLayout(w, h);

  return bubbles.map((config) => {
    const radius = getBubbleRadius(config.size) * scale;
    const positions = getSpawnPositions(w, h);
    const spawn = positions[config.id] ?? { xPct: 0.50, yPct: 0.50 };
    const isBB = config.id === "bb";
    const rawX = isBB ? w / 2 : w * spawn.xPct;
    const rawY = isBB ? h / 2 : h * spawn.yPct;
    const x = Math.max(radius, Math.min(w - radius, rawX));
    const y = Math.max(radius, Math.min(h - radius, rawY));
    return { x, y, radius };
  });
}

export function getViewportScale(w: number, h: number): number {
  return getGridLayout(w, h).scale;
}

export function createEngine(Matter: typeof import("matter-js")): Matter.Engine {
  return Matter.Engine.create({ gravity: { x: 0, y: 0 } });
}

export function createWalls(
  Matter: typeof import("matter-js"),
  world: Matter.World,
  w: number,
  h: number
): Matter.Body[] {
  const t = WALL_THICKNESS;
  const walls = [
    Matter.Bodies.rectangle(w / 2, -t / 2, w + t * 2, t, { isStatic: true }),
    Matter.Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, { isStatic: true }),
    Matter.Bodies.rectangle(-t / 2, h / 2, t, h + t * 2, { isStatic: true }),
    Matter.Bodies.rectangle(w + t / 2, h / 2, t, h + t * 2, { isStatic: true }),
  ];
  Matter.Composite.add(world, walls);
  return walls;
}

export function createBubbleBodies(
  Matter: typeof import("matter-js"),
  world: Matter.World,
  bubbles: BubbleConfig[],
  w: number,
  h: number
): PhysicsBubbleBody[] {
  const positions = getInitialPositions(bubbles, w, h);
  const result: PhysicsBubbleBody[] = [];
  const cx = w / 2;
  const cy = h / 2;

  for (let i = 0; i < bubbles.length; i++) {
    const config = bubbles[i];
    const { x, y, radius } = positions[i];
    const isBB = config.id === "bb";
    const body = Matter.Bodies.circle(
      isBB ? cx : x,
      isBB ? cy : y,
      radius,
      isBB
        ? {
            ...BODY_OPTIONS,
            label: config.id,
            slop: 0.05,
            isStatic: true,
          }
        : {
            ...BODY_OPTIONS,
            label: config.id,
            slop: 0.05,
          }
    );
    if (!isBB) Matter.Body.setVelocity(body, { x: 0, y: 0 });
    result.push({ body, config, radius });
  }

  for (let i = result.length - 1; i >= 0; i--) {
    Matter.Composite.add(world, result[i].body);
  }
  return result;
}

/**
 * Returns the topmost (last in list) non-static bubble body containing the point, or null.
 */
export function getBodyAtPoint(
  Matter: typeof import("matter-js"),
  bodies: PhysicsBubbleBody[],
  x: number,
  y: number
): Matter.Body | null {
  const dynamicBodies = bodies.filter((b) => !b.body.isStatic).map((b) => b.body);
  if (dynamicBodies.length === 0) return null;
  const hits = Matter.Query.point(dynamicBodies, { x, y });
  if (hits.length === 0) return null;
  // Return topmost: last in bodies array that was hit
  for (let i = bodies.length - 1; i >= 0; i--) {
    if (!bodies[i].body.isStatic && hits.includes(bodies[i].body)) return bodies[i].body;
  }
  return hits[hits.length - 1];
}

export function clampBodiesToBounds(
  Matter: typeof import("matter-js"),
  bodies: PhysicsBubbleBody[],
  w: number,
  h: number
): void {
  for (const { body, radius } of bodies) {
    if (body.isStatic) continue;
    let x = body.position.x;
    let y = body.position.y;
    let vx = body.velocity.x;
    let vy = body.velocity.y;
    let clamped = false;
    if (x < radius) { x = radius; vx = Math.abs(vx) * 0.8; clamped = true; }
    else if (x > w - radius) { x = w - radius; vx = -Math.abs(vx) * 0.8; clamped = true; }
    if (y < radius) { y = radius; vy = Math.abs(vy) * 0.8; clamped = true; }
    else if (y > h - radius) { y = h - radius; vy = -Math.abs(vy) * 0.8; clamped = true; }
    if (clamped) {
      Matter.Body.setPosition(body, { x, y });
      Matter.Body.setVelocity(body, { x: vx, y: vy });
    }
  }
}

export function getBodyPositions(bodies: PhysicsBubbleBody[]) {
  return bodies.map(({ body, config, radius }) => ({
    id: config.id,
    x: body.position.x,
    y: body.position.y,
    radius,
  }));
}

export function removeWalls(Matter: typeof import("matter-js"), world: Matter.World, walls: Matter.Body[]) {
  Matter.Composite.remove(world, walls);
}
