import type { ReactNode } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

type ScreenContainerProps = {
  children: ReactNode;
};

export function ScreenContainer({ children }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fafafa",
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
});
