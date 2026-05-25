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
