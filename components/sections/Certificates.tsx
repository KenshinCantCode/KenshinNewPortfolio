"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import SectionHeading from "@/components/SectionHeading";
import { CERTIFICATES, type Certificate } from "@/data/content";

function TiltCard({ certificate, onOpen, index }: { certificate: Certificate; onOpen: () => void; index: number }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 160, damping: 18 });
  const glareX = useTransform(mx, (value) => `${value * 100}%`);
  const glareY = useTransform(my, (value) => `${value * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35), transparent 55%)`;

  return (
    <motion.figure
      className="m-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
    >
      <div className="[perspective:1000px]">
        <motion.button
          type="button"
          onClick={onOpen}
          aria-label={`View ${certificate.title} certificate full size`}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse") return;
            const rect = event.currentTarget.getBoundingClientRect();
            mx.set((event.clientX - rect.left) / rect.width);
            my.set((event.clientY - rect.top) / rect.height);
          }}
          onPointerLeave={() => {
            mx.set(0.5);
            my.set(0.5);
          }}
          whileTap={{ scale: 0.98 }}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/15 bg-white shadow-[0_30px_70px_-30px_rgba(59,130,246,0.75)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Image
            src={certificate.image}
            width={certificate.width}
            height={certificate.height}
            alt={certificate.alt}
            sizes="(max-width: 768px) 90vw, 520px"
            className="block h-auto w-full"
          />
          <motion.span
            aria-hidden="true"
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          />
        </motion.button>
      </div>
      <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-condensed text-3xl uppercase tracking-wide">{certificate.title}</h3>
          <p className="text-sm text-muted-foreground">{certificate.issuer}</p>
        </div>
        <Badge variant="cyan">Completed {certificate.date}</Badge>
      </figcaption>
    </motion.figure>
  );
}

export default function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="relative px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Certificates"
          condensed
          subtitle="Courses I've completed. Select a certificate to see it full size."
        />

        {/* framed window, like a gallery viewport */}
        <div className="rounded-[2rem] border border-white/15 bg-white/[0.03] p-4 backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex items-center gap-2" aria-hidden="true">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-yellow-400/80" />
            <span className="size-3 rounded-full bg-green-400/80" />
          </div>
          <div className="grid gap-10 md:grid-cols-2 md:gap-8">
            {CERTIFICATES.map((certificate, index) => (
              <TiltCard
                key={certificate.title}
                certificate={certificate}
                index={index}
                onOpen={() => setSelected(certificate)}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogTitle className="sr-only">{selected?.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {selected?.issuer}, completed {selected?.date}
          </DialogDescription>
          {selected && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selected.image}
              alt={selected.alt}
              className="mx-auto block max-h-[86svh] w-auto max-w-full rounded-xl border border-white/20 bg-white"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
