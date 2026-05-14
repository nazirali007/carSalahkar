export type VehicleMake = {
  Make_ID: number;
  Make_Name: string;
};

export type VehicleModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

export type Screen =
  | {
      name: "makes";
    }
  | {
      name: "models";
      make: VehicleMake;
    };
