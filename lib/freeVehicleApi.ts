const NHTSA_BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

type NhtsaResponse<T> = {
  Count?: number;
  Message?: string;
  Results?: T[];
};

export type NhtsaModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

export type NhtsaVehicleType = {
  VehicleTypeId?: number;
  VehicleTypeName?: string;
};

export type NhtsaCanadianSpecification = {
  MAKE?: string;
  MODEL?: string;
  MYR?: string;
  OL?: string;
  OW?: string;
  OH?: string;
  WB?: string;
  TWF?: string;
  TWR?: string;
  CW?: string;
  WD?: string;
};

export type FreeVehicleDetails = {
  provider: string;
  providerUrl: string;
  searchedMake: string;
  searchedModel: string;
  matchedModels: NhtsaModel[];
  vehicleTypes: string[];
  dimensions?: {
    sourceYear?: string;
    length?: string;
    width?: string;
    height?: string;
    wheelbase?: string;
    curbWeight?: string;
    frontTrack?: string;
    rearTrack?: string;
    weightDistribution?: string;
  };
  note: string;
};

const MAKE_ALIASES: Record<string, string[]> = {
  "Maruti Suzuki": ["Suzuki", "Maruti"],
  "Tata Motors": ["Tata"],
  "MG Motor": ["MG"],
};

async function fetchNhtsa<T>(path: string) {
  const response = await fetch(`${NHTSA_BASE_URL}${path}`, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error(`NHTSA request failed with ${response.status}`);
  }

  return (await response.json()) as NhtsaResponse<T>;
}

function getMakeCandidates(makeName: string) {
  return [makeName, ...(MAKE_ALIASES[makeName] ?? [])];
}

function formatMetric(value?: string, unit?: string) {
  if (!value) {
    return undefined;
  }

  return unit ? `${value} ${unit}` : value;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export async function getFreeVehicleDetails(makeName: string, modelName: string) {
  const makeCandidates = getMakeCandidates(makeName);
  const yearsToTry = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

  for (const makeCandidate of makeCandidates) {
    const encodedMake = encodeURIComponent(makeCandidate);
    const [modelsResponse, vehicleTypesResponse] = await Promise.all([
      fetchNhtsa<NhtsaModel>(`/GetModelsForMake/${encodedMake}?format=json`),
      fetchNhtsa<NhtsaVehicleType>(`/GetVehicleTypesForMake/${encodedMake}?format=json`),
    ]);

    const matchedModels =
      modelsResponse.Results?.filter((model) =>
        normalize(model.Model_Name).includes(normalize(modelName)),
      ).slice(0, 8) ?? [];

    if ((modelsResponse.Results?.length ?? 0) === 0 && matchedModels.length === 0) {
      continue;
    }

    let specification: NhtsaCanadianSpecification | undefined;

    for (const year of yearsToTry) {
      const encodedModel = encodeURIComponent(modelName);
      const specificationsResponse = await fetchNhtsa<NhtsaCanadianSpecification>(
        `/GetCanadianVehicleSpecifications/?year=${year}&make=${encodedMake}&model=${encodedModel}&units=Metric&format=json`,
      );

      specification = specificationsResponse.Results?.[0];

      if (specification) {
        break;
      }
    }

    return {
      provider: "NHTSA vPIC",
      providerUrl: "https://vpic.nhtsa.dot.gov/api/",
      searchedMake: makeCandidate,
      searchedModel: modelName,
      matchedModels,
      vehicleTypes:
        vehicleTypesResponse.Results?.map((type) => type.VehicleTypeName)
          .filter((type): type is string => Boolean(type)) ?? [],
      dimensions: specification
        ? {
            sourceYear: specification.MYR,
            length: formatMetric(specification.OL, "cm"),
            width: formatMetric(specification.OW, "cm"),
            height: formatMetric(specification.OH, "cm"),
            wheelbase: formatMetric(specification.WB, "cm"),
            curbWeight: formatMetric(specification.CW, "kg"),
            frontTrack: formatMetric(specification.TWF, "cm"),
            rearTrack: formatMetric(specification.TWR, "cm"),
            weightDistribution: specification.WD,
          }
        : undefined,
      note:
        "Free API data from NHTSA is useful for make/model/manufacturer and limited dimensions. It does not include Indian ex-showroom prices or official car images.",
    } satisfies FreeVehicleDetails;
  }

  return {
    provider: "NHTSA vPIC",
    providerUrl: "https://vpic.nhtsa.dot.gov/api/",
    searchedMake: makeName,
    searchedModel: modelName,
    matchedModels: [],
    vehicleTypes: [],
    note:
      "No matching free NHTSA record was found for this India-market model. Keep exact price/spec/image data in the local catalog for this car.",
  } satisfies FreeVehicleDetails;
}
