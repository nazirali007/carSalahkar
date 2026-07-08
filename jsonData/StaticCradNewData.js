const dummyCarData = [
  {
    brand: "Maruti Suzuki",
    market: "India",
    models: [
      {
        model: "Swift",
        bodyType: "Hatchback",
        history: [
          {
            year: 2024,
            fuelType: ["Petrol", "CNG"],
            transmission: ["Manual", "AMT"],
            price: {
              exShowroomOriginalINR: 649000,
            },
            engine: {
              petrol: "1197 cc",
            },
            images: [],
            discontinued: false,
          },
        ],
      },
    ],
  },

  {
    brand: "Hyundai",
    market: "India",
    models: [
      {
        model: "Creta",
        bodyType: "SUV",
        history: [
          {
            year: 2024,
            fuelType: ["Petrol", "Diesel"],
            transmission: ["Manual", "IVT", "Automatic"],
            price: {
              exShowroomOriginalINR: 1100000,
            },
            engine: {
              petrol: "1497 cc",
              diesel: "1493 cc",
            },
            images: [],
            discontinued: false,
          },
        ],
      },
      {
        model: "i20",
        bodyType: "Hatchback",
        history: [],
      },
      {
        model: "Venue",
        bodyType: "SUV",
        history: [],
      },
    ],
  },

  {
    brand: "Tata",
    market: "India",
    models: [
      {
        model: "Nexon",
        bodyType: "SUV",
        history: [],
      },
      {
        model: "Punch",
        bodyType: "SUV",
        history: [],
      },
      {
        model: "Harrier",
        bodyType: "SUV",
        history: [],
      },
    ],
  },

  {
    brand: "Mahindra",
    market: "India",
    models: [
      {
        model: "Scorpio N",
        bodyType: "SUV",
        history: [],
      },
      {
        model: "Thar",
        bodyType: "SUV",
        history: [],
      },
      {
        model: "XUV700",
        bodyType: "SUV",
        history: [],
      },
    ],
  },
];

export default dummyCarData;

