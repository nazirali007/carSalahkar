import type { VehicleModel } from "@/lib/nhtsa";

export type CarSpecification = {
  makeName: string;
  modelName: string;
  bodyType: string;
  price: {
    label: string;
    amount: string;
    note: string;
  };
  engine: {
    type: string;
    capacity: string;
    cylinders: string;
    power: string;
    torque: string;
    emission: string;
  };
  fuelAndMileage: {
    fuelType: string;
    mileage: string;
    fuelTank: string;
    transmission: string;
  };
  dimensions: {
    length: string;
    width: string;
    height: string;
    wheelbase: string;
    groundClearance: string;
    bootSpace: string;
    seatingCapacity: string;
    turningRadius: string;
  };
  safety: string[];
  comfortAndFeatures: string[];
  variants: string[];
  sourceUrl?: string;
  lastUpdated: string;
};

const CAR_SPECIFICATIONS: CarSpecification[] = [
  {
    makeName: "Maruti Suzuki",
    modelName: "Swift",
    bodyType: "Hatchback",
    price: {
      label: "Starting ex-showroom price",
      amount: "Rs. 5,78,900",
      note: "Entry LXI petrol variant. Prices vary by city and variant.",
    },
    engine: {
      type: "Z12E with ISS petrol / Z12E without ISS CNG",
      capacity: "1197 cc",
      cylinders: "3 cylinders",
      power: "Petrol: 60 kW / 81.58 PS @ 5700 rpm; CNG: 51.3 kW / 69.75 PS @ 5700 rpm",
      torque: "Petrol: 111.7 Nm @ 4300 rpm; CNG: 101.8 Nm @ 2900 rpm",
      emission: "BS VI",
    },
    fuelAndMileage: {
      fuelType: "Petrol / Petrol + CNG",
      mileage: "Petrol: 24.8 km/l; CNG: 32.85 km/kg",
      fuelTank: "Petrol: 37 L; CNG: 55 L water filling capacity",
      transmission: "5MT / AMT depending on variant",
    },
    dimensions: {
      length: "3860 mm",
      width: "1735 mm",
      height: "1520 mm",
      wheelbase: "2450 mm",
      groundClearance: "163 mm",
      bootSpace: "265 L",
      seatingCapacity: "5 seats",
      turningRadius: "4.8 m",
    },
    safety: [
      "6 airbags standard",
      "ABS with EBD",
      "Electronic Stability Program",
      "Hill Hold Assist",
      "Reverse parking sensors",
    ],
    comfortAndFeatures: [
      "Wireless charger on higher variants",
      "Rear AC vents",
      "Reverse parking camera on higher variants",
      "Projector headlamps depending on variant",
      "Alloy wheels on selected variants",
      "Suzuki Connect on selected variants",
    ],
    variants: [
      "LXI",
      "VXI",
      "VXI (O)",
      "ZXI",
      "ZXI+",
      "AMT variants",
      "VXI CNG",
      "VXI (O) CNG",
      "ZXI CNG",
    ],
    sourceUrl: "https://www.marutisuzuki.com/arena/swift",
    lastUpdated: "May 2026",
  },
];

export function getCarSpecification(model: VehicleModel) {
  return CAR_SPECIFICATIONS.find(
    (specification) =>
      specification.makeName.toLowerCase() === model.Make_Name.toLowerCase() &&
      specification.modelName.toLowerCase() === model.Model_Name.toLowerCase(),
  );
}
