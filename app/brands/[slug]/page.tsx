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
    <main className="min-h-screen bg-zinc-50 px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/brands"
          className="inline-flex items-center text-sm font-semibold text-zinc-600 transition hover:text-zinc-950"
        >
          Back to all brands
        </Link>

        <header className="mt-8 flex flex-col gap-6 border-b border-zinc-200 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <BrandLogo
              logoUrl={make.Logo_URL}
              makeId={make.Make_ID}
              makeName={make.Make_Name}
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Make code {make.Make_ID}
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
                {make.Make_Name} Models
              </h1>
            </div>
          </div>

          <div className="rounded-lg border border-red-500 bg-white px-5 py-4 shadow-sm">
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
