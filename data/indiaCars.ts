export type IndiaVehicleMake = {
  Make_ID: number;
  Make_Name: string;
  Logo_URL: string;
};

export type IndiaVehicleModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
  Image_URL: string;
  Logo_URL: string;
};

type IndiaCarBrand = IndiaVehicleMake & {
  models: string[];
};

function getCarImageUrl(makeName: string, modelName: string) {
  const params = new URLSearchParams({
    customer: "img",
    make: makeName,
    modelFamily: modelName,
    countryCode: "IN",
    angle: "23",
    zoomType: "relative",
    width: "800",
  });

  return `https://cdn.imagin.studio/getImage?${params.toString()}`;
}

function getBrandLogoUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

const INDIA_CAR_BRANDS: IndiaCarBrand[] = [
  {
    Make_ID: 101,
    Make_Name: "Maruti Suzuki",
    Logo_URL: getBrandLogoUrl("marutisuzuki.com"),
    models: [
      "Alto K10",
      "S-Presso",
      "Celerio",
      "WagonR",
      "Swift",
      "Dzire",
      "Baleno",
      "Fronx",
      "Brezza",
      "Ertiga",
      "XL6",
      "Grand Vitara",
      "Jimny",
      "Invicto",
      "Eeco",
      "e Vitara",
      "Victoris",
    ],
  },
  {
    Make_ID: 102,
    Make_Name: "Hyundai",
    Logo_URL: getBrandLogoUrl("hyundai.com"),
    models: [
      "Grand i10 Nios",
      "i20",
      "Aura",
      "Verna",
      "Exter",
      "Venue",
      "Creta",
      "Creta Electric",
      "Alcazar",
      "Tucson",
      "Ioniq 5",
    ],
  },
  {
    Make_ID: 103,
    Make_Name: "Tata Motors",
    Logo_URL: getBrandLogoUrl("tatamotors.com"),
    models: [
      "Tiago",
      "Tigor",
      "Altroz",
      "Punch",
      "Nexon",
      "Curvv",
      "Harrier",
      "Safari",
      "Tiago EV",
      "Tigor EV",
      "Punch EV",
      "Nexon EV",
      "Curvv EV",
    ],
  },
  {
    Make_ID: 104,
    Make_Name: "Mahindra",
    Logo_URL: getBrandLogoUrl("mahindra.com"),
    models: [
      "Bolero",
      "Bolero Neo",
      "Thar",
      "Thar Roxx",
      "Scorpio Classic",
      "Scorpio N",
      "XUV 3XO",
      "XUV700",
      "XUV400",
      "BE 6",
      "XEV 9e",
    ],
  },
  {
    Make_ID: 105,
    Make_Name: "Kia",
    Logo_URL: getBrandLogoUrl("kia.com"),
    models: [
      "Sonet",
      "Syros",
      "Seltos",
      "Carens",
      "Carens Clavis",
      "Carnival",
      "EV6",
      "EV9",
    ],
  },
  {
    Make_ID: 106,
    Make_Name: "Toyota",
    Logo_URL: getBrandLogoUrl("toyotabharat.com"),
    models: [
      "Glanza",
      "Rumion",
      "Urban Cruiser Taisor",
      "Urban Cruiser Hyryder",
      "Innova Crysta",
      "Innova Hycross",
      "Fortuner",
      "Hilux",
      "Camry",
      "Vellfire",
      "Land Cruiser 300",
    ],
  },
  {
    Make_ID: 107,
    Make_Name: "Honda",
    Logo_URL: getBrandLogoUrl("hondacarindia.com"),
    models: ["Amaze", "City", "City e:HEV", "Elevate"],
  },
  {
    Make_ID: 108,
    Make_Name: "MG Motor",
    Logo_URL: getBrandLogoUrl("mgmotor.co.in"),
    models: [
      "Comet EV",
      "Windsor EV",
      "Astor",
      "Hector",
      "Hector Plus",
      "Gloster",
      "ZS EV",
      "Cyberster",
      "M9",
    ],
  },
  {
    Make_ID: 109,
    Make_Name: "Skoda",
    Logo_URL: getBrandLogoUrl("skoda-auto.co.in"),
    models: ["Kylaq", "Kushaq", "Slavia", "Superb", "Kodiaq"],
  },
  {
    Make_ID: 110,
    Make_Name: "Volkswagen",
    Logo_URL: getBrandLogoUrl("volkswagen.co.in"),
    models: ["Virtus", "Taigun", "Tiguan R-Line"],
  },
  {
    Make_ID: 111,
    Make_Name: "Renault",
    Logo_URL: getBrandLogoUrl("renault.co.in"),
    models: ["Kwid", "Kiger", "Triber"],
  },
  {
    Make_ID: 112,
    Make_Name: "Nissan",
    Logo_URL: getBrandLogoUrl("nissan.in"),
    models: ["Magnite", "X-Trail"],
  },
  {
    Make_ID: 113,
    Make_Name: "Citroen",
    Logo_URL: getBrandLogoUrl("citroen.in"),
    models: ["C3", "eC3", "Aircross", "Basalt", "C5 Aircross"],
  },
  {
    Make_ID: 114,
    Make_Name: "Jeep",
    Logo_URL: getBrandLogoUrl("jeep-india.com"),
    models: ["Compass", "Meridian", "Wrangler", "Grand Cherokee"],
  },
  {
    Make_ID: 115,
    Make_Name: "BYD",
    Logo_URL: getBrandLogoUrl("bydautoindia.com"),
    models: ["Atto 3", "eMAX 7", "Seal", "Sealion 7"],
  },
  {
    Make_ID: 116,
    Make_Name: "Isuzu",
    Logo_URL: getBrandLogoUrl("isuzu.in"),
    models: ["D-Max", "V-Cross", "MU-X"],
  },
];

export const INDIA_CAR_MAKES: IndiaVehicleMake[] = INDIA_CAR_BRANDS.map(
  ({ Logo_URL, Make_ID, Make_Name }) => ({ Logo_URL, Make_ID, Make_Name }),
).sort((a, b) =>
  a.Make_Name.localeCompare(b.Make_Name, "en", { sensitivity: "base" }),
);

export const INDIA_CAR_MODELS: IndiaVehicleModel[] = INDIA_CAR_BRANDS.flatMap(
  (make) =>
    make.models.map((modelName, modelIndex) => ({
      Make_ID: make.Make_ID,
      Make_Name: make.Make_Name,
      Model_ID: make.Make_ID * 1000 + modelIndex + 1,
      Model_Name: modelName,
      Image_URL: getCarImageUrl(make.Make_Name, modelName),
      Logo_URL: make.Logo_URL,
    })),
).sort((a, b) =>
  a.Model_Name.localeCompare(b.Model_Name, "en", { sensitivity: "base" }),
);
