"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowDownRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/SafeImage";
import Typewriter from "@/components/Typewriter";
import { useIntro } from "@/components/Providers";
import { LINKS, ROLES } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container: Variants = {
  hide: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const item: Variants = {
  hide: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease } },
};

function ProfileCard() {
  const { done } = useIntro();
  const lenis = useLenis();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 150, damping: 18 });

  function scrollToContact() {
    const target = document.getElementById("contact");
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.div
      className="mx-auto w-full max-w-[340px] [perspective:1000px] lg:ml-auto"
      initial={{ opacity: 0, x: 80, filter: "blur(10px)" }}
      animate={done ? { opacity: 1, x: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 1, ease, delay: 0.35 }}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse") return;
            const rect = event.currentTarget.getBoundingClientRect();
            mx.set((event.clientX - rect.left) / rect.width - 0.5);
            my.set((event.clientY - rect.top) / rect.height - 0.5);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
          className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-sky-300/15 bg-transparent shadow-[0_30px_90px_-30px_rgba(59,130,246,0.55)]"
        >
          <SafeImage
            src="/images/profile.jpg"
            alt="Portrait of Kenshin Ruiz"
            sizes="340px"
            priority
            className="h-full w-full object-cover object-[50%_15%]"
            fallback={
              <div className="absolute inset-0 grid place-items-center bg-linear-to-br from-sky-900/60 to-blue-950">
                <span className="font-display text-6xl font-extrabold text-white/30">KR</span>
              </div>
            }
          />
          <div className="absolute inset-x-0 top-0 bg-linear-to-b from-black/70 to-transparent px-5 pb-10 pt-5 text-center">
            <p className="font-display text-xl font-bold">Kenshin Ruiz</p>
            <p className="text-xs text-white/70">Full-stack web developer</p>
          </div>
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl border border-sky-200/10 bg-slate-950/45 p-2.5 backdrop-blur-xl">
            <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-sky-900/60">
              <SafeImage
                src="/images/profile.jpg"
                alt=""
                sizes="36px"
                className="object-cover object-[50%_15%]"
                fallback={null}
              />
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-xs font-bold">{LINKS.githubHandle}</p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/60">
                <span className="size-2 animate-pulse-dot rounded-full bg-green-400" />
                Online
              </p>
            </div>
            <Button size="sm" variant="secondary" onClick={scrollToContact}>
              Contact me
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { done } = useIntro();
  const lenis = useLenis();

  function scrollToProjects() {
    const target = document.getElementById("projects");
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="home" className="relative flex min-h-svh items-center px-5 pb-16 pt-28 sm:px-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <motion.div variants={container} initial="hide" animate={done ? "show" : "hide"}>
          <motion.p variants={item} className="text-lg text-white/70 sm:text-2xl">
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-2 font-display text-[clamp(2.4rem,8.6vw,6.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
          >
            Kenshin
            <br />
            Ruiz
          </motion.h1>
          <motion.p variants={item} className="mt-5 min-h-[2.2em] text-xl font-light sm:text-3xl">
            <Typewriter words={ROLES} active={done} />
          </motion.p>
          <motion.p variants={item} className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            I build responsive websites, web systems and visual identities. I like turning creative
            ideas into pages that work.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" onClick={scrollToProjects}>
              See my projects
              <ArrowDownRight />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                <SiGithub />
                GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <ProfileCard />
      </div>
    </section>
  );
}
