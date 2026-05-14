import { StyleSheet, Text, View } from "react-native";
import { getMakeAccent, getMakeInitials } from "../services/nhtsa";

type BrandLogoProps = {
  makeId: number;
  makeName: string;
  size?: "small" | "large";
};

export function BrandLogo({
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
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
  },
});
