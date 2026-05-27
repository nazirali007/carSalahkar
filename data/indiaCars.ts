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
  Price_Label: string;
  Price_Note: string;
};

type IndiaCarBrand = IndiaVehicleMake & {
  models: string[];
};

const CAR_PREVIEW_COLORS = [
  ["#0f766e", "#ccfbf1", "#042f2e"],
  ["#2563eb", "#dbeafe", "#172554"],
  ["#b91c1c", "#fee2e2", "#450a0a"],
  ["#7c3aed", "#ede9fe", "#2e1065"],
  ["#ca8a04", "#fef3c7", "#422006"],
  ["#334155", "#e2e8f0", "#0f172a"],
  ["#047857", "#d1fae5", "#052e16"],
  ["#c2410c", "#ffedd5", "#431407"],
];

function getPreviewPalette(makeName: string) {
  const hash = makeName
    .split("")
    .reduce((total, letter) => total + letter.charCodeAt(0), 0);

  return CAR_PREVIEW_COLORS[hash % CAR_PREVIEW_COLORS.length];
}

function getBodyPath(angle: string) {
  if (angle === "09") {
    return "M180 375 C215 315 292 280 410 280 H590 C684 280 759 317 792 374 L838 384 C855 389 866 404 866 421 V468 H134 V424 C134 404 147 388 166 383 Z";
  }

  if (angle === "05") {
    return "M172 386 C206 323 284 292 405 292 H610 C704 292 770 327 808 380 L852 394 C869 400 878 414 878 431 V470 H122 V424 C122 405 136 390 154 386 Z";
  }

  if (angle === "01") {
    return "M226 374 C250 320 328 292 500 292 C672 292 750 320 774 374 L812 389 C831 397 842 414 842 434 V472 H158 V434 C158 414 169 397 188 389 Z";
  }

  return "M160 386 C205 322 293 287 424 287 H592 C693 287 760 323 807 382 L850 394 C867 399 878 415 878 433 V471 H122 V425 C122 407 136 391 154 387 Z";
}

export function getCarImageUrl(
  makeName: string,
  modelName: string,
  angle = "23",
) {
  const [accent, tint, ink] = getPreviewPalette(makeName);
  const bodyPath = getBodyPath(angle);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 620" role="img" aria-label="${makeName} ${modelName} car preview"><defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${tint}"/><stop offset="1" stop-color="#ffffff"/></linearGradient><linearGradient id="body" x1="0" x2="1"><stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="${ink}"/></linearGradient><filter id="shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.2"/></filter></defs><rect width="1000" height="620" fill="url(#bg)"/><circle cx="820" cy="132" r="150" fill="${accent}" opacity="0.1"/><circle cx="180" cy="510" r="180" fill="${ink}" opacity="0.06"/><path d="M130 486 H870" stroke="${ink}" stroke-width="10" stroke-linecap="round" opacity="0.12"/><g filter="url(#shadow)"><path d="${bodyPath}" fill="url(#body)"/><path d="M318 296 C347 251 390 230 455 230 H570 C626 230 670 253 711 298 Z" fill="#ffffff" opacity="0.9"/><path d="M448 247 H566 C612 247 646 263 675 292 H418 C425 274 434 260 448 247 Z" fill="${ink}" opacity="0.22"/><path d="M190 393 H811" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.28"/><circle cx="304" cy="466" r="58" fill="${ink}"/><circle cx="304" cy="466" r="29" fill="#ffffff" opacity="0.9"/><circle cx="704" cy="466" r="58" fill="${ink}"/><circle cx="704" cy="466" r="29" fill="#ffffff" opacity="0.9"/><path d="M792 404 H850" stroke="#fef08a" stroke-width="14" stroke-linecap="round"/><path d="M151 404 H208" stroke="#fecaca" stroke-width="14" stroke-linecap="round"/></g><text x="72" y="104" fill="${ink}" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="800">${makeName}</text><text x="72" y="145" fill="${ink}" opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">${modelName}</text></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function getCarImageGallery(makeName: string, modelName: string) {
  return [
    { label: "Front three-quarter", url: getCarImageUrl(makeName, modelName, "23") },
    { label: "Side profile", url: getCarImageUrl(makeName, modelName, "09") },
    { label: "Rear three-quarter", url: getCarImageUrl(makeName, modelName, "05") },
    { label: "Studio angle", url: getCarImageUrl(makeName, modelName, "01") },
  ];
}

function getBrandLogoUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

function formatIndianPrice(priceInRupees: number) {
  if (priceInRupees >= 10000000) {
    return `Rs. ${(priceInRupees / 10000000).toFixed(2)} crore`;
  }

  return `Rs. ${(priceInRupees / 100000).toFixed(2)} lakh`;
}

