"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function Typewriter({ words, active = true }: { words: string[]; active?: boolean }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce || !active) return;

    const word = words[index % words.length];
    let timer: number;

    if (!deleting && text === word) {
      timer = window.setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text === "") {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setIndex((value) => value + 1);
      }, 250);
    } else {
      timer = window.setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 35 : 75
      );
    }

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words, reduce, active]);

  return (
    <span aria-label={words.join(", ")} className="inline-flex items-end gap-1 whitespace-nowrap">
      <span aria-hidden="true">{reduce ? words[0] : text}</span>
      <span
        aria-hidden="true"
        className="inline-block h-[0.9em] w-[2px] translate-y-[2px] rounded-sm bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-blink align-baseline"
      >
        &nbsp;
      </span>
    </span>
  );
}
