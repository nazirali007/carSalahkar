const dummyCarData = [
  {
    brand: "Maruti Suzuki",
    market: "India",
    models: [
      { model: "Alto K10", bodyType: "Hatchback", history: [] },
      { model: "S-Presso", bodyType: "Hatchback", history: [] },
      { model: "Celerio", bodyType: "Hatchback", history: [] },
      { model: "WagonR", bodyType: "Hatchback", history: [] },
      { model: "Swift", bodyType: "Hatchback", history: [] },
      { model: "Baleno", bodyType: "Hatchback", history: [] },
      { model: "Ignis", bodyType: "Hatchback", history: [] },
      { model: "Dzire", bodyType: "Sedan", history: [] },
      { model: "Ciaz", bodyType: "Sedan", history: [] },
      { model: "Brezza", bodyType: "SUV", history: [] },
      { model: "Grand Vitara", bodyType: "SUV", history: [] },
      { model: "Jimny", bodyType: "SUV", history: [] },
      { model: "Fronx", bodyType: "SUV Coupe", history: [] },
      { model: "Ertiga", bodyType: "MPV", history: [] },
      { model: "XL6", bodyType: "MPV", history: [] },
      { model: "Invicto", bodyType: "MPV", history: [] },
    ],
  },

  {
    brand: "Hyundai",
    market: "India",
    models: [
      { model: "Grand i10 Nios", bodyType: "Hatchback", history: [] },
      { model: "i20", bodyType: "Hatchback", history: [] },
      { model: "Exter", bodyType: "SUV", history: [] },
      { model: "Venue", bodyType: "SUV", history: [] },
      { model: "Creta", bodyType: "SUV", history: [] },
      { model: "Alcazar", bodyType: "SUV", history: [] },
      { model: "Tucson", bodyType: "SUV", history: [] },
      { model: "Verna", bodyType: "Sedan", history: [] },
      { model: "Aura", bodyType: "Sedan", history: [] },
      { model: "IONIQ 5", bodyType: "Electric SUV", history: [] },
    ],
  },

  {
    brand: "Tata",
    market: "India",
    models: [
      { model: "Tiago", bodyType: "Hatchback", history: [] },
      { model: "Tiago EV", bodyType: "Electric Hatchback", history: [] },
      { model: "Altroz", bodyType: "Hatchback", history: [] },
      { model: "Punch", bodyType: "SUV", history: [] },
      { model: "Punch EV", bodyType: "Electric SUV", history: [] },
      { model: "Nexon", bodyType: "SUV", history: [] },
      { model: "Nexon EV", bodyType: "Electric SUV", history: [] },
      { model: "Curvv", bodyType: "SUV Coupe", history: [] },
      { model: "Curvv EV", bodyType: "Electric SUV Coupe", history: [] },
      { model: "Harrier", bodyType: "SUV", history: [] },
      { model: "Safari", bodyType: "SUV", history: [] },
      { model: "Tigor", bodyType: "Sedan", history: [] },
      { model: "Tigor EV", bodyType: "Electric Sedan", history: [] },
    ],
  },

  {
    brand: "Mahindra",
    market: "India",
    models: [
      { model: "Bolero", bodyType: "SUV", history: [] },
      { model: "Bolero Neo", bodyType: "SUV", history: [] },
      { model: "Thar", bodyType: "SUV", history: [] },
      { model: "Thar Roxx", bodyType: "SUV", history: [] },
      { model: "Scorpio Classic", bodyType: "SUV", history: [] },
      { model: "Scorpio N", bodyType: "SUV", history: [] },
      { model: "XUV 3XO", bodyType: "SUV", history: [] },
      { model: "XUV700", bodyType: "SUV", history: [] },
      { model: "BE 6", bodyType: "Electric SUV", history: [] },
      { model: "XEV 9e", bodyType: "Electric SUV Coupe", history: [] },
    ],
  },

  {
    brand: "Toyota",
    market: "India",
    models: [
      { model: "Glanza", bodyType: "Hatchback", history: [] },
      { model: "Urban Cruiser Taisor", bodyType: "SUV Coupe", history: [] },
      { model: "Urban Cruiser Hyryder", bodyType: "SUV", history: [] },
      { model: "Innova Crysta", bodyType: "MPV", history: [] },
      { model: "Innova Hycross", bodyType: "MPV", history: [] },
      { model: "Fortuner", bodyType: "SUV", history: [] },
      { model: "Fortuner Legender", bodyType: "SUV", history: [] },
      { model: "Hilux", bodyType: "Pickup", history: [] },
      { model: "Camry", bodyType: "Sedan", history: [] },
      { model: "Vellfire", bodyType: "Luxury MPV", history: [] },
    ],
  },

  {
    brand: "Honda",
    market: "India",
    models: [
      { model: "Amaze", bodyType: "Sedan", history: [] },
      { model: "City", bodyType: "Sedan", history: [] },
      { model: "City Hybrid", bodyType: "Hybrid Sedan", history: [] },
      { model: "Elevate", bodyType: "SUV", history: [] },
    ],
  },

  {
    brand: "Kia",
    market: "India",
    models: [
      { model: "Sonet", bodyType: "SUV", history: [] },
      { model: "Seltos", bodyType: "SUV", history: [] },
      { model: "Carens", bodyType: "MPV", history: [] },
      { model: "Carnival", bodyType: "Luxury MPV", history: [] },
      { model: "EV6", bodyType: "Electric Crossover", history: [] },
      { model: "EV9", bodyType: "Electric SUV", history: [] },
    ],
  },

  {
    brand: "MG",
    market: "India",
    models: [
      { model: "Comet EV", bodyType: "Electric Hatchback", history: [] },
      { model: "Astor", bodyType: "SUV", history: [] },
      { model: "Hector", bodyType: "SUV", history: [] },
      { model: "Hector Plus", bodyType: "SUV", history: [] },
      { model: "ZS EV", bodyType: "Electric SUV", history: [] },
      { model: "Windsor EV", bodyType: "Electric Crossover", history: [] },
      { model: "Gloster", bodyType: "SUV", history: [] },
    ],
  },

  {
    brand: "Skoda",
    market: "India",
    models: [
      { model: "Slavia", bodyType: "Sedan", history: [] },
      { model: "Kylaq", bodyType: "SUV", history: [] },
      { model: "Kushaq", bodyType: "SUV", history: [] },
      { model: "Superb", bodyType: "Luxury Sedan", history: [] },
      { model: "Kodiaq", bodyType: "SUV", history: [] },
    ],
  },

  {
    brand: "Volkswagen",
    market: "India",
    models: [
      { model: "Virtus", bodyType: "Sedan", history: [] },
      { model: "Taigun", bodyType: "SUV", history: [] },
      { model: "Tiguan", bodyType: "SUV", history: [] },
      { model: "Golf GTI", bodyType: "Hatchback", history: [] },
    ],
  },

  {
    brand: "Renault",
    market: "India",
    models: [
      { model: "Kwid", bodyType: "Hatchback", history: [] },
      { model: "Kiger", bodyType: "SUV", history: [] },
      { model: "Triber", bodyType: "MPV", history: [] },
    ],
  },

  {
    brand: "Nissan",
    market: "India",
    models: [
      { model: "Magnite", bodyType: "SUV", history: [] },
      { model: "X-Trail", bodyType: "SUV", history: [] },
    ],
},

  {
    brand: "Citroen",
    market: "India",
    models: [
      { model: "C3", bodyType: "Hatchback", history: [] },
      { model: "eC3", bodyType: "Electric Hatchback", history: [] },
      { model: "Basalt", bodyType: "SUV Coupe", history: [] },
      { model: "Aircross", bodyType: "SUV", history: [] },
    ],
  },

  {
    brand: "Jeep",
    market: "India",
    models: [
      { model: "Compass", bodyType: "SUV", history: [] },
      { model: "Meridian", bodyType: "SUV", history: [] },
      { model: "Wrangler", bodyType: "SUV", history: [] },
      { model: "Grand Cherokee", bodyType: "Luxury SUV", history: [] },
    ],
  },

  {
    brand: "BYD",
    market: "India",
    models: [
      { model: "Atto 3", bodyType: "Electric SUV", history: [] },
      { model: "Seal", bodyType: "Electric Sedan", history: [] },
      { model: "eMAX 7", bodyType: "Electric MPV", history: [] },
    ],
  },
];