"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CarPhoto } from "@/components/CarPhoto";
import { getCarSpecification } from "@/data/carSpecifications";
import { getMakeAccent, type VehicleModel } from "@/lib/nhtsa";

type CarSpecificationsProps = {
  model: VehicleModel;
};

type FreeVehicleDetails = {
  provider: string;
  providerUrl: string;
  searchedMake: string;
  matchedModels: { Model_ID: number; Model_Name: string }[];
  vehicleTypes: string[];
  dimensions?: Record<string, string | undefined>;
  note: string;
};

const ELECTRIC_WORDS = ["ev", "electric", "ioniq", "comet", "windsor", "atto", "seal"];
const HYBRID_WORDS = ["hybrid", "e:hev", "hyryder", "invicto", "vellfire", "camry"];
const SUV_WORDS = [
  "brezza",
  "creta",
  "venue",
  "nexon",
  "punch",
  "harrier",
  "safari",
  "thar",
  "scorpio",
  "xuv",
  "seltos",
  "sonet",
  "fortuner",
  "compass",
  "wrangler",
  "gloster",
  "hector",
  "kodiaq",
  "taigun",
  "magnite",
  "x-trail",
  "aircross",
  "basalt",
  "sealion",
  "urban cruiser",
];
const SEDAN_WORDS = ["dzire", "aura", "verna", "tigor", "city", "amaze", "slavia", "virtus", "ciaz"];
const MPV_WORDS = ["ertiga", "xl6", "invicto", "carens", "rumion", "innova", "vellfire", "carnival", "m9"];

function includesAny(value: string, words: string[]) {
  return words.some((word) => value.includes(word));
}

function getBodyType(modelName: string) {
  const normalized = modelName.toLowerCase();

  if (includesAny(normalized, MPV_WORDS)) {
    return "MPV";
  }

  if (includesAny(normalized, SEDAN_WORDS)) {
    return "Sedan";
  }

  if (includesAny(normalized, SUV_WORDS)) {
    return "SUV";
  }

  return "Hatchback";
}

function getPowertrain(modelName: string) {
  const normalized = modelName.toLowerCase();

  if (includesAny(normalized, ELECTRIC_WORDS)) {
    return "Electric";
  }

  if (includesAny(normalized, HYBRID_WORDS)) {
    return "Hybrid / Petrol";
  }

  return "Petrol / CNG where available";
}

function getTransmission(modelName: string) {
  const normalized = modelName.toLowerCase();

  if (includesAny(normalized, ELECTRIC_WORDS) || includesAny(normalized, HYBRID_WORDS)) {
    return "Automatic";
  }

  return "Manual / Automatic where available";
}

