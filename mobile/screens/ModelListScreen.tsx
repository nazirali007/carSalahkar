import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { BrandLogo } from "../components/BrandLogo";
import { EmptyState } from "../components/common/EmptyState";
import { LoadingState } from "../components/common/LoadingState";
import { ScreenContainer } from "../components/common/ScreenContainer";
import { ModelCard } from "../components/ModelCard";
import { useVehicleModels } from "../hooks/useVehicleModels";
import type { VehicleMake } from "../types/vehicle";

type ModelListScreenProps = {
  make: VehicleMake;
  onBack: () => void;
};

export function ModelListScreen({ make, onBack }: ModelListScreenProps) {
  const { error, loading, models } = useVehicleModels(make);

  return (
    <ScreenContainer>
      <Pressable accessibilityRole="button" onPress={onBack}>
        <Text style={styles.backText}>Back to all brands</Text>
      </Pressable>

      <View style={styles.detailHeader}>
        <BrandLogo makeId={make.Make_ID} makeName={make.Make_Name} />
        <View style={styles.detailTitleWrap}>
          <Text style={styles.eyebrow}>Make code {make.Make_ID}</Text>
          <Text style={styles.title}>{make.Make_Name} Models</Text>
        </View>
      </View>

      {loading ? (
        <LoadingState label="Loading models..." />
      ) : (
        <FlatList
          data={models}
          keyExtractor={(item) => String(item.Model_ID)}
          renderItem={({ item }) => <ModelCard model={item} />}
          ListHeaderComponent={
            <View>
              <View style={styles.countCard}>
                <Text style={styles.countLabel}>Models from NHTSA API</Text>
                <Text style={styles.countValue}>{models.length}</Text>
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
          }
          ListEmptyComponent={
            <EmptyState
              title="No models found"
              message="NHTSA did not return model records for this make."
            />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 28,
    paddingTop: 18,
  },
  backText: {
    color: "#52525b",
    fontSize: 14,
    fontWeight: "800",
    paddingVertical: 12,
  },
  detailHeader: {
    alignItems: "center",
    borderBottomColor: "#e4e4e7",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 16,
    paddingBottom: 22,
    paddingTop: 8,
  },
  detailTitleWrap: {
    flex: 1,
  },
  eyebrow: {
    color: "#71717a",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  title: {
    color: "#09090b",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 39,
    marginTop: 8,
  },
  countCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e4e4e7",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  countLabel: {
    color: "#71717a",
    fontSize: 14,
  },
  countValue: {
    color: "#09090b",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 2,
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 14,
  },
});
