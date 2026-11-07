"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  condensed?: boolean;
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function SectionHeading({ title, subtitle, condensed, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 text-center sm:mb-16", className)}>
      <motion.h2
        className={cn(
          "uppercase",
          condensed
            ? "font-condensed text-5xl tracking-wide sm:text-7xl"
            : "font-display text-3xl font-extrabold tracking-tight sm:text-5xl"
        )}
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
      >
        {title}
      </motion.h2>
      <motion.span
        className="mx-auto mt-5 block h-[3px] rounded-full bg-linear-to-r from-sky-400 to-cyan-300"
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
      />
      {subtitle && (
        <motion.p
          className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
