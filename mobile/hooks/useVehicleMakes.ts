import { useEffect, useMemo, useState } from "react";
import { getAllMakes, getAllModels } from "../services/nhtsa";
import type { VehicleMake, VehicleModel } from "../types/vehicle";

export function useVehicleMakes() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadMakes() {
      try {
        setError(null);
        setLoading(true);
        const [makeResults, modelResults] = await Promise.all([
          getAllMakes(),
          getAllModels(),
        ]);

        if (active) {
          setMakes(makeResults);
          setModels(modelResults);
        }
      } catch {
        if (active) {
          setError("Could not load car companies. Check your internet and try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadMakes();

    return () => {
      active = false;
    };
  }, []);

  const filteredMakes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return makes;
    }

    return makes.filter(
      (make) =>
        make.Make_Name.toLowerCase().includes(query) ||
        String(make.Make_ID).includes(query),
    );
  }, [makes, search]);

  const matchingModels = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return models.filter(
      (model) =>
        model.Model_Name.toLowerCase().includes(query) ||
        model.Make_Name.toLowerCase().includes(query),
    );
  }, [models, search]);

  return {
    error,
    filteredMakes,
    loading,
    matchingModels,
    makes,
    search,
    setSearch,
  };
}
