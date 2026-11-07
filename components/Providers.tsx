"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

interface IntroState {
  done: boolean;
  setDone: (value: boolean) => void;
}

const IntroContext = createContext<IntroState>({ done: false, setDone: () => {} });

export const useIntro = () => useContext(IntroContext);

export default function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: !reduce }}>
      <IntroContext.Provider value={{ done, setDone }}>{children}</IntroContext.Provider>
    </ReactLenis>
  );
}
