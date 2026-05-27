import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { CarModelExplorer } from "@/components/CarModelExplorer";
import { getMakeById, getModelsForMakeId } from "@/lib/nhtsa";

type BrandPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const makeId = Number(slug);

  if (!Number.isInteger(makeId)) {
    return {
      title: "Brand Not Found",
    };
  }

  const make = await getMakeById(makeId);

  if (!make) {
    return {
      title: "Brand Not Found",
    };
  }

  return {
    title: `${make.Make_Name} Models | Car Salahkar`,
    description: `View ${make.Make_Name} car models launched in India.`,
  };
}

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const makeId = Number(slug);

  if (!Number.isInteger(makeId)) {
    notFound();
  }

  const [make, models] = await Promise.all([
    getMakeById(makeId),
    getModelsForMakeId(makeId),
  ]);

  if (!make) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-6 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/brands"
          className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-bold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-300"
        >
          Back to brands
        </Link>

        <header className="mt-6 grid gap-5 border-b border-zinc-200 pb-7 md:mt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:pb-10">
          <div className="flex items-center gap-4 sm:gap-5">
            <BrandLogo
              logoUrl={make.Logo_URL}
              makeId={make.Make_ID}
              makeName={make.Make_Name}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                India car brand
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
                {make.Make_Name} Models
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-4 shadow-sm md:block md:min-w-52 md:px-5">
            <p className="text-sm text-zinc-500">India-launched models</p>
            <p className="mt-1 text-3xl font-bold text-zinc-950">
              {models.length}
            </p>
          </div>
        </header>

        {models.length > 0 ? (
          <CarModelExplorer models={models} />
        ) : (
          <div className="mt-10 rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
            <p className="font-semibold text-zinc-950">No models found</p>
            <p className="mt-2 text-sm text-zinc-500">
              No India-launched model records are listed for this brand yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
