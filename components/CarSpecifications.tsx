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
  "x1",
  "x3",
  "x5",
  "xm",
  "q3",
  "q5",
  "q7",
  "q8",
  "xc60",
  "xc90",
  "ex30",
  "ex40",
  "ec40",
  "gla",
  "glc",
  "gle",
  "gls",
  "g-class",
];
const SEDAN_WORDS = [
  "dzire",
  "aura",
  "verna",
  "tigor",
  "city",
  "amaze",
  "slavia",
  "virtus",
  "ciaz",
  "series",
  "m340i",
  "a4",
  "a6",
  "s5",
  "cla",
  "c-class",
  "e-class",
  "s-class",
  "eqs sedan",
];
const MPV_WORDS = ["ertiga", "xl6", "invicto", "carens", "rumion", "innova", "vellfire", "carnival", "m9", "v-class"];
const PREMIUM_MAKES = ["BMW", "Audi", "Volvo", "Mercedes-Benz", "BYD", "Jeep"];

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

function getTransmission(modelName: string) {
  const normalized = modelName.toLowerCase();

  if (includesAny(normalized, ELECTRIC_WORDS) || includesAny(normalized, HYBRID_WORDS)) {
    return "Automatic";
  }

  return "Manual / Automatic where available";
}

function isPremiumMake(makeName: string) {
  return PREMIUM_MAKES.includes(makeName);
}

function getGeneratedEngine(model: VehicleModel, bodyType: string) {
  const normalized = model.Model_Name.toLowerCase();

  if (includesAny(normalized, ELECTRIC_WORDS)) {
    return {
      type: "Battery-electric motor",
      capacity: "Electric drive, battery size varies by variant",
      cylinders: "Not applicable",
      power: "Variant-specific electric output",
      torque: "Instant electric torque, variant-specific",
      emission: "Zero tailpipe emission",
    };
  }

  if (includesAny(normalized, HYBRID_WORDS)) {
    return {
      type: "Petrol hybrid powertrain",
      capacity: "Hybrid petrol engine, capacity varies by variant",
      cylinders: "3 / 4 cylinders depending on variant",
      power: "Variant-specific combined output",
      torque: "Variant-specific petrol and electric assist torque",
      emission: "BS VI",
    };
  }

  if (isPremiumMake(model.Make_Name)) {
    return {
      type: "Turbo petrol / diesel depending on variant",
      capacity: bodyType === "SUV" ? "2.0 L to 3.0 L class" : "2.0 L class",
      cylinders: "4 / 6 cylinders depending on variant",
      power: "Variant-specific output",
      torque: "Variant-specific torque",
      emission: "BS VI",
    };
  }

  return {
    type: "Petrol / CNG where available",
    capacity: bodyType === "SUV" ? "1.0 L to 2.0 L class" : "0.8 L to 1.5 L class",
    cylinders: "3 / 4 cylinders depending on variant",
    power: "Variant-specific output",
    torque: "Variant-specific torque",
    emission: "BS VI",
  };
}

function getGeneratedFuelAndMileage(model: VehicleModel) {
  const normalized = model.Model_Name.toLowerCase();

  if (includesAny(normalized, ELECTRIC_WORDS)) {
    return {
      fuelType: "Electric",
      mileage: "Driving range varies by battery pack and variant",
      fuelTank: "Battery pack, fuel tank not applicable",
      transmission: "Single-speed automatic",
    };
  }

  if (includesAny(normalized, HYBRID_WORDS)) {
    return {
      fuelType: "Petrol hybrid",
      mileage: "Hybrid efficiency varies by variant and test cycle",
      fuelTank: "Variant-specific fuel tank",
      transmission: "Automatic / e-CVT depending on variant",
    };
  }

  return {
    fuelType: isPremiumMake(model.Make_Name)
      ? "Petrol / diesel depending on variant"
      : "Petrol / CNG where available",
    mileage: "Mileage varies by engine, gearbox, and variant",
    fuelTank: "Variant-specific fuel tank",
    transmission: getTransmission(model.Model_Name),
  };
}

