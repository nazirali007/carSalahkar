import { StyleSheet, Text, View } from "react-native";
import type { VehicleModel } from "../types/vehicle";
import { CarIllustration } from "./CarIllustration";

type ModelCardProps = {
  model: VehicleModel;
};

export function ModelCard({ model }: ModelCardProps) {
  return (
    <View style={styles.card}>
      <CarIllustration />
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {model.Model_Name}
        </Text>
        <Text style={styles.make}>{model.Make_Name}</Text>
        <View style={styles.tags}>
          <Text style={styles.tag}>Model code: {model.Model_ID}</Text>
          <Text style={styles.tag}>Make code: {model.Make_ID}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e4e4e7",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
  },
  content: {
    gap: 8,
    padding: 16,
  },
  name: {
    color: "#09090b",
    fontSize: 21,
    fontWeight: "800",
  },
  make: {
    color: "#71717a",
    fontSize: 14,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  tag: {
    backgroundColor: "#f4f4f5",
    borderRadius: 999,
    color: "#52525b",
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
