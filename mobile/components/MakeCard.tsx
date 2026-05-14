import { Pressable, StyleSheet, Text, View } from "react-native";
import type { VehicleMake } from "../types/vehicle";
import { BrandLogo } from "./BrandLogo";

type MakeCardProps = {
  make: VehicleMake;
  onPress: (make: VehicleMake) => void;
};

export function MakeCard({ make, onPress }: MakeCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(make)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.topRow}>
        <BrandLogo makeId={make.Make_ID} makeName={make.Make_Name} />
        <Text style={styles.code}>Code {make.Make_ID}</Text>
      </View>
      <View>
        <Text numberOfLines={2} style={styles.name}>
          {make.Make_Name}
        </Text>
        <Text style={styles.meta}>NHTSA vehicle make</Text>
      </View>
      <Text style={styles.action}>View models</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e4e4e7",
    borderRadius: 8,
    borderWidth: 1,
    gap: 20,
    marginBottom: 14,
    padding: 18,
  },
  cardPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.99 }],
  },
  topRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  code: {
    backgroundColor: "#f4f4f5",
    borderRadius: 999,
    color: "#52525b",
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  name: {
    color: "#09090b",
    fontSize: 24,
    fontWeight: "800",
  },
  meta: {
    color: "#71717a",
    fontSize: 14,
    marginTop: 4,
  },
  action: {
    color: "#18181b",
    fontSize: 14,
    fontWeight: "800",
  },
});
