import { useState } from "react";
import { MakeListScreen } from "./mobile/screens/MakeListScreen";
import { ModelListScreen } from "./mobile/screens/ModelListScreen";
import type { Screen, VehicleMake } from "./mobile/types/vehicle";

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "makes" });

  function openMake(make: VehicleMake) {
    setScreen({ name: "models", make });
  }

  function goBackToMakes() {
    setScreen({ name: "makes" });
  }

  if (screen.name === "models") {
    return <ModelListScreen make={screen.make} onBack={goBackToMakes} />;
  }

  return <MakeListScreen onSelectMake={openMake} />;
}
