"use client";

import { useMemo, useState } from "react";
import { BrandCard } from "@/components/BrandCard";
import type { VehicleMake } from "@/lib/nhtsa";

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

  return (
    <section className="mt-10">
      <div className="mx-auto max-w-2xl">
        <label
          htmlFor="brand-search"
          className="mb-3 block text-sm font-semibold text-zinc-700"
        >
          Search car company
        </label>
        <input
          id="brand-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by company name or make code"
          className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-200"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 text-sm text-zinc-500">
        <p>
          Showing {filteredMakes.length} of {makes.length} companies
        </p>
      </div>

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
            Try another brand name or make code.
          </p>
        </div>
      )}
    </section>
  );
}
