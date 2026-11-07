"use client";

import { useEffect, useRef, useState } from "react";
import StackOrbit from "@/components/sections/StackOrbit";
import { SPLINE_SCENE } from "@/data/content";

/* Shows your Spline scene when SPLINE_SCENE is set in data/content.ts.
   Until then (or if the scene fails to load) it shows the built-in 3D cube. */
export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!SPLINE_SCENE || !canvasRef.current) return;

    let disposed = false;
    let app: { dispose?: () => void } | null = null;

    import("@splinetool/runtime")
      .then(async ({ Application }) => {
        if (disposed || !canvasRef.current) return;
        const instance = new Application(canvasRef.current);
        app = instance as unknown as { dispose?: () => void };
        await instance.load(SPLINE_SCENE);
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });

    return () => {
      disposed = true;
      app?.dispose?.();
    };
  }, []);

  if (!SPLINE_SCENE || failed) return <StackOrbit />;

  return (
    <canvas
      ref={canvasRef}
      className="h-full min-h-[320px] w-full"
      aria-label="Interactive 3D scene"
    />
  );
}
