 const dummyCarData = {
  "brand": "Maruti Suzuki",
  "market": "India",
  "schemaVersion": "1.1",
  "note": "Chunk 1 expanded dataset for core Maruti models. Historical dataset is being built incrementally.",
  "models": [
    {
      "model": "Swift",
      "bodyType": "Hatchback",
      "history": [
        {"year": 2011, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 487000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": [], "discontinued": false},
        {"year": 2014, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 499000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": [], "discontinued": false},
        {"year": 2018, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 499000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": [], "discontinued": false},
        {"year": 2024, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 649000}, "engine": {"petrol": "1197 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "Dzire",
      "bodyType": "Sedan",
      "history": [
        {"year": 2012, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 479000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": [], "discontinued": false},
        {"year": 2017, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 545000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": [], "discontinued": false},
        {"year": 2024, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 679000}, "engine": {"petrol": "1197 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "WagonR",
      "bodyType": "Hatchback",
      "history": [
        {"year": 2010, "fuelType": ["Petrol", "LPG"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 334000}, "engine": {"petrol": "998 cc"}, "images": [], "discontinued": false},
        {"year": 2019, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 419000}, "engine": {"petrol": "998 cc / 1197 cc"}, "images": [], "discontinued": false},
        {"year": 2024, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 555000}, "engine": {"petrol": "998 cc / 1197 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "Alto 800",
      "bodyType": "Hatchback",
      "history": [
        {"year": 2012, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 244000}, "engine": {"petrol": "796 cc"}, "images": [], "discontinued": true},
        {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 339000}, "engine": {"petrol": "796 cc"}, "images": [], "discontinued": true}
      ]
    },
    {
      "model": "Alto K10",
      "bodyType": "Hatchback",
      "history": [
        {"year": 2010, "fuelType": ["Petrol"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 331000}, "engine": {"petrol": "998 cc"}, "images": [], "discontinued": false},
        {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 399000}, "engine": {"petrol": "998 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "Baleno",
      "bodyType": "Hatchback",
      "history": [
        {"year": 2015, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "CVT"], "price": {"exShowroomOriginalINR": 499000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": [], "discontinued": false},
        {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 635000}, "engine": {"petrol": "1197 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "Celerio",
      "bodyType": "Hatchback",
      "history": [
        {"year": 2014, "fuelType": ["Petrol", "Diesel", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 390000}, "engine": {"petrol": "998 cc", "diesel": "793 cc"}, "images": [], "discontinued": false},
        {"year": 2021, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 499000}, "engine": {"petrol": "998 cc"}, "images": [], "discontinued": false}
      ]
    }
  ,
    {
      "model": "Vitara Brezza",
      "bodyType": "SUV",
      "history": [
        {"year": 2016, "fuelType": ["Diesel"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 699000}, "engine": {"diesel": "1248 cc"}, "images": [], "discontinued": true},
        {"year": 2020, "fuelType": ["Petrol"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 734000}, "engine": {"petrol": "1462 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "Brezza",
      "bodyType": "SUV",
      "history": [
        {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 799000}, "engine": {"petrol": "1462 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "Ertiga",
      "bodyType": "MPV",
      "history": [
        {"year": 2012, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 589000}, "engine": {"petrol": "1373 cc", "diesel": "1248 cc"}, "images": [], "discontinued": false},
        {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 835000}, "engine": {"petrol": "1462 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "XL6",
      "bodyType": "MPV",
      "history": [
        {"year": 2019, "fuelType": ["Petrol"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 980000}, "engine": {"petrol": "1462 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "S-Cross",
      "bodyType": "Crossover",
      "history": [
        {"year": 2015, "fuelType": ["Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 834000}, "engine": {"diesel": "1248 cc / 1598 cc"}, "images": [], "discontinued": true}
      ]
    },
    {
      "model": "Grand Vitara",
      "bodyType": "SUV",
      "history": [
        {"year": 2022, "fuelType": ["Petrol", "Hybrid", "CNG"], "transmission": ["Manual", "Automatic", "e-CVT"], "price": {"exShowroomOriginalINR": 1045000}, "engine": {"petrol": "1462 cc / 1490 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "Invicto",
      "bodyType": "MPV",
      "history": [
        {"year": 2023, "fuelType": ["Hybrid"], "transmission": ["e-CVT"], "price": {"exShowroomOriginalINR": 2480000}, "engine": {"hybrid": "1987 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "Ignis",
      "bodyType": "Hatchback",
      "history": [
        {"year": 2017, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 459000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": [], "discontinued": false}
      ]
    },
    {
      "model": "Ciaz",
      "bodyType": "Sedan",
      "history": [
        {"year": 2014, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 699000}, "engine": {"petrol": "1373 cc", "diesel": "1248 cc"}, "images": [], "discontinued": false}
      ]
    }
  ]
};

//  const dummyCarData = {
//   "brand": "Maruti Suzuki",
//   "market": "India",
//   "schemaVersion": "1.1",
//   "note": "Chunk 1 expanded dataset for core Maruti models. Historical dataset is being built incrementally.",
//   "models": [
//     {
//       "model": "Swift",
//       "bodyType": "Hatchback",
//       "history": [
//         {"year": 2011, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 487000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2014, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 499000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2018, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 499000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2024, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 649000}, "engine": {"petrol": "1197 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "Dzire",
//       "bodyType": "Sedan",
//       "history": [
//         {"year": 2012, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 479000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2017, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 545000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2024, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 679000}, "engine": {"petrol": "1197 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "WagonR",
//       "bodyType": "Hatchback",
//       "history": [
//         {"year": 2010, "fuelType": ["Petrol", "LPG"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 334000}, "engine": {"petrol": "998 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2019, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 419000}, "engine": {"petrol": "998 cc / 1197 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2024, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 555000}, "engine": {"petrol": "998 cc / 1197 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "Alto 800",
//       "bodyType": "Hatchback",
//       "history": [
//         {"year": 2012, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 244000}, "engine": {"petrol": "796 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": true},
//         {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 339000}, "engine": {"petrol": "796 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": true}
//       ]
//     },
//     {
//       "model": "Alto K10",
//       "bodyType": "Hatchback",
//       "history": [
//         {"year": 2010, "fuelType": ["Petrol"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 331000}, "engine": {"petrol": "998 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 399000}, "engine": {"petrol": "998 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "Baleno",
//       "bodyType": "Hatchback",
//       "history": [
//         {"year": 2015, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "CVT"], "price": {"exShowroomOriginalINR": 499000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": ["https://www.nexaexperience.com"], "discontinued": false},
//         {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 635000}, "engine": {"petrol": "1197 cc"}, "images": ["https://www.nexaexperience.com"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "Celerio",
//       "bodyType": "Hatchback",
//       "history": [
//         {"year": 2014, "fuelType": ["Petrol", "Diesel", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 390000}, "engine": {"petrol": "998 cc", "diesel": "793 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2021, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 499000}, "engine": {"petrol": "998 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false}
//       ]
//     }
//   ,
//     {
//       "model": "Vitara Brezza",
//       "bodyType": "SUV",
//       "history": [
//         {"year": 2016, "fuelType": ["Diesel"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 699000}, "engine": {"diesel": "1248 cc"}, "images": ["https://www.marutisuzuki.com","https://www.marutisuzuki.com/corporate"], "discontinued": true},
//         {"year": 2020, "fuelType": ["Petrol"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 734000}, "engine": {"petrol": "1462 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "Brezza",
//       "bodyType": "SUV",
//       "history": [
//         {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 799000}, "engine": {"petrol": "1462 cc"}, "images": ["https://www.marutisuzuki.com","https://www.marutisuzuki.com/arena"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "Ertiga",
//       "bodyType": "MPV",
//       "history": [
//         {"year": 2012, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 589000}, "engine": {"petrol": "1373 cc", "diesel": "1248 cc"}, "images": ["https://www.marutisuzuki.com"], "discontinued": false},
//         {"year": 2022, "fuelType": ["Petrol", "CNG"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 835000}, "engine": {"petrol": "1462 cc"}, "images": ["https://www.marutisuzuki.com","https://www.marutisuzuki.com/arena"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "XL6",
//       "bodyType": "MPV",
//       "history": [
//         {"year": 2019, "fuelType": ["Petrol"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 980000}, "engine": {"petrol": "1462 cc"}, "images": ["https://www.nexaexperience.com","https://www.nexaexperience.com/xl6"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "S-Cross",
//       "bodyType": "Crossover",
//       "history": [
//         {"year": 2015, "fuelType": ["Diesel"], "transmission": ["Manual"], "price": {"exShowroomOriginalINR": 834000}, "engine": {"diesel": "1248 cc / 1598 cc"}, "images": ["https://www.nexaexperience.com"], "discontinued": true}
//       ]
//     },
//     {
//       "model": "Grand Vitara",
//       "bodyType": "SUV",
//       "history": [
//         {"year": 2022, "fuelType": ["Petrol", "Hybrid", "CNG"], "transmission": ["Manual", "Automatic", "e-CVT"], "price": {"exShowroomOriginalINR": 1045000}, "engine": {"petrol": "1462 cc / 1490 cc"}, "images": ["https://www.nexaexperience.com","https://www.nexaexperience.com/grand-vitara"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "Invicto",
//       "bodyType": "MPV",
//       "history": [
//         {"year": 2023, "fuelType": ["Hybrid"], "transmission": ["e-CVT"], "price": {"exShowroomOriginalINR": 2480000}, "engine": {"hybrid": "1987 cc"}, "images": ["https://www.nexaexperience.com","https://www.nexaexperience.com/invicto"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "Ignis",
//       "bodyType": "Hatchback",
//       "history": [
//         {"year": 2017, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "AMT"], "price": {"exShowroomOriginalINR": 459000}, "engine": {"petrol": "1197 cc", "diesel": "1248 cc"}, "images": ["https://www.nexaexperience.com","https://www.nexaexperience.com/ignis"], "discontinued": false}
//       ]
//     },
//     {
//       "model": "Ciaz",
//       "bodyType": "Sedan",
//       "history": [
//         {"year": 2014, "fuelType": ["Petrol", "Diesel"], "transmission": ["Manual", "Automatic"], "price": {"exShowroomOriginalINR": 699000}, "engine": {"petrol": "1373 cc", "diesel": "1248 cc"}, "images": ["https://www.nexaexperience.com","https://www.nexaexperience.com/ciaz"], "discontinued": false}
//       ]
//     }
//   ]
// };
