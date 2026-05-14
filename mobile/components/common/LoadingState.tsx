import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoadingStateProps = {
  label: string;
};

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <View style={styles.centerState}>
      <ActivityIndicator size="large" color="#18181b" />
      <Text style={styles.stateText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerState: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 50,
  },
  stateText: {
    color: "#52525b",
    fontSize: 15,
  },
});
