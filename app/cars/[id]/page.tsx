import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SingleCarDetails } from "@/components/SingleCarDetails";
import { getAllModels, getModelById } from "@/lib/nhtsa";

type CarDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const models = await getAllModels();

  return models.map((model) => ({
    id: String(model.Model_ID),
  }));
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const modelId = Number(id);

  if (!Number.isInteger(modelId)) {
    return {
      title: "Car Not Found",
    };
  }

  const model = await getModelById(modelId);

  if (!model) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `${model.Make_Name} ${model.Model_Name} Details | Car Salahkar`,
    description: `View specifications and images for the ${model.Make_Name} ${model.Model_Name}.`,
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const modelId = Number(id);

  if (!Number.isInteger(modelId)) {
    notFound();
  }

  const model = await getModelById(modelId);

  if (!model) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-6 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SingleCarDetails model={model} />
      </div>
    </main>
  );
}