function getSeating(bodyType: string) {
  if (bodyType === "MPV") {
    return "6 / 7 seats";
  }

  return "5 seats";
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:p-4">
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-semibold leading-6 text-zinc-950">
        {value}
      </dd>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--spec-accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CarSpecifications({ model }: CarSpecificationsProps) {
  const accent = getMakeAccent(model.Make_ID);
  const specification = getCarSpecification(model);
  const [freeDetails, setFreeDetails] = useState<FreeVehicleDetails | null>(null);
  const [isLoadingFreeDetails, setIsLoadingFreeDetails] = useState(false);
  const bodyType = getBodyType(model.Model_Name);
  const summarySpecs = specification
    ? [
        ["Body type", specification.bodyType],
        ["Fuel type", specification.fuelAndMileage.fuelType],
        ["Mileage", specification.fuelAndMileage.mileage],
        ["Seating", specification.dimensions.seatingCapacity],
      ]
    : [
        ["Body type", bodyType],
        ["Fuel / powertrain", getPowertrain(model.Model_Name)],
        ["Transmission", getTransmission(model.Model_Name)],
        ["Seating", getSeating(bodyType)],
      ];

  useEffect(() => {
    const controller = new AbortController();

    async function loadFreeDetails() {
      setIsLoadingFreeDetails(true);

      try {
        const params = new URLSearchParams({
          make: model.Make_Name,
          model: model.Model_Name,
        });
        const response = await fetch(`/api/free-car-details?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load free API vehicle data.");
        }

        setFreeDetails((await response.json()) as FreeVehicleDetails);
      } catch {
        if (!controller.signal.aborted) {
          setFreeDetails(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingFreeDetails(false);
        }
      }
    }

    loadFreeDetails();

    return () => controller.abort();
  }, [model.Make_Name, model.Model_Name]);

  return (
    <section
      className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
      style={{ "--spec-accent": accent } as CSSProperties}
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
        <div className="relative min-h-64 overflow-hidden bg-zinc-100 sm:min-h-72">
          <CarPhoto
            makeName={model.Make_Name}
            modelName={model.Model_Name}
            fallbackSrc={model.Image_URL}
            alt={`${model.Make_Name} ${model.Model_Name}`}
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-6 sm:left-6 sm:right-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
              Selected car
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">
              {model.Make_Name} {model.Model_Name}
            </h2>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Full specifications
              </p>
              <h3 className="mt-2 text-2xl font-bold text-zinc-950">
                {model.Model_Name}
              </h3>
            </div>
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm">
              <Image
                src={model.Logo_URL}
                alt={`${model.Make_Name} logo`}
                fill
                sizes="56px"
                className="object-contain p-2"
                unoptimized
              />
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-950 p-4 text-white sm:mt-6 sm:p-5">
            <p className="text-sm font-semibold text-zinc-300">
              {specification?.price.label ?? "Price"}
            </p>
            <p className="mt-2 text-3xl font-bold">
              {specification?.price.amount ?? "To be updated"}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {specification?.price.note ??
                "Exact ex-showroom price is not added for this model yet."}
            </p>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            {summarySpecs.map(([label, value]) => (
              <DetailItem key={label} label={label} value={value} />
            ))}
          </dl>
        </div>
      </div>

      {specification ? (
        <div className="grid gap-6 border-t border-zinc-200 p-4 sm:p-6 lg:grid-cols-2 lg:p-7">
          <div>
            <h4 className="text-lg font-bold text-zinc-950">Engine</h4>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <DetailItem label="Engine type" value={specification.engine.type} />
              <DetailItem label="Capacity" value={specification.engine.capacity} />
              <DetailItem label="Cylinders" value={specification.engine.cylinders} />
              <DetailItem label="Emission" value={specification.engine.emission} />
              <DetailItem label="Power" value={specification.engine.power} />
              <DetailItem label="Torque" value={specification.engine.torque} />
            </dl>
          </div>

          <div>
            <h4 className="text-lg font-bold text-zinc-950">Mileage & Capacity</h4>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <DetailItem label="Mileage" value={specification.fuelAndMileage.mileage} />
              <DetailItem label="Transmission" value={specification.fuelAndMileage.transmission} />
              <DetailItem label="Fuel tank" value={specification.fuelAndMileage.fuelTank} />
              <DetailItem label="Boot space" value={specification.dimensions.bootSpace} />
              <DetailItem label="Seats" value={specification.dimensions.seatingCapacity} />
              <DetailItem label="Turning radius" value={specification.dimensions.turningRadius} />
            </dl>
          </div>

          <div>
            <h4 className="text-lg font-bold text-zinc-950">Dimensions</h4>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <DetailItem label="Length" value={specification.dimensions.length} />
              <DetailItem label="Width" value={specification.dimensions.width} />
              <DetailItem label="Height" value={specification.dimensions.height} />
              <DetailItem label="Wheelbase" value={specification.dimensions.wheelbase} />
              <DetailItem
                label="Ground clearance"
                value={specification.dimensions.groundClearance}
              />
              <DetailItem label="Model code" value={String(model.Model_ID)} />
            </dl>
          </div>

          <div>
            <h4 className="text-lg font-bold text-zinc-950">Safety</h4>
            <BulletList items={specification.safety} />

            <h4 className="mt-6 text-lg font-bold text-zinc-950">Comfort & Features</h4>
            <BulletList items={specification.comfortAndFeatures} />
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-zinc-950">Variants</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {specification.variants.map((variant) => (
                <span
                  key={variant}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700"
                >
                  {variant}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-zinc-500">
              Source: official brand specification page, updated {specification.lastUpdated}.
              {specification.sourceUrl ? ` ${specification.sourceUrl}` : ""}
            </p>
          </div>
        </div>
      ) : (
        <div className="border-t border-zinc-200 p-4 sm:p-6 lg:p-7">
          <p className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm leading-6 text-zinc-600">
            Detailed buyer specifications for {model.Make_Name} {model.Model_Name} are not
            added yet. The panel is ready for exact ex-showroom price, engine,
            mileage, seating capacity, safety, variants, dimensions, and feature data.
          </p>
        </div>
      )}

      <div className="border-t border-zinc-200 p-4 sm:p-6 lg:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Free API data
            </p>
            <h4 className="mt-2 text-lg font-bold text-zinc-950">
              NHTSA vPIC lookup
            </h4>
          </div>
          <a
            href="https://vpic.nhtsa.dot.gov/api/"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950"
          >
            API source
          </a>
        </div>

        {isLoadingFreeDetails ? (
          <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            Loading free vehicle API data...
          </p>
        ) : freeDetails ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <DetailItem label="Provider" value={freeDetails.provider} />
            <DetailItem label="API make searched" value={freeDetails.searchedMake} />
            <DetailItem
              label="Vehicle types"
              value={freeDetails.vehicleTypes.join(", ") || "No type returned"}
            />
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">
                Matching models
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-zinc-950">
                {freeDetails.matchedModels.map((item) => item.Model_Name).join(", ") ||
                  "No model match returned"}
              </p>
            </div>
            {freeDetails.dimensions ? (
              Object.entries(freeDetails.dimensions)
                .filter(([, value]) => Boolean(value))
                .map(([label, value]) => (
                  <DetailItem
                    key={label}
                    label={label.replace(/([A-Z])/g, " $1")}
                    value={String(value)}
                  />
                ))
            ) : (
              <p className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600 lg:col-span-3">
                NHTSA did not return dimension data for this model.
              </p>
            )}
            <p className="text-sm leading-6 text-zinc-500 lg:col-span-3">
              {freeDetails.note}
            </p>
          </div>
        ) : (
          <p className="mt-4 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
            Free API data is unavailable right now.
          </p>
        )}
      </div>
    </section>
  );
}
