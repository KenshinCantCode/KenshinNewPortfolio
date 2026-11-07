"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import { SiCss, SiHtml5, SiJavascript, SiMysql, SiPhp, SiTailwindcss } from "react-icons/si";

const SIZE = 170;

const FACES: { icon: IconType; color: string; transform: string }[] = [
  { icon: SiHtml5, color: "#e34f26", transform: `rotateY(0deg) translateZ(${SIZE / 2}px)` },
  { icon: SiCss, color: "#2965f1", transform: `rotateY(90deg) translateZ(${SIZE / 2}px)` },
  { icon: SiJavascript, color: "#f7df1e", transform: `rotateY(180deg) translateZ(${SIZE / 2}px)` },
  { icon: SiPhp, color: "#8892bf", transform: `rotateY(270deg) translateZ(${SIZE / 2}px)` },
  { icon: SiMysql, color: "#00b4d8", transform: `rotateX(90deg) translateZ(${SIZE / 2}px)` },
  { icon: SiTailwindcss, color: "#38bdf8", transform: `rotateX(-90deg) translateZ(${SIZE / 2}px)` },
];

/* Built-in 3D cube shown until a Spline scene is configured. */
export default function StackOrbit() {
  const reduce = useReducedMotion();

  return (
    <div className="relative grid h-full min-h-[320px] w-full place-items-center overflow-hidden">
      <div className="absolute size-64 rounded-full bg-sky-600/40 blur-[70px]" aria-hidden="true" />
      <div className="[perspective:900px]" aria-hidden="true">
        <motion.div
          className="relative"
          style={{ width: SIZE, height: SIZE, transformStyle: "preserve-3d" }}
          animate={reduce ? { rotateX: -22, rotateY: 35 } : { rotateX: [-22, -22], rotateY: [0, 360] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {FACES.map(({ icon: Icon, color, transform }, index) => (
            <div
              key={index}
              className="absolute inset-0 grid place-items-center rounded-2xl border border-white/20 bg-white/[0.07] shadow-[inset_0_0_40px_rgba(59,130,246,0.18)] backdrop-blur-md"
              style={{ transform, backfaceVisibility: "hidden" }}
            >
              <Icon size={64} color={color} />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-6 h-5 w-40 rounded-full bg-black/60 blur-xl" aria-hidden="true" />
    </div>
  );
}
