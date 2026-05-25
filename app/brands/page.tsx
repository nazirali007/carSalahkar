import { BrandSearch } from "@/components/BrandSearch";
import { PageHeader } from "@/components/PageHeader";
import { getAllMakes } from "@/lib/nhtsa";

export default async function BrandsPage() {
  const makes = await getAllMakes();

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Browse Brands"
          title="India Car Companies"
          description="This list focuses on car brands with models launched in India. Select a company logo or name to view its India-market models."
        />

        <BrandSearch makes={makes} />
      </div>
    </main>
  );
}