const MODEL_STARTING_PRICES_INR: Record<string, number> = {
  "Maruti Suzuki|Alto K10": 399000,
  "Maruti Suzuki|S-Presso": 426000,
  "Maruti Suzuki|Celerio": 537000,
  "Maruti Suzuki|WagonR": 579000,
  "Maruti Suzuki|Swift": 649000,
  "Maruti Suzuki|Dzire": 679000,
  "Maruti Suzuki|Baleno": 670000,
  "Maruti Suzuki|Fronx": 752000,
  "Maruti Suzuki|Brezza": 869000,
  "Maruti Suzuki|Ertiga": 884000,
  "Maruti Suzuki|XL6": 1161000,
  "Maruti Suzuki|Grand Vitara": 1111000,
  "Maruti Suzuki|Jimny": 1274000,
  "Maruti Suzuki|Invicto": 2521000,
  "Maruti Suzuki|Eeco": 532000,
  "Maruti Suzuki|e Vitara": 1700000,
  "Maruti Suzuki|Victoris": 1100000,
  "Hyundai|Grand i10 Nios": 598000,
  "Hyundai|i20": 704000,
  "Hyundai|Aura": 649000,
  "Hyundai|Verna": 1107000,
  "Hyundai|Exter": 613000,
  "Hyundai|Venue": 794000,
  "Hyundai|Creta": 1100000,
  "Hyundai|Creta Electric": 1799000,
  "Hyundai|Alcazar": 1499000,
  "Hyundai|Tucson": 2992000,
  "Hyundai|Ioniq 5": 4693000,
  "Tata Motors|Tiago": 500000,
  "Tata Motors|Tigor": 600000,
  "Tata Motors|Altroz": 665000,
  "Tata Motors|Punch": 613000,
  "Tata Motors|Nexon": 800000,
  "Tata Motors|Curvv": 1000000,
  "Tata Motors|Harrier": 1500000,
  "Tata Motors|Safari": 1550000,
  "Tata Motors|Tiago EV": 799000,
  "Tata Motors|Tigor EV": 1249000,
  "Tata Motors|Punch EV": 999000,
  "Tata Motors|Nexon EV": 1249000,
  "Tata Motors|Curvv EV": 1749000,
  "Mahindra|Bolero": 979000,
  "Mahindra|Bolero Neo": 995000,
  "Mahindra|Thar": 1125000,
  "Mahindra|Thar Roxx": 1299000,
  "Mahindra|Scorpio Classic": 1359000,
  "Mahindra|Scorpio N": 1399000,
  "Mahindra|XUV 3XO": 799000,
  "Mahindra|XUV700": 1399000,
  "Mahindra|XUV400": 1599000,
  "Mahindra|BE 6": 1890000,
  "Mahindra|XEV 9e": 2190000,
  "Kia|Sonet": 800000,
  "Kia|Syros": 900000,
  "Kia|Seltos": 1090000,
  "Kia|Carens": 1060000,
  "Kia|Carens Clavis": 1150000,
  "Kia|Carnival": 6390000,
  "Kia|EV6": 6097000,
  "Kia|EV9": 13000000,
  "Toyota|Glanza": 690000,
  "Toyota|Rumion": 1044000,
  "Toyota|Urban Cruiser Taisor": 774000,
  "Toyota|Urban Cruiser Hyryder": 1114000,
  "Toyota|Innova Crysta": 1999000,
  "Toyota|Innova Hycross": 1909000,
  "Toyota|Fortuner": 3359000,
  "Toyota|Hilux": 3040000,
  "Toyota|Camry": 4839000,
  "Toyota|Vellfire": 12200000,
  "Toyota|Land Cruiser 300": 21000000,
  "Honda|Amaze": 820000,
  "Honda|City": 1208000,
  "Honda|City e:HEV": 2000000,
  "Honda|Elevate": 1169000,
  "MG Motor|Comet EV": 699000,
  "MG Motor|Windsor EV": 999000,
  "MG Motor|Astor": 998000,
  "MG Motor|Hector": 1400000,
  "MG Motor|Hector Plus": 1800000,
  "MG Motor|Gloster": 3899000,
  "MG Motor|ZS EV": 1898000,
  "MG Motor|Cyberster": 5000000,
  "MG Motor|M9": 7000000,
  "Skoda|Kylaq": 789000,
  "Skoda|Kushaq": 1089000,
  "Skoda|Slavia": 1034000,
  "Skoda|Superb": 5400000,
  "Skoda|Kodiaq": 3999000,
  "Volkswagen|Virtus": 1156000,
  "Volkswagen|Taigun": 1170000,
  "Volkswagen|Tiguan R-Line": 4900000,
  "Renault|Kwid": 470000,
  "Renault|Kiger": 610000,
  "Renault|Triber": 600000,
  "Nissan|Magnite": 600000,
  "Nissan|X-Trail": 4992000,
  "Citroen|C3": 623000,
  "Citroen|eC3": 1290000,
  "Citroen|Aircross": 850000,
  "Citroen|Basalt": 799000,
  "Citroen|C5 Aircross": 3749000,
  "Jeep|Compass": 1869000,
  "Jeep|Meridian": 2499000,
  "Jeep|Wrangler": 6799000,
  "Jeep|Grand Cherokee": 8050000,
  "BYD|Atto 3": 2499000,
  "BYD|eMAX 7": 2690000,
  "BYD|Seal": 4125000,
  "BYD|Sealion 7": 4890000,
  "Isuzu|D-Max": 1120000,
  "Isuzu|V-Cross": 2170000,
  "Isuzu|MU-X": 3700000,
};

function getModelPrice(makeName: string, modelName: string) {
  const price = MODEL_STARTING_PRICES_INR[`${makeName}|${modelName}`];

  if (!price) {
    return {
      label: "Price to be updated",
      note: "India ex-showroom",
    };
  }

  return {
    label: `${formatIndianPrice(price)} onwards`,
    note: "India ex-showroom",
  };
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
      Price_Label: getModelPrice(make.Make_Name, modelName).label,
      Price_Note: getModelPrice(make.Make_Name, modelName).note,
    })),
).sort((a, b) =>
  a.Model_Name.localeCompare(b.Model_Name, "en", { sensitivity: "base" }),
);
