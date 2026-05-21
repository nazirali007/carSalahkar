import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
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
      <div className="flex flex-col gap-6 border-b border-zinc-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href={`/brands/${model.Make_ID}`}
            className="text-sm font-semibold text-zinc-600 transition hover:text-zinc-950"
          >
            Back to {model.Make_Name} models
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Car details
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
            {model.Make_Name} {model.Model_Name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600">
            View specifications, price information, model codes, feature details,
            and multiple studio images for this car.
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white px-5 py-4 shadow-sm">
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
            <p className="text-sm text-zinc-500">Model code</p>
            <p className="text-2xl font-bold text-zinc-950">{model.Model_ID}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="relative min-h-80 overflow-hidden rounded-lg bg-zinc-100 shadow-sm sm:min-h-[30rem]">
          <Image
            src={galleryImages[0].url}
            alt={`${model.Make_Name} ${model.Model_Name} ${galleryImages[0].label}`}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
              Gallery
            </p>
            <h2 className="mt-2 text-2xl font-bold">{galleryImages[0].label}</h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {galleryImages.slice(1).map((image) => (
            <div
              key={image.label}
              className="relative min-h-36 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm"
            >
              <Image
                src={image.url}
                alt={`${model.Make_Name} ${model.Model_Name} ${image.label}`}
                fill
                sizes="(min-width: 1024px) 28vw, (min-width: 640px) 33vw, 100vw"
                className="object-cover transition duration-300 hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3">
                <p className="text-sm font-semibold text-white">{image.label}</p>
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
