"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useIntro } from "@/components/Providers";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Preloader() {
  const [show, setShow] = useState(true);
  const { setDone } = useIntro();
  const lenis = useLenis();
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      /* storage can be blocked */
    }

    if (seen) {
      setShow(false);
      setDone(true);
      return;
    }

    const timer = window.setTimeout(
      () => {
        setShow(false);
        setDone(true);
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {
          /* ignore */
        }
      },
      reduce ? 900 : 2800
    );

    return () => window.clearTimeout(timer);
  }, [reduce, setDone]);

  useEffect(() => {
    if (show) lenis?.stop();
    else lenis?.start();
  }, [show, lenis]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader fixed inset-0 z-[70] grid place-items-center bg-[#020d1a] px-6 text-center"
          exit={{ opacity: 0, filter: "blur(14px)", scale: 1.04 }}
          transition={{ duration: 0.8, ease }}
        >
          <div>
            <motion.p
              className="text-xl text-white/70 sm:text-3xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
            >
              Hello, I&apos;m
            </motion.p>
            <motion.h1
              className="mt-2 font-display text-[clamp(2.2rem,8vw,5.5rem)] font-extrabold uppercase leading-none tracking-tight"
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
            >
              Kenshin Ruiz
            </motion.h1>
            <motion.p
              className="mt-8 text-lg font-semibold text-white/80 sm:text-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 1.2 }}
            >
              Welcome to my Portfolio Website
            </motion.p>
            <motion.div
              className="mx-auto mt-10 h-[3px] rounded-full bg-linear-to-r from-sky-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1.4, ease, delay: 1.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
