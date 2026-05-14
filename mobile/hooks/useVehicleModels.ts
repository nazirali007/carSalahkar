import { useEffect, useState } from "react";
import { getModelsForMakeId } from "../services/nhtsa";
import type { VehicleMake, VehicleModel } from "../types/vehicle";

export function useVehicleModels(make: VehicleMake) {
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadModels() {
      try {
        setError(null);
        setLoading(true);
        const results = await getModelsForMakeId(make.Make_ID);

        if (active) {
          setModels(results);
        }
      } catch {
        if (active) {
          setError("Could not load car models for this company.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadModels();

    return () => {
      active = false;
    };
  }, [make.Make_ID]);

  return {
    error,
    loading,
    models,
  };
}
