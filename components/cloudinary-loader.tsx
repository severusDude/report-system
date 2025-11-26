"use client";

import { Suspense } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";

function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Suspense>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("object-cover", className)}
      />
    </Suspense>
  );
}

export default CloudinaryImage;
