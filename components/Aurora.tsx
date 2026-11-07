"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface Blob {
  className: string;
  x: number[];
  y: number[];
  scale: number[];
  duration: number;
}

const BLOBS: Blob[] = [
  {
    className: "-left-[12%] -top-[12%] h-[62vh] w-[58vw] bg-sky-600/80 blur-[90px]",
    x: [0, 90, -40, 0],
    y: [0, 50, -20, 0],
    scale: [1, 1.12, 0.95, 1],
    duration: 22,
  },
  {
    className: "-right-[12%] top-[2%] h-[56vh] w-[46vw] bg-blue-600/70 blur-[90px]",
    x: [0, -80, 30, 0],
    y: [0, 60, -30, 0],
    scale: [1, 0.92, 1.1, 1],
    duration: 26,
  },
  {
    className: "left-[4%] top-[6%] h-[18vh] w-[100vw] -rotate-[20deg] bg-linear-to-r from-transparent via-sky-500 to-cyan-500/50 blur-[60px]",
    x: [0, 60, -60, 0],
    y: [0, -20, 20, 0],
    scale: [1, 1.05, 1, 1],
    duration: 18,
  },
  {
    className: "-bottom-[18%] left-[18%] h-[46vh] w-[62vw] bg-cyan-700/40 blur-[90px]",
    x: [0, -70, 50, 0],
    y: [0, -30, 20, 0],
    scale: [1, 1.1, 0.96, 1],
    duration: 30,
  },
];

export default function Aurora() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0.5, 0.35]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <motion.div style={{ opacity }} className="absolute inset-0">
        {BLOBS.map((blob, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full will-change-transform ${blob.className}`}
            animate={reduce ? undefined : { x: blob.x, y: blob.y, scale: blob.scale }}
            transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#050309_115%)]" />
    </div>
  );
}
