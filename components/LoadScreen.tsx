"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LOAD_DURATION_MS = 2500;
const FADE_OUT_MS = 400;

export function LoadScreen() {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let rafId: number;

    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / LOAD_DURATION_MS);
      setProgress(p);

      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setFadeOut(true);
        setTimeout(() => setMounted(false), FADE_OUT_MS);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-[400ms] ease-out"
      style={{ opacity: fadeOut ? 0 : 1 }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-[90vw]">
        <div className="relative w-full max-w-[min(88rem,92vw)] aspect-[2/1] flex items-center justify-center">
          <Image
            src="/benny-bellson-logo.png"
            alt=""
            fill
            className="object-contain select-none"
            priority
            sizes="(max-width: 1200px) 92vw, 88rem"
          />
        </div>
      </div>

      <div className="w-full max-w-md px-8 pb-24">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#a78bfa] rounded-full transition-all duration-75 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
