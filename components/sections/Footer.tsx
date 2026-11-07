"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const lenis = useLenis();

  function toTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© 2026 Kenshin Ruiz. All rights reserved.</p>
        <Button variant="outline" size="sm" onClick={toTop}>
          <ArrowUp />
          Back to top
        </Button>
      </div>
    </footer>
  );
}
