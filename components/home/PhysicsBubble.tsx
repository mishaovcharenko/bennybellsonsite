"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { BubbleConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PhysicsBubbleProps {
  config: BubbleConfig;
  x: number;
  y: number;
  radius: number;
  darkMode?: boolean;
  reducedMotion?: boolean;
  onModalOpen?: (modalType: NonNullable<BubbleConfig["modalType"]>) => void;
  /** When true (e.g. after a throw), suppress the next click so we don't navigate */
  suppressNextClickRef?: React.MutableRefObject<boolean>;
}

export function PhysicsBubble({
  config,
  x,
  y,
  radius,
  darkMode = true,
  reducedMotion,
  onModalOpen,
  suppressNextClickRef,
}: PhysicsBubbleProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (suppressNextClickRef?.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [suppressNextClickRef]
  );
  const isBB = config.id === "bb";
  const isExternal = config.type === "external";
  const isModal = config.type === "modal";
  const isInternal = config.type === "internal";

  const openInNewTab = config.openInNewTab !== false;
  const internalHref = config.pageSlug ?? config.href;

  const bubbleContent = config.label;

  const bubbleFont = '"Times New Roman", Times, serif';
  const bubbleTextStyle = { fontFamily: bubbleFont, textTransform: "uppercase" as const, fontWeight: 500, letterSpacing: "0.02em" };

  const isAccent = config.accent === true;
  /* darkMode = white bubbles on black; light mode = glass bubbles over photo */
  const content = (
    <motion.span
      className={cn(
        "flex items-center justify-center rounded-full text-center font-normal",
        "cursor-pointer select-none outline-none overflow-hidden",
        darkMode
          ? "bg-white text-black"
          : "text-white backdrop-blur-xl border border-white/20"
      )}
      style={{
        width: radius * 2,
        height: radius * 2,
        fontSize: radius * 0.19,
        padding: "15%",
        ...(!darkMode && {
          background: "rgba(255, 255, 255, 0.08)",
          boxShadow: "inset 0 0 20px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.2)",
        }),
        transition: "background 0.4s, box-shadow 0.4s, color 0.4s, border-color 0.4s",
        ...bubbleTextStyle,
      }}
      whileHover={{
        scale: 1.08,
        boxShadow: darkMode
          ? (isAccent
              ? "0 0 32px rgba(255,255,255,0.4)"
              : "0 0 24px rgba(255,255,255,0.3)")
          : (isAccent
              ? "inset 0 0 20px rgba(255,255,255,0.1), 0 0 32px rgba(255,255,255,0.2)"
              : "inset 0 0 20px rgba(255,255,255,0.08), 0 0 24px rgba(255,255,255,0.15)"),
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {bubbleContent}
    </motion.span>
  );

  // Reduced motion: use simple links/anchors
  if (reducedMotion) {
    if (isModal && config.modalType && onModalOpen) {
      return (
        <button
          type="button"
          className="absolute border-0 bg-transparent p-0 cursor-pointer"
          style={{ left: x - radius, top: y - radius }}
          onClick={() => onModalOpen(config.modalType!)}
          aria-label={`Open ${config.label}`}
        >
          <span
            className={cn(
              "bubble-reduced-motion flex items-center justify-center rounded-full text-center font-normal cursor-pointer",
              darkMode
                ? "bg-white text-black"
                : "text-white backdrop-blur-xl border border-white/20"
            )}
            style={{
              width: radius * 2,
              height: radius * 2,
              fontSize: radius * 0.19,
              ...(!darkMode && {
                background: "rgba(255, 255, 255, 0.08)",
                boxShadow: "inset 0 0 20px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.2)",
              }),
              ...bubbleTextStyle,
            }}
          >
            {config.label}
          </span>
        </button>
      );
    }
    if (isExternal) {
      return (
        <a
          href={config.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute"
          style={{ left: x - radius, top: y - radius }}
          aria-label={`${config.label} — external`}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        >
          <span
            className={cn(
              "bubble-reduced-motion flex items-center justify-center rounded-full text-center font-normal cursor-pointer",
              darkMode
                ? "bg-white text-black"
                : "text-white backdrop-blur-xl border border-white/20"
            )}
            style={{
              width: radius * 2,
              height: radius * 2,
              fontSize: radius * 0.28,
              ...(!darkMode && {
                background: "rgba(255, 255, 255, 0.08)",
                boxShadow: "inset 0 0 20px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.2)",
              }),
              ...bubbleTextStyle,
            }}
          >
            {config.label}
          </span>
        </a>
      );
    }
    return (
      <Link
        href={internalHref}
        className="absolute"
        style={{ left: x - radius, top: y - radius }}
        aria-label={isBB ? "Home" : `Go to ${config.label}`}
        tabIndex={0}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      >
        <span
          className={cn(
            "bubble-reduced-motion flex items-center justify-center rounded-full text-center font-normal cursor-pointer",
            darkMode
              ? "bg-white text-black"
              : "text-white backdrop-blur-xl border border-white/20"
          )}
          style={{
            width: radius * 2,
            height: radius * 2,
            fontSize: radius * 0.19,
            ...(!darkMode && {
              background: "rgba(255, 255, 255, 0.08)",
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.2)",
            }),
            ...bubbleTextStyle,
          }}
        >
          {config.label}
        </span>
      </Link>
    );
  }

  // Modal: button that opens overlay
  if (isModal && config.modalType && onModalOpen) {
    return (
      <button
        type="button"
        className="absolute border-0 bg-transparent p-0 cursor-pointer"
        style={{ left: x - radius, top: y - radius, width: radius * 2, height: radius * 2 }}
        onClick={(e) => {
          if (suppressNextClickRef?.current) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onModalOpen(config.modalType!);
        }}
        aria-label={`Open ${config.label}`}
      >
        {content}
      </button>
    );
  }

  // Prevent browser link-drag so physics drag (Matter.js mouse constraint) works
  const preventLinkDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // External: direct link, new tab
  if (isExternal) {
    return (
      <a
        href={config.href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        className="absolute"
        style={{ left: x - radius, top: y - radius, width: radius * 2, height: radius * 2 }}
        aria-label={`${config.label} — external link`}
        onClick={handleClick}
        draggable={false}
        onDragStart={preventLinkDrag}
      >
        {content}
      </a>
    );
  }

  // Internal: client-side navigation (e.g. BB = Home)
  return (
    <Link
      href={internalHref}
      className="absolute"
      style={{ left: x - radius, top: y - radius, width: radius * 2, height: radius * 2 }}
      aria-label={isBB ? "Home" : `Go to ${config.label}`}
      tabIndex={0}
      onClick={handleClick}
      draggable={false}
      onDragStart={preventLinkDrag}
    >
      {content}
    </Link>
  );
}
