const VPIC_BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

export type VehicleMake = {
  Make_ID: number;
  Make_Name: string;
};

export type VehicleModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

type VpicResponse<T> = {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
};

export async function getAllMakes() {
  const response = await fetch(`${VPIC_BASE_URL}/GetAllMakes?format=json`, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error("Unable to load vehicle makes from NHTSA.");
  }

  const data = (await response.json()) as VpicResponse<VehicleMake>;

  return data.Results.sort((a, b) =>
    a.Make_Name.localeCompare(b.Make_Name, "en", { sensitivity: "base" }),
  );
}

export async function getMakeById(makeId: number) {
  const makes = await getAllMakes();

  return makes.find((make) => make.Make_ID === makeId);
}

export async function getModelsForMakeId(makeId: number) {
  const response = await fetch(
    `${VPIC_BASE_URL}/GetModelsForMakeId/${makeId}?format=json`,
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  );

  if (!response.ok) {
    throw new Error("Unable to load vehicle models from NHTSA.");
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
    return "C";
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
