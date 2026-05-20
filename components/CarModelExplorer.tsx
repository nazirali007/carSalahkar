"use client";

import { useMemo, useRef, useState } from "react";
import { CarModelCard } from "@/components/CarModelCard";
import { CarSpecifications } from "@/components/CarSpecifications";
import type { VehicleModel } from "@/lib/nhtsa";

type CarModelExplorerProps = {
  models: VehicleModel[];
};

export function CarModelExplorer({ models }: CarModelExplorerProps) {
  const [selectedModelId, setSelectedModelId] = useState(models[0]?.Model_ID);
  const detailsRef = useRef<HTMLDivElement>(null);

  const selectedModel = useMemo(
    () => models.find((model) => model.Model_ID === selectedModelId) ?? models[0],
    [models, selectedModelId],
  );

  function handleModelSelect(model: VehicleModel) {
    setSelectedModelId(model.Model_ID);
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!selectedModel) {
    return null;
  }

  return (
    <section className="mt-10 space-y-8">
      <div ref={detailsRef}>
        <CarSpecifications model={selectedModel} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {models.map((model) => (
          <CarModelCard
            key={model.Model_ID}
            model={model}
            isSelected={model.Model_ID === selectedModel.Model_ID}
            onSelect={handleModelSelect}
          />
        ))}
      </div>
    </section>
  );
}
