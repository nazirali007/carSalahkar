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
}: CarPhotoProps) {
  const [src, setSrc] = useState(fallbackSrc);

  useEffect(() => {
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
  }, [fallbackSrc, makeName, modelName]);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      className={className}
      priority={priority}
      onError={() => setSrc(fallbackSrc)}
      unoptimized
    />
  );
}
