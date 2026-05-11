import Link from "next/link";
import type { VehicleMake } from "@/lib/nhtsa";
import { BrandLogo } from "./BrandLogo";

type BrandCardProps = {
  make: VehicleMake;
};

export function BrandCard({ make }: BrandCardProps) {
  return (
    <Link
      href={`/brands/${make.Make_ID}`}
      className="group flex min-h-48 flex-col justify-between rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <BrandLogo makeId={make.Make_ID} makeName={make.Make_Name} />
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          Code {make.Make_ID}
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-zinc-950">
          {make.Make_Name}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">NHTSA vehicle make</p>
      </div>

      <span className="text-sm font-semibold text-zinc-900 transition group-hover:translate-x-1">
        View models
      </span>
    </Link>
  );
}
