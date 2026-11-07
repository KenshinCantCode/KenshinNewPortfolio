"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { MARQUEE_ROLES, MARQUEE_SERVICES } from "@/data/content";

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

interface RowProps {
  items: string[];
  /* percent of one segment per second; negative moves left */
  speed: number;
  variant: "gradient" | "outline";
}

/* Scrolls on its own and speeds up (or reverses) with the page scroll. */
function Row({ items, speed, variant }: RowProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;

    let move = direction.current * speed * (delta / 1000);
    const f = factor.get();

    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;

    move += direction.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const segment = items.map((label, index) => (
    <span key={label} className="flex items-center">
      <span
        className={
          variant === "gradient"
            ? index % 2 === 0
              ? "bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              : "bg-linear-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent"
            : "text-outline"
        }
      >
        {label}
      </span>
      <span aria-hidden="true" className="mx-5 text-white/80 sm:mx-8">
        ✦
      </span>
    </span>
  ));

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        style={{ x }}
        className={`flex w-max ${
          variant === "gradient"
            ? "font-display text-3xl font-extrabold uppercase sm:text-6xl"
            : "font-condensed text-3xl uppercase tracking-wide sm:text-5xl"
        }`}
      >
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0 ? true : undefined}>
            {segment}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative -rotate-1 border-y border-white/10 bg-white/[0.02] py-6 backdrop-blur-sm sm:py-8" aria-label="Roles and services">
      <div className="flex flex-col gap-3 sm:gap-5">
        <Row items={MARQUEE_ROLES} speed={-4} variant="gradient" />
        <Row items={MARQUEE_SERVICES} speed={4} variant="outline" />
      </div>
    </div>
  );
}
