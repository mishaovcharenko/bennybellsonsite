"use client";

import Link from "next/link";

export function MinimalNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-white/5 relative">
      <div className="w-10" aria-hidden />
      <Link
        href="/"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        aria-label="Benny Bellson — Home"
      >
        <img
          src="/logo.svg"
          alt=""
          className="h-8 w-auto object-contain"
        />
      </Link>
      <nav>
        <Link
          href="/"
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          Home
        </Link>
      </nav>
    </header>
  );
}
