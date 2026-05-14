import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
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
  const { error, filteredMakes, loading, makes, search, setSearch } =
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
            <Text style={styles.title}>Choose a Car Brand</Text>
            <Text style={styles.description}>
              Browse car companies from the NHTSA vPIC API. Search by company
              name or make code, then select a brand to see its vehicle models.
            </Text>

            <Text style={styles.inputLabel}>Search car company</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search by name or make code"
              placeholderTextColor="#a1a1aa"
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />

            <Text style={styles.resultCount}>
              Showing {filteredMakes.length} of {makes.length} companies
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <LoadingState label="Loading companies..." />
          ) : (
            <EmptyState
              title="No company found"
              message="Try another brand name or make code."
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
});
