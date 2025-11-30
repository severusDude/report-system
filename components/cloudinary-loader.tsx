"use client";

import { Suspense, useCallback, useState } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";
import cloudinaryLoader from "@/lib/cloudinaryLoader";

const FALLBACK_IMAGE = "attachments/jcw3g8mnm9c7jtiesttk";

function CloudinaryImage({
  src,
  alt = "",
  width = 100,
  height = 100,
  className = "",
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = useCallback(() => {
    if (imageSrc !== FALLBACK_IMAGE) {
      console.warn(`Failed to load image: ${src}`);

      setImageSrc(FALLBACK_IMAGE);
    }
  }, [imageSrc, src]);

  return (
    <Suspense>
      <Image
        loader={cloudinaryLoader}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        className={cn("object-cover", className)}
      />
    </Suspense>
  );
}

export default CloudinaryImage;
