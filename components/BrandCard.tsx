import Link from "next/link";
import type { CSSProperties } from "react";
import { getMakeAccent, type VehicleMake } from "@/lib/nhtsa";
import { BrandLogo } from "./BrandLogo";

type BrandCardProps = {
  make: VehicleMake;
};

export function BrandCard({ make }: BrandCardProps) {
  const accent = getMakeAccent(make.Make_ID);

  return (
    <Link
      href={`/brands/${make.Make_ID}`}
      aria-label={`View ${make.Make_Name} models`}
      className="group relative grid gap-4 overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/80 focus-visible:ring-4 focus-visible:ring-zinc-300 md:min-h-56 md:p-5"
      style={{ "--brand-accent": accent } as CSSProperties}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute -right-14 -top-14 h-36 w-36 rounded-full opacity-10 transition duration-300 group-hover:scale-125"
        style={{ backgroundColor: accent }}
      />

      <div className="flex items-start justify-between gap-4">
        <BrandLogo
          logoUrl={make.Logo_URL}
          makeId={make.Make_ID}
          makeName={make.Make_Name}
        />
        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600">
          Code {make.Make_ID}
        </span>
      </div>

      <div className="relative min-w-0">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Vehicle make
        </p>
        <h2 className="break-words text-xl font-bold text-zinc-950 transition group-hover:text-[color:var(--brand-accent)] md:text-2xl">
          {make.Make_Name}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
          Explore models launched for Indian car buyers.
        </p>
      </div>

      <div className="relative flex items-center justify-between border-t border-zinc-100 pt-4 md:mt-auto">
        <span className="text-sm font-semibold text-zinc-900">View models</span>
        <span
          aria-hidden="true"
          className="grid h-9 w-9 place-items-center rounded-full text-white shadow-sm transition duration-300 group-hover:translate-x-1 group-hover:shadow-md"
          style={{ backgroundColor: accent }}
        >
          -&gt;
        </span>
      </div>
    </Link>
  );
}
