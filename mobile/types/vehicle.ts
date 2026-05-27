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

export type Screen =
  | {
      name: "makes";
    }
  | {
      name: "models";
      make: VehicleMake;
    };
