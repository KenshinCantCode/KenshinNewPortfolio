"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/SafeImage";
import SectionHeading from "@/components/SectionHeading";
import { PROJECTS, type Project } from "@/data/content";

interface CardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function ProjectCard({ project, index, total, progress }: CardProps) {
  const targetScale = 1 - (total - index) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const host = project.link ? new URL(project.link).host : "";

  return (
    <div className="sticky top-0 flex h-svh items-center justify-center px-4 sm:px-10">
      <motion.article
        style={{ scale, top: index * 22 }}
        className="relative w-full max-w-4xl origin-top overflow-hidden rounded-3xl border border-sky-300/10 bg-[#071827]/90 shadow-[0_40px_100px_-40px_rgba(59,130,246,0.6)] backdrop-blur-xl"
      >
        {/* browser bar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-yellow-400/80" />
            <span className="size-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="mx-auto max-w-[70%] truncate rounded-full bg-white/5 px-4 py-1 text-[11px] text-white/50">
            {host || project.title}
          </div>
          <span className="w-10" aria-hidden="true" />
        </div>

        <div className="group relative h-[32svh] overflow-hidden bg-linear-to-br from-sky-900/40 to-blue-950 sm:h-[44svh]">
          {project.image && (
            <SafeImage
              src={project.image}
              alt={project.alt ?? `${project.title} screenshot`}
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              fallback={
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-7xl font-extrabold text-white/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              }
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#071827] to-transparent" />
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div className="max-w-xl">
            <h3 className="font-display text-xl font-bold sm:text-2xl">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <Badge key={tag} variant={tagIndex % 2 === 0 ? "default" : "cyan"}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          {project.link && (
            <Button asChild className="shrink-0">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                Visit site
                <ArrowUpRight />
              </a>
            </Button>
          )}
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="relative pt-24 sm:pt-32">
      <div className="px-5">
        <SectionHeading title="My web creations" subtitle="Scroll to stack through the sites I've built." />
      </div>
      <div ref={container} className="relative">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
