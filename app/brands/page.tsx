import { BrandSearch } from "@/components/BrandSearch";
import { PageHeader } from "@/components/PageHeader";
import { getAllMakes } from "@/lib/nhtsa";

export default async function BrandsPage() {
  const makes = await getAllMakes();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Browse Brands"
          title="All Car Companies"
          description="This list comes from the NHTSA GetAllMakes API. Select a company logo or name to open that brand page and view its models."
        />

        <BrandSearch makes={makes} />
      </div>
    </main>
  );
}
