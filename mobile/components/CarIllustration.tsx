import { StyleSheet, View } from "react-native";

export function CarIllustration() {
  return (
    <View style={styles.scene} accessible accessibilityLabel="Car image">
      <View style={styles.car}>
        <View style={styles.cabin} />
        <View style={styles.body} />
        <View style={[styles.light, styles.frontLight]} />
        <View style={[styles.light, styles.backLight]} />
        <View style={[styles.wheel, styles.leftWheel]} />
        <View style={[styles.wheel, styles.rightWheel]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    alignItems: "center",
    backgroundColor: "#dbeafe",
    borderRadius: 8,
    height: 150,
    justifyContent: "center",
    overflow: "hidden",
  },
  car: {
    height: 82,
    position: "relative",
    width: 220,
  },
  cabin: {
    backgroundColor: "#475569",
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    height: 42,
    left: 58,
    position: "absolute",
    right: 58,
    top: 8,
  },
  body: {
    backgroundColor: "#111827",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 18,
    height: 42,
    left: 18,
    position: "absolute",
    right: 18,
  },
  light: {
    bottom: 36,
    height: 8,
    position: "absolute",
    width: 26,
  },
  frontLight: {
    backgroundColor: "#facc15",
    borderRadius: 999,
    left: 30,
  },
  backLight: {
    backgroundColor: "#fb7185",
    borderRadius: 999,
    right: 30,
  },
  wheel: {
    backgroundColor: "#ffffff",
    borderColor: "#1f2937",
    borderRadius: 999,
    borderWidth: 8,
    bottom: 0,
    height: 42,
    position: "absolute",
    width: 42,
  },
  leftWheel: {
    left: 42,
  },
  rightWheel: {
    right: 42,
  },
});
