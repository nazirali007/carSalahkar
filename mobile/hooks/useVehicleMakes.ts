import { useEffect, useMemo, useState } from "react";
import { getAllMakes } from "../services/nhtsa";
import type { VehicleMake } from "../types/vehicle";

export function useVehicleMakes() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadMakes() {
      try {
        setError(null);
        setLoading(true);
        const results = await getAllMakes();

        if (active) {
          setMakes(results);
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

  return {
    error,
    filteredMakes,
    loading,
    makes,
    search,
    setSearch,
  };
}
