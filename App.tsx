import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { BrandLogo } from "./mobile/components/BrandLogo";
import { MakeCard } from "./mobile/components/MakeCard";
import { ModelCard } from "./mobile/components/ModelCard";
import { getAllMakes, getModelsForMakeId } from "./mobile/services/nhtsa";
import type { Screen, VehicleMake, VehicleModel } from "./mobile/types/vehicle";

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "makes" });
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadMakes() {
      try {
        setError(null);
        setLoading(true);
        const results = await getAllMakes();

        if (active) {
          setMakes(results);
        }
      } catch {
        if (active) {
          setError("Could not load car companies. Check your internet and try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadMakes();

    return () => {
      active = false;
    };
  }, []);

  const filteredMakes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return makes;
    }

    return makes.filter(
      (make) =>
        make.Make_Name.toLowerCase().includes(query) ||
        String(make.Make_ID).includes(query),
    );
  }, [makes, search]);

  async function openMake(make: VehicleMake) {
    setScreen({ name: "models", make });
    setModels([]);
    setModelsLoading(true);
    setError(null);

    try {
      const results = await getModelsForMakeId(make.Make_ID);
      setModels(results);
    } catch {
      setError("Could not load car models for this company.");
    } finally {
      setModelsLoading(false);
    }
  }

  function goBack() {
    setScreen({ name: "makes" });
    setModels([]);
    setError(null);
  }

  if (screen.name === "models") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Pressable accessibilityRole="button" onPress={goBack}>
            <Text style={styles.backText}>Back to all brands</Text>
          </Pressable>

          <View style={styles.detailHeader}>
            <BrandLogo
              makeId={screen.make.Make_ID}
              makeName={screen.make.Make_Name}
            />
            <View style={styles.detailTitleWrap}>
              <Text style={styles.eyebrow}>Make code {screen.make.Make_ID}</Text>
              <Text style={styles.title}>{screen.make.Make_Name} Models</Text>
            </View>
          </View>

          {modelsLoading ? (
            <View style={styles.centerState}>
              <ActivityIndicator size="large" color="#18181b" />
              <Text style={styles.stateText}>Loading models...</Text>
            </View>
          ) : (
            <FlatList
              data={models}
              keyExtractor={(item) => String(item.Model_ID)}
              renderItem={({ item }) => <ModelCard model={item} />}
              ListHeaderComponent={
                <View style={styles.countCard}>
                  <Text style={styles.countLabel}>Models from NHTSA API</Text>
                  <Text style={styles.countValue}>{models.length}</Text>
                </View>
              }
              ListEmptyComponent={
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyTitle}>No models found</Text>
                  <Text style={styles.emptyText}>
                    NHTSA did not return model records for this make.
                  </Text>
                </View>
              }
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <FlatList
          data={filteredMakes}
          keyExtractor={(item) => String(item.Make_ID)}
          renderItem={({ item }) => <MakeCard make={item} onPress={openMake} />}
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
              <View style={styles.centerState}>
                <ActivityIndicator size="large" color="#18181b" />
                <Text style={styles.stateText}>Loading companies...</Text>
              </View>
            ) : (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No company found</Text>
                <Text style={styles.emptyText}>Try another brand name or make code.</Text>
              </View>
            )
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  centerState: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 50,
  },
  stateText: {
    color: "#52525b",
    fontSize: 15,
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
  emptyCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#d4d4d8",
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    padding: 28,
  },
  emptyTitle: {
    color: "#09090b",
    fontSize: 17,
    fontWeight: "800",
  },
  emptyText: {
    color: "#71717a",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
});
