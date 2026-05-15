import { FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { EmptyState } from "../components/common/EmptyState";
import { LoadingState } from "../components/common/LoadingState";
import { ScreenContainer } from "../components/common/ScreenContainer";
import { MakeCard } from "../components/MakeCard";
import { useVehicleMakes } from "../hooks/useVehicleMakes";
import type { VehicleMake } from "../types/vehicle";

type MakeListScreenProps = {
  onSelectMake: (make: VehicleMake) => void;
};

export function MakeListScreen({ onSelectMake }: MakeListScreenProps) {
  const { error, filteredMakes, loading, makes, matchingModels, search, setSearch } =
    useVehicleMakes();

  return (
    <ScreenContainer>
      <FlatList
        data={filteredMakes}
        keyExtractor={(item) => String(item.Make_ID)}
        renderItem={({ item }) => (
          <MakeCard make={item} onPress={onSelectMake} />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Car Salahkar</Text>
            <Text style={styles.title}>Choose an India Car Brand</Text>
            <Text style={styles.description}>
              Browse car companies with models launched in India. Search by
              company or model name, then select a brand to see its
              India-market cars.
            </Text>

            <Text style={styles.inputLabel}>Search car company or model</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search by company or car model"
              placeholderTextColor="#a1a1aa"
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />

            <Text style={styles.resultCount}>
              Showing {filteredMakes.length} of {makes.length} companies
              {search.trim()
                ? ` and ${matchingModels.length} matching models`
                : ""}
            </Text>

            {matchingModels.length > 0 ? (
              <View style={styles.modelResults}>
                <Text style={styles.modelResultsTitle}>Matching car models</Text>
                {matchingModels.map((model) => (
                  <View key={model.Model_ID} style={styles.modelResultCard}>
                    <Image
                      alt={`${model.Make_Name} ${model.Model_Name}`}
                      accessibilityLabel={`${model.Make_Name} ${model.Model_Name}`}
                      source={{ uri: model.Image_URL }}
                      style={styles.modelResultImage}
                      resizeMode="cover"
                    />
                    <View style={styles.modelResultLogo}>
                      <Image
                        alt={`${model.Make_Name} logo`}
                        accessibilityLabel={`${model.Make_Name} logo`}
                        source={{ uri: model.Logo_URL }}
                        style={styles.modelResultLogoImage}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.modelResultText}>
                      <Text numberOfLines={1} style={styles.modelResultName}>
                        {model.Model_Name}
                      </Text>
                      <Text style={styles.modelResultMake}>
                        {model.Make_Name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : null}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <LoadingState label="Loading companies..." />
          ) : (
            <EmptyState
              title="No company found"
              message="Try another brand name."
            />
          )
        }
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 28,
    paddingTop: 18,
  },
  header: {
    paddingBottom: 18,
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
  description: {
    color: "#52525b",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14,
  },
  inputLabel: {
    color: "#3f3f46",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 28,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderColor: "#d4d4d8",
    borderRadius: 8,
    borderWidth: 1,
    color: "#09090b",
    fontSize: 16,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 14,
  },
  resultCount: {
    color: "#71717a",
    fontSize: 14,
    marginTop: 14,
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12,
  },
  modelResultCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e4e4e7",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
    overflow: "hidden",
    padding: 10,
  },
  modelResultImage: {
    backgroundColor: "#f4f4f5",
    borderRadius: 6,
    height: 66,
    width: 92,
  },
  modelResultLogo: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e4e4e7",
    borderRadius: 999,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    left: 72,
    overflow: "hidden",
    position: "absolute",
    top: 42,
    width: 34,
  },
  modelResultLogoImage: {
    height: 24,
    width: 24,
  },
  modelResultMake: {
    color: "#71717a",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 3,
  },
  modelResultName: {
    color: "#09090b",
    fontSize: 18,
    fontWeight: "900",
  },
  modelResultText: {
    flex: 1,
  },
  modelResults: {
    marginTop: 16,
  },
  modelResultsTitle: {
    color: "#71717a",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
});
