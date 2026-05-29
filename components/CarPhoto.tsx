"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CarPhotoProps = {
  makeName: string;
  modelName: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  priority?: boolean;
  loadRemoteImage?: boolean;
};

type CarImageResponse = {
  imageUrl?: string;
};

export function CarPhoto({
  makeName,
  modelName,
  fallbackSrc,
  alt,
  className,
  priority = false,
  loadRemoteImage = true,
}: CarPhotoProps) {
  const [src, setSrc] = useState(fallbackSrc);
  const displaySrc = loadRemoteImage ? src : fallbackSrc;
  const isSvgDataImage = displaySrc.startsWith("data:image/svg+xml");

  useEffect(() => {
    if (!loadRemoteImage) {
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      make: makeName,
      model: modelName,
    });

    async function loadImage() {
      try {
        const response = await fetch(`/api/car-image?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as CarImageResponse;

        if (data.imageUrl) {
          setSrc(data.imageUrl);
        }
      } catch {
        if (!controller.signal.aborted) {
          setSrc(fallbackSrc);
        }
      }
    }

    loadImage();

    return () => controller.abort();
  }, [fallbackSrc, loadRemoteImage, makeName, modelName]);

  if (isSvgDataImage) {
    return (
      // SVG data previews are generated locally; a native image avoids next/image
      // SVG handling edge cases while keeping the same layout classes.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={displaySrc}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={displaySrc}
      alt={alt}
      fill
      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      className={className}
      priority={priority}
      onError={() => {
        if (loadRemoteImage) {
          setSrc(fallbackSrc);
        }
      }}
      unoptimized
    />
  );
}
