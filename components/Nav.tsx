"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const lenis = useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function go(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) lenis.scrollTo(target, { duration: 1.5 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 pt-4 sm:px-8"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href="#home"
        onClick={(event) => go(event, "home")}
        className="hidden font-display text-sm font-extrabold tracking-widest sm:block"
        aria-label="Kenshin Ruiz, back to top"
      >
        KR
      </a>

      <nav
        aria-label="Main"
        className="mx-auto flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl sm:absolute sm:left-1/2 sm:mx-0 sm:-translate-x-1/2"
      >
        {LINKS.map((link) => {
          const isActive = active === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => go(event, link.id)}
              aria-current={isActive ? "true" : undefined}
              className={`relative rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-colors sm:px-4 sm:text-xs ${
                isActive ? "text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {isActive && (
                <>
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-sky-400/15"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                  <motion.span
                    layoutId="nav-bar"
                    className="absolute -top-1 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-sky-400"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                </>
              )}
              <span className="relative">{link.label}</span>
            </a>
          );
        })}
      </nav>

      <span className="hidden w-6 sm:block" aria-hidden="true" />
    </motion.header>
  );
}
