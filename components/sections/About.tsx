"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import { TOOLS } from "@/data/content";

const ABOUT_TEXT =
  "I'm an Information Technology student who creates responsive websites, designs visual identities and has experience as a young entrepreneur. I work across the front end, the back end and design, so I can take an idea from a sketch to a working page.";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block">
      {word}
    </motion.span>
  );
}

/* Each word lights up as you scroll past it. */
function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  if (reduce) {
    return (
      <p className="mx-auto max-w-4xl text-center font-display text-lg font-bold uppercase leading-snug sm:text-3xl">
        {text}
      </p>
    );
  }

  return (
    <p
      ref={ref}
      aria-label={text}
      className="mx-auto max-w-4xl text-center font-display text-lg font-bold uppercase leading-snug sm:text-3xl"
    >
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return <Word key={index} word={word} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}

const FLOATERS = [
  { tool: "HTML5", className: "left-[6%] top-[8%]", delay: 0, duration: 5 },
  { tool: "JavaScript", className: "right-[8%] top-[14%]", delay: 0.6, duration: 6 },
  { tool: "PHP", className: "left-[12%] bottom-[10%]", delay: 1.2, duration: 5.5 },
  { tool: "Tailwind CSS", className: "right-[6%] bottom-[8%]", delay: 0.3, duration: 6.5 },
];

function Approach() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-20 backdrop-blur-sm sm:mt-32 sm:px-16 sm:py-28">
      {FLOATERS.map(({ tool, className, delay, duration }) => {
        const found = TOOLS.find((entry) => entry.name === tool);
        if (!found) return null;
        const Icon = found.icon;
        return (
          <motion.div
            key={tool}
            aria-hidden="true"
            className={`absolute grid size-12 place-items-center rounded-2xl border border-white/15 bg-white/[0.06] shadow-lg backdrop-blur-md sm:size-16 ${className}`}
            animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-4, 4, -4] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={26} color={found.color} />
          </motion.div>
        );
      })}

      <p className="relative text-center font-condensed text-sm uppercase tracking-[0.3em] text-sky-300">
        My approach
      </p>
      <motion.blockquote
        className="relative mx-auto mt-5 max-w-3xl text-center font-display text-2xl font-bold uppercase leading-tight sm:text-5xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
      >
        Good design is not just how it looks, but how it works.
      </motion.blockquote>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About me" />
        <ScrollText text={ABOUT_TEXT} />

        <div className="mt-28 sm:mt-36">
          <SectionHeading title="Tools & stack" subtitle="What I build with, and what I'm learning next." />

          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {TOOLS.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.li
                    key={tool.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: (index % 2) * 0.08 + Math.floor(index / 2) * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="flex items-center gap-4 p-4 transition-colors duration-300 hover:border-sky-400/50 hover:bg-white/[0.07]">
                      <span
                        className="grid size-11 shrink-0 place-items-center rounded-xl"
                        style={{ backgroundColor: `${tool.color}22` }}
                      >
                        <Icon size={22} color={tool.color} />
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block text-sm font-bold">{tool.name}</span>
                        <span className="block text-xs text-muted-foreground">{tool.desc}</span>
                      </span>
                    </Card>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>

        <Approach />
      </div>
    </section>
  );
}
