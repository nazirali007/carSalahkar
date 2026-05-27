import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { CarPhoto } from "@/components/CarPhoto";
import { CarSpecifications } from "@/components/CarSpecifications";
import { getCarImageGallery } from "@/data/indiaCars";
import { getMakeAccent, type VehicleModel } from "@/lib/nhtsa";

type SingleCarDetailsProps = {
  model: VehicleModel;
};

export function SingleCarDetails({ model }: SingleCarDetailsProps) {
  const accent = getMakeAccent(model.Make_ID);
  const galleryImages = getCarImageGallery(model.Make_Name, model.Model_Name);

  return (
    <section style={{ "--car-accent": accent } as CSSProperties}>
      <div className="grid gap-5 border-b border-zinc-200 pb-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:pb-8">
        <div>
          <Link
            href={`/brands/${model.Make_ID}`}
            className="inline-flex rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-bold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-300"
          >
            Back to {model.Make_Name} models
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 md:mt-8">
            Car details
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
            {model.Make_Name} {model.Model_Name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600">
            View specifications, price information, feature details, and multiple
            studio images for this car.
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-4 shadow-sm lg:min-w-56 lg:px-5">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-zinc-200 bg-white">
            <Image
              src={model.Logo_URL}
              alt={`${model.Make_Name} logo`}
              fill
              sizes="56px"
              className="object-contain p-2"
              unoptimized
            />
          </div>
          <div>
            <p className="text-sm text-zinc-500">Brand</p>
            <p className="text-xl font-bold text-zinc-950">{model.Make_Name}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:mt-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:gap-4">
        <div className="relative min-h-72 overflow-hidden rounded-lg bg-zinc-100 shadow-sm sm:min-h-[30rem]">
          <CarPhoto
            makeName={model.Make_Name}
            modelName={model.Model_Name}
            fallbackSrc={galleryImages[0].url}
            alt={`${model.Make_Name} ${model.Model_Name} ${galleryImages[0].label}`}
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white md:bottom-5 md:left-5 md:right-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
              Gallery
            </p>
            <h2 className="mt-2 text-xl font-bold md:text-2xl">
              {galleryImages[0].label}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-4">
          {galleryImages.slice(1).map((image) => (
            <div
              key={image.label}
              className="relative min-h-28 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm sm:min-h-36"
            >
              <CarPhoto
                makeName={model.Make_Name}
                modelName={model.Model_Name}
                fallbackSrc={image.url}
                alt={`${model.Make_Name} ${model.Model_Name} ${image.label}`}
                className="absolute inset-0 h-full w-full object-cover transition duration-300 hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-2 sm:p-3">
                <p className="text-xs font-semibold text-white sm:text-sm">
                  {image.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <CarSpecifications model={model} />
      </div>
    </section>
  );
}
