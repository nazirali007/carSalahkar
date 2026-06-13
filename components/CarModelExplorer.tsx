import { CarModelCard } from "@/components/CarModelCard";
import { CarSpecifications } from "@/components/CarSpecifications";
import { useState } from "react";
import type { VehicleModel } from "@/lib/nhtsa";

type CarModelExplorerProps = {
  models: VehicleModel[];
};

export function CarModelExplorer({ models }: CarModelExplorerProps) {
  const [selectedModelId, setSelectedModelId] = useState<number | null>(
    models[0]?.Model_ID ?? null,
  );

  const selectedModel = models.find((m) => m.Model_ID === selectedModelId) ?? models[0];

  if (!selectedModel) return null;

  return (
    <section className="mt-8 space-y-7 md:mt-10 md:space-y-8">
      <div>
        <CarSpecifications model={selectedModel} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {models.map((model) => (
          <CarModelCard
            key={model.Model_ID}
            model={model}
            isSelected={model.Model_ID === selectedModelId}
            onSelect={() => setSelectedModelId(model.Model_ID)}
          />
        ))}
      </div>
    </section>
  );
}
