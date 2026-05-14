import type { VehicleMake, VehicleModel } from "../types/vehicle";

const VPIC_BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

type VpicResponse<T> = {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
};

export async function getAllMakes() {
  const response = await fetch(`${VPIC_BASE_URL}/GetAllMakes?format=json`);

  if (!response.ok) {
    throw new Error("Unable to load car companies.");
  }

  const data = (await response.json()) as VpicResponse<VehicleMake>;

  return data.Results.sort((a, b) =>
    a.Make_Name.localeCompare(b.Make_Name, "en", { sensitivity: "base" }),
  );
}

export async function getModelsForMakeId(makeId: number) {
  const response = await fetch(
    `${VPIC_BASE_URL}/GetModelsForMakeId/${makeId}?format=json`,
  );

  if (!response.ok) {
    throw new Error("Unable to load car models.");
  }

  const data = (await response.json()) as VpicResponse<VehicleModel>;

  return data.Results.sort((a, b) =>
    a.Model_Name.localeCompare(b.Model_Name, "en", { sensitivity: "base" }),
  );
}

export function getMakeInitials(makeName: string) {
  const words = makeName
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "CS";
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function getMakeAccent(makeId: number) {
  const colors = [
    "#0f766e",
    "#2563eb",
    "#b91c1c",
    "#7c3aed",
    "#ca8a04",
    "#334155",
    "#047857",
    "#c2410c",
  ];

  return colors[Math.abs(makeId) % colors.length];
}
