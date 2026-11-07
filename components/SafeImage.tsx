"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  fallback: ReactNode;
}

/* Shows the fallback when the image file is missing, instead of a broken icon. */
export default function SafeImage({ src, alt, sizes, className, priority, fallback }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
