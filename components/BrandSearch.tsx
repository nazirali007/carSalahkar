"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandCard } from "@/components/BrandCard";
import { INDIA_CAR_MODELS } from "@/data/indiaCars";
import { getMakeAccent, type VehicleMake } from "@/lib/nhtsa";

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
    <section className="mt-10">
      <div className="mx-auto max-w-2xl">
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
          className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-200"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 text-sm text-zinc-500">
        <p>
          Showing {filteredMakes.length} of {makes.length} companies
          {search.trim() ? ` and ${matchingModels.length} matching models` : ""}
        </p>
      </div>

      {matchingModels.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">
            Matching car models
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {matchingModels.map((model) => {
              const accent = getMakeAccent(model.Make_ID);

              return (
                <Link
                  key={model.Model_ID}
                  href={`/cars/${model.Model_ID}`}
                  className="group flex items-center gap-4 overflow-hidden rounded-lg border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-300"
                  style={{ "--model-accent": accent } as CSSProperties}
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                    <Image
                      src={model.Image_URL}
                      alt={`${model.Make_Name} ${model.Model_Name}`}
                      fill
                      sizes="112px"
                      className="object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                      unoptimized
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
                    <p className="text-lg font-bold text-zinc-950 transition group-hover:text-[color:var(--model-accent)]">
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
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
