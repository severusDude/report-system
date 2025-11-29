import { ImageLoaderProps } from "next/image";

import "dotenv/config";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;

const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;

/**
 * A Next.js Image loader that uses Cloudinary to generate images.
 *
 * This loader will generate an image URL using the following format:
 * `https://res.cloudinary.com/<CLOUD_NAME>/image/upload/,w_<width>,q_<quality>/<src>`
 *
 * If `CLOUDINARY_CLOUD_NAME` is not defined in `.env`, it will log an error and return the original `src`.
 *
 * If `quality` is not provided, it will default to 75.
 *
 * @param {ImageLoaderProps} props - The props object passed to the loader.
 * @returns {string} - The generated image URL.
 **/
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!CLOUD_NAME) {
    console.error("CLOUDINARY_CLOUD_NAME is not defined in .env");
    return src;
  }

  // Use default quality
  const calculatedQuality = quality || 75;

  // Define transformation: f_auto (format), w_auto (width), q_auto (quality)
  const transformation = `f_auto,q_${calculatedQuality}`;

  // Construct the image URL
  return `${BASE_URL}w_${width},${transformation}/${src}`;
}
