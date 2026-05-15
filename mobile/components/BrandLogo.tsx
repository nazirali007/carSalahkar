import { Image, StyleSheet, Text, View } from "react-native";
import { getMakeAccent, getMakeInitials } from "../services/nhtsa";

type BrandLogoProps = {
  makeId: number;
  makeName: string;
  logoUrl?: string;
  size?: "small" | "large";
};

export function BrandLogo({
  logoUrl,
  makeId,
  makeName,
  size = "large",
}: BrandLogoProps) {
  const dimension = size === "large" ? 64 : 48;
  const accent = getMakeAccent(makeId);

  return (
    <View
      accessibilityLabel={`${makeName} logo`}
      style={[
        styles.logo,
        {
          borderColor: accent,
          height: dimension,
          width: dimension,
        },
      ]}
    >
      <Text style={[styles.logoText, { color: accent }]}>
        {getMakeInitials(makeName)}
      </Text>
      {logoUrl ? (
        <Image
          alt={`${makeName} logo`}
          accessibilityLabel={`${makeName} logo`}
          source={{ uri: logoUrl }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 999,
    borderWidth: 2,
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    height: "74%",
    position: "absolute",
    width: "74%",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
  },
});