function getGeneratedDimensions(bodyType: string, premium: boolean) {
  if (bodyType === "MPV") {
    return {
      length: premium ? "Around 5100 mm" : "Around 4300 mm to 4800 mm",
      width: premium ? "Around 1900 mm" : "Around 1700 mm to 1850 mm",
      height: premium ? "Around 1900 mm" : "Around 1650 mm to 1800 mm",
      wheelbase: premium ? "Around 3200 mm" : "Around 2750 mm to 3000 mm",
      groundClearance: "Variant-specific",
      bootSpace: "Flexible boot space with rear seats folded",
      seatingCapacity: premium ? "6 / 7 seats depending on variant" : "6 / 7 seats",
      turningRadius: "Variant-specific",
    };
  }

  if (bodyType === "SUV") {
    return {
      length: premium ? "Around 4400 mm to 5200 mm" : "Around 3900 mm to 4700 mm",
      width: premium ? "Around 1850 mm to 2000 mm" : "Around 1750 mm to 1900 mm",
      height: premium ? "Around 1600 mm to 1800 mm" : "Around 1600 mm to 1750 mm",
      wheelbase: premium ? "Around 2700 mm to 3100 mm" : "Around 2500 mm to 2850 mm",
      groundClearance: "SUV-style ground clearance, variant-specific",
      bootSpace: "Variant-specific boot space",
      seatingCapacity: "5 seats, 7 seats on selected larger variants",
      turningRadius: "Variant-specific",
    };
  }

  if (bodyType === "Sedan") {
    return {
      length: premium ? "Around 4500 mm to 5300 mm" : "Around 3900 mm to 4600 mm",
      width: premium ? "Around 1800 mm to 1950 mm" : "Around 1650 mm to 1800 mm",
      height: premium ? "Around 1400 mm to 1550 mm" : "Around 1450 mm to 1550 mm",
      wheelbase: premium ? "Around 2800 mm to 3200 mm" : "Around 2450 mm to 2700 mm",
      groundClearance: "Variant-specific",
      bootSpace: "Variant-specific boot space",
      seatingCapacity: "5 seats",
      turningRadius: "Variant-specific",
    };
  }

  return {
    length: "Around 3500 mm to 4000 mm",
    width: "Around 1600 mm to 1750 mm",
    height: "Around 1450 mm to 1650 mm",
    wheelbase: "Around 2400 mm to 2550 mm",
    groundClearance: "Variant-specific",
    bootSpace: "Variant-specific boot space",
    seatingCapacity: "5 seats",
    turningRadius: "Variant-specific",
  };
}

