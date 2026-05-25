import { BrandSearch } from "@/components/BrandSearch";
import { PageHeader } from "@/components/PageHeader";
import { getAllMakes } from "@/lib/nhtsa";

export default async function Home() {
  const makes = await getAllMakes();

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Car Salahkar"
          title="Choose an India Car Brand"
          description="Browse car companies with models launched in India. Search by company name, then select a brand to see its India-market cars."
        />

        <BrandSearch makes={makes} />
      </div>
    </main>
  );
}
