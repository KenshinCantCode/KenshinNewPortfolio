"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, Send, TriangleAlert } from "lucide-react";
import { SiFacebook, SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/SectionHeading";
import { LINKS } from "@/data/content";

type Status = { kind: "idle" | "ok" | "err"; text: string };

const rise = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setSending(true);
    setStatus({ kind: "idle", text: "" });

    try {
      const response = await fetch(LINKS.formspree, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      setStatus({ kind: "ok", text: "Thanks! Your message was sent. I'll get back to you soon." });
    } catch {
      setStatus({
        kind: "err",
        text: "Your message didn't send. Try again, or message me on Facebook.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Get in touch"
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <motion.div {...rise} transition={{ duration: 0.8 }}>
            <Card className="p-5 sm:p-7">
              <form id="cf" action={LINKS.formspree} method="POST" onSubmit={handleSubmit} className="grid gap-5">
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px]"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" autoComplete="name" placeholder="Your name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What is this about?" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={5} placeholder="Tell me about your project" required />
                </div>
                <Button type="submit" size="lg" disabled={sending} className="w-full">
                  <Send />
                  {sending ? "Sending..." : "Send message"}
                </Button>
                <p
                  role="status"
                  aria-live="polite"
                  className={`flex min-h-6 items-start gap-2 text-sm font-semibold ${
                    status.kind === "ok" ? "text-green-400" : "text-red-300"
                  }`}
                >
                  {status.kind === "ok" && <CheckCircle2 className="mt-0.5 size-4 shrink-0" />}
                  {status.kind === "err" && <TriangleAlert className="mt-0.5 size-4 shrink-0" />}
                  {status.text}
                </p>
              </form>
            </Card>
          </motion.div>

          <motion.div {...rise} transition={{ duration: 0.8, delay: 0.12 }} className="grid content-start gap-4">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="group block">
              <Card className="flex items-center gap-4 p-4 transition-colors hover:border-sky-400/50 hover:bg-white/[0.07]">
                <span className="grid size-11 place-items-center rounded-xl bg-sky-500/15 text-sky-300">
                  <SiGithub size={20} />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold">GitHub</span>
                  <span className="block text-xs text-muted-foreground">github.com/kenshincantcode</span>
                </span>
              </Card>
            </a>
            <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className="group block">
              <Card className="flex items-center gap-4 p-4 transition-colors hover:border-cyan-400/50 hover:bg-white/[0.07]">
                <span className="grid size-11 place-items-center rounded-xl bg-cyan-400/15 text-cyan-300">
                  <SiFacebook size={20} />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold">Facebook</span>
                  <span className="block text-xs text-muted-foreground">Kenshin Ruiz</span>
                </span>
              </Card>
            </a>
            <Card className="flex items-center gap-5 p-5">
              <div className="shrink-0 rounded-xl bg-white p-2.5">
                <QRCodeSVG value={LINKS.github} size={92} bgColor="#ffffff" fgColor="#0b0714" />
              </div>
              <div>
                <p className="font-condensed text-2xl uppercase tracking-wide">Let&apos;s work together</p>
                <p className="mt-1 text-xs text-muted-foreground">Scan to open my GitHub on your phone.</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