function getGeneratedSpecification(model: VehicleModel) {
  const bodyType = getBodyType(model.Model_Name);
  const premium = isPremiumMake(model.Make_Name);

  return {
    bodyType,
    engine: getGeneratedEngine(model, bodyType),
    fuelAndMileage: getGeneratedFuelAndMileage(model),
    dimensions: getGeneratedDimensions(bodyType, premium),
    safety: premium
      ? [
          "Multiple airbags depending on variant",
          "ABS with EBD",
          "Electronic stability control",
          "Parking camera and sensors depending on variant",
          "Advanced driver assistance features on selected variants",
        ]
      : [
          "Airbags depending on variant",
          "ABS with EBD",
          "Electronic stability control on selected variants",
          "Rear parking sensors",
          "Rear camera on selected variants",
        ],
    comfortAndFeatures: premium
      ? [
          "Touchscreen infotainment",
          "Connected car features depending on variant",
          "Automatic climate control",
          "Premium audio on selected variants",
          "Leatherette or leather upholstery depending on variant",
          "Sunroof or panoramic roof on selected variants",
        ]
      : [
          "Touchscreen infotainment on selected variants",
          "Manual or automatic climate control depending on variant",
          "Steering-mounted controls",
          "Connected car features on selected variants",
          "Alloy wheels on selected variants",
        ],
    variants: ["Base variant", "Mid variant", "Top variant", "Automatic variants where available"],
    isExact: false,
  };
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
  const generatedSpecification = getGeneratedSpecification(model);
  const displaySpecification = specification
    ? { ...specification, isExact: true }
    : generatedSpecification;
  const [freeDetails, setFreeDetails] = useState<FreeVehicleDetails | null>(null);
  const [isLoadingFreeDetails, setIsLoadingFreeDetails] = useState(false);
  const summarySpecs = [
    ["Body type", displaySpecification.bodyType],
    ["Fuel type", displaySpecification.fuelAndMileage.fuelType],
    ["Transmission", displaySpecification.fuelAndMileage.transmission],
    ["Seating", displaySpecification.dimensions.seatingCapacity],
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
            loadRemoteImage={false}
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
              {specification?.price.label ?? "Starting ex-showroom price"}
            </p>
            <p className="mt-2 text-3xl font-bold">
              {model.Price_Label}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {model.Price_Note}
            </p>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            {summarySpecs.map(([label, value]) => (
              <DetailItem key={label} label={label} value={value} />
            ))}
          </dl>
        </div>
      </div>

      <div className="grid gap-6 border-t border-zinc-200 p-4 sm:p-6 lg:grid-cols-2 lg:p-7">
        <div>
          <h4 className="text-lg font-bold text-zinc-950">Engine</h4>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <DetailItem label="Engine type" value={displaySpecification.engine.type} />
            <DetailItem label="Capacity" value={displaySpecification.engine.capacity} />
            <DetailItem label="Cylinders" value={displaySpecification.engine.cylinders} />
            <DetailItem label="Emission" value={displaySpecification.engine.emission} />
            <DetailItem label="Power" value={displaySpecification.engine.power} />
            <DetailItem label="Torque" value={displaySpecification.engine.torque} />
          </dl>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-950">Mileage & Capacity</h4>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <DetailItem label="Mileage" value={displaySpecification.fuelAndMileage.mileage} />
            <DetailItem
              label="Transmission"
              value={displaySpecification.fuelAndMileage.transmission}
            />
            <DetailItem label="Fuel tank" value={displaySpecification.fuelAndMileage.fuelTank} />
            <DetailItem label="Boot space" value={displaySpecification.dimensions.bootSpace} />
            <DetailItem label="Passengers" value={displaySpecification.dimensions.seatingCapacity} />
            <DetailItem
              label="Turning radius"
              value={displaySpecification.dimensions.turningRadius}
            />
          </dl>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-950">Dimensions</h4>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <DetailItem label="Length" value={displaySpecification.dimensions.length} />
            <DetailItem label="Width" value={displaySpecification.dimensions.width} />
            <DetailItem label="Height" value={displaySpecification.dimensions.height} />
            <DetailItem label="Wheelbase" value={displaySpecification.dimensions.wheelbase} />
            <DetailItem
              label="Ground clearance"
              value={displaySpecification.dimensions.groundClearance}
            />
          </dl>
        </div>

        <div>
          <h4 className="text-lg font-bold text-zinc-950">Safety</h4>
          <BulletList items={displaySpecification.safety} />

          <h4 className="mt-6 text-lg font-bold text-zinc-950">Comfort & Features</h4>
          <BulletList items={displaySpecification.comfortAndFeatures} />
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-lg font-bold text-zinc-950">Variants</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {displaySpecification.variants.map((variant) => (
              <span
                key={variant}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700"
              >
                {variant}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-zinc-500">
            {displaySpecification.isExact && specification
              ? `Source: official brand specification page, updated ${specification.lastUpdated}.`
              : "Overview based on body style, powertrain, and India-market catalog data. Exact variant specifications can differ by trim and city."}
            {specification?.sourceUrl ? ` ${specification.sourceUrl}` : ""}
          </p>
        </div>
      </div>

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
