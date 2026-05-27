import { INDIA_CAR_MAKES, INDIA_CAR_MODELS } from "@/data/indiaCars";

export type VehicleMake = {
  Make_ID: number;
  Make_Name: string;
  Logo_URL: string;
};

export type VehicleModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
  Image_URL: string;
  Logo_URL: string;
  Price_Label: string;
  Price_Note: string;
};

export async function getAllMakes() {
  return INDIA_CAR_MAKES;
}

export async function getMakeById(makeId: number) {
  const makes = await getAllMakes();

  return makes.find((make) => make.Make_ID === makeId);
}

export async function getModelsForMakeId(makeId: number) {
  return INDIA_CAR_MODELS.filter((model) => model.Make_ID === makeId);
}

export async function getModelById(modelId: number) {
  return INDIA_CAR_MODELS.find((model) => model.Model_ID === modelId);
}

export async function getAllModels() {
  return INDIA_CAR_MODELS;
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
