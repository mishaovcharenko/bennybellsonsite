"use client";

import { MinimalNav } from "./MinimalNav";
import { PageTransition } from "@/components/ui/PageTransition";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <MinimalNav />
      <PageTransition>
        <div id="main" className="pt-20 pb-24 px-6 max-w-4xl mx-auto" role="main">
          {children}
        </div>
      </PageTransition>
    </>
  );
}
