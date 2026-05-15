import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { VehicleModel } from "../types/vehicle";
import { CarIllustration } from "./CarIllustration";

type ModelCardProps = {
  model: VehicleModel;
};

export function ModelCard({ model }: ModelCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <CarIllustration />
        {!imageFailed ? (
          <Image
            alt={`${model.Make_Name} ${model.Model_Name}`}
            accessibilityLabel={`${model.Make_Name} ${model.Model_Name}`}
            source={{ uri: model.Image_URL }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImageFailed(true)}
          />
        ) : null}
        <View style={styles.imageOverlay} />
        <Text style={styles.imageBadge}>{model.Make_Name}</Text>
        <View style={styles.logoBadge}>
          <Image
            alt={`${model.Make_Name} logo`}
            accessibilityLabel={`${model.Make_Name} logo`}
            source={{ uri: model.Logo_URL }}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
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
  image: {
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  imageBadge: {
    backgroundColor: "#18181b",
    borderRadius: 999,
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    left: 14,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    top: 14,
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0,0.16)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  imageWrap: {
    height: 170,
    overflow: "hidden",
    position: "relative",
  },
  logoBadge: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 999,
    height: 44,
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    right: 14,
    top: 14,
    width: 44,
  },
  logoImage: {
    height: 32,
    width: 32,
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
