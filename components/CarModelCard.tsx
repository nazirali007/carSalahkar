import type { CSSProperties } from "react";
import Image from "next/image";
import { getMakeAccent, type VehicleModel } from "@/lib/nhtsa";

type CarModelCardProps = {
  model: VehicleModel;
};

export function CarModelCard({ model }: CarModelCardProps) {
  const accent = getMakeAccent(model.Make_ID);

  return (
    <article
      className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/80"
      style={{ "--model-accent": accent } as CSSProperties}
    >
      <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-[linear-gradient(135deg,#f8fafc,#e0f2fe_45%,#fef3c7)]">
        <Image
          src={model.Image_URL}
          alt={`${model.Make_Name} ${model.Model_Name}`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="z-10 object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          unoptimized
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div
          className="absolute left-5 top-5 z-30 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
          style={{ backgroundColor: accent }}
        >
          {model.Make_Name}
        </div>
        <div className="absolute right-5 top-5 z-30 grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-white/60 bg-white shadow-md">
          <Image
            src={model.Logo_URL}
            alt={`${model.Make_Name} logo`}
            fill
            sizes="48px"
            className="object-contain p-2"
            unoptimized
          />
        </div>
        <div
          className="absolute -bottom-14 -right-10 h-40 w-40 rounded-full opacity-15 transition duration-300 group-hover:scale-125"
          style={{ backgroundColor: accent }}
        />
        <div className="relative h-28 w-full max-w-72 transition duration-300 group-hover:scale-105">
          <div
            className="absolute bottom-5 left-6 right-6 h-10 rounded-t-[48px] shadow-lg"
            style={{ backgroundColor: accent }}
          />
          <div className="absolute bottom-10 left-20 right-20 h-10 rounded-t-full bg-zinc-800" />
          <div className="absolute bottom-5 left-16 h-8 w-12 rounded-t-full bg-sky-100/80" />
          <div className="absolute bottom-5 right-16 h-8 w-12 rounded-t-full bg-sky-100/80" />
          <div className="absolute bottom-0 left-10 h-11 w-11 rounded-full border-8 border-zinc-900 bg-white shadow-inner" />
          <div className="absolute bottom-0 right-10 h-11 w-11 rounded-full border-8 border-zinc-900 bg-white shadow-inner" />
          <div className="absolute bottom-8 left-10 h-3 w-8 rounded-full bg-amber-300 shadow-sm" />
          <div className="absolute bottom-8 right-10 h-3 w-8 rounded-full bg-red-400 shadow-sm" />
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Model
          </p>
          <h2 className="mt-2 text-xl font-bold text-zinc-950 transition group-hover:text-[color:var(--model-accent)]">
            {model.Model_Name}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            A {model.Make_Name} model launched for the India market.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold text-zinc-600">
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1">
            Model code: {model.Model_ID}
          </span>
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1">
            Make code: {model.Make_ID}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-sm font-semibold text-zinc-900">
          <span>Model profile</span>
          <span
            className="h-2 w-12 rounded-full transition duration-300 group-hover:w-16"
            style={{ backgroundColor: accent }}
          />
        </div>
      </div>
    </article>
  );
}
