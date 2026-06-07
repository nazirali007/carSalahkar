"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandCard } from "@/components/BrandCard";
import { CarPhoto } from "@/components/CarPhoto";
import { INDIA_CAR_MODELS } from "@/data/indiaCars";
import { getMakeAccent, getModelSlug, type VehicleMake } from "@/lib/nhtsa";

type BrandSearchProps = {
  makes: VehicleMake[];
};

export function BrandSearch({ makes }: BrandSearchProps) {
  const [search, setSearch] = useState("");

  const filteredMakes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return makes;
    }

    return makes.filter(
      (make) =>
        make.Make_Name.toLowerCase().includes(query) ||
        String(make.Make_ID).includes(query),
    );
  }, [makes, search]);

  const matchingModels = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return INDIA_CAR_MODELS.filter(
      (model) =>
        model.Model_Name.toLowerCase().includes(query) ||
        model.Make_Name.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <section className="mt-8 md:mt-10">
      <div className="sticky top-[65px] z-30 -mx-4 border-y border-zinc-200 bg-zinc-50/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 md:static md:mx-auto md:max-w-3xl md:border-0 md:bg-transparent md:p-0">
        <label
          htmlFor="brand-search"
          className="mb-3 block text-sm font-semibold text-zinc-700"
        >
          Search car company or model
        </label>
        <input
          id="brand-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by company or car model"
          className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-base text-zinc-950 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-200 md:h-14"
        />
        <p className="mt-3 text-sm text-zinc-500 md:text-center">
          Showing {filteredMakes.length} of {makes.length} companies
          {search.trim() ? ` and ${matchingModels.length} matching models` : ""}
        </p>
      </div>

      {matchingModels.length > 0 ? (
        <div className="mt-6 md:mt-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">
            Matching car models
          </h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {matchingModels.map((model) => {
              const accent = getMakeAccent(model.Make_ID);

              return (
                <Link
                  key={model.Model_ID}
                  href={`/cars/${getModelSlug(model)}`}
                  className="group flex items-center gap-3 overflow-hidden rounded-lg border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-300 sm:gap-4"
                  style={{ "--model-accent": accent } as CSSProperties}
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-zinc-100 sm:w-28">
                    <CarPhoto
                      makeName={model.Make_Name}
                      modelName={model.Model_Name}
                      fallbackSrc={model.Image_URL}
                      alt={`${model.Make_Name} ${model.Model_Name}`}
                      className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loadRemoteImage={false}
                    />
                    <div className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white shadow-sm">
                      <Image
                        src={model.Logo_URL}
                        alt={`${model.Make_Name} logo`}
                        fill
                        sizes="28px"
                        className="object-contain p-1"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-bold text-zinc-950 transition group-hover:text-[color:var(--model-accent)] sm:text-lg">
                      {model.Model_Name}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {model.Make_Name}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="h-12 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      {filteredMakes.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMakes.map((make) => (
            <BrandCard key={make.Make_ID} make={make} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
          <p className="font-semibold text-zinc-950">No company found</p>
          <p className="mt-2 text-sm text-zinc-500">
            Try another brand name.
          </p>
        </div>
      )}
    </section>
  );
}
