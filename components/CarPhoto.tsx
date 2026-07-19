"use client";

import { useEffect, useState } from "react";
import { CarPreview } from "@/components/CarPreview";

type CarPhotoProps = {
  makeName: string;
  modelName: string;
  src?: string;
  fallbackSrc: string;
  alt: string;
  angle?: string;
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
  src,
  fallbackSrc,
  alt,
  angle,
  className,
  priority = false,
  loadRemoteImage = true,
}: CarPhotoProps) {
  const initialSrc = src ?? fallbackSrc;
  const requestKey = `${makeName}|${modelName}|${angle ?? ""}|${initialSrc}|${fallbackSrc}`;
  const [imageState, setImageState] = useState({
    broken: false,
    key: requestKey,
    src: initialSrc,
  });
  const displaySrc =
    imageState.key === requestKey
      ? imageState.src
      : initialSrc;
  const showFallbackPanel = imageState.key === requestKey && imageState.broken;

  useEffect(() => {
    if (src || !loadRemoteImage) {
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      make: makeName,
      model: modelName,
    });

    if (angle) {
      params.set("angle", angle);
    }

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
          setImageState({ broken: false, key: requestKey, src: data.imageUrl });
        }
      } catch {
        if (!controller.signal.aborted) {
          setImageState({ broken: false, key: requestKey, src: fallbackSrc });
        }
      }
    }

    loadImage();

    return () => controller.abort();
  }, [angle, fallbackSrc, loadRemoteImage, makeName, modelName, requestKey, src]);

  if (showFallbackPanel) {
    return (
      <div
        className={`${className ?? ""} grid place-items-center bg-zinc-200 text-center text-zinc-700`}
        role="img"
        aria-label={alt}
      >
        <span className="px-4 text-sm font-bold">
          {makeName} {modelName}
        </span>
      </div>
    );
  }

  if (displaySrc?.startsWith?.("data:image/svg+xml")) {
    return (
      <CarPreview
        makeName={makeName}
        modelName={modelName}
        angle={angle as "23" | "09" | "05" | "01" | undefined}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={displaySrc}
      alt={alt}
      className={className}
      decoding="async"
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      onError={() => {
        if (displaySrc !== fallbackSrc) {
          setImageState({ broken: false, key: requestKey, src: fallbackSrc });

          return;
        }

        setImageState({ broken: true, key: requestKey, src: fallbackSrc });
      }}
    />
  );
}
