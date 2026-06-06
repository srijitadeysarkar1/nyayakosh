import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CATEGORIES, LAWS_DB, Law, getCatColor, getCatLabel } from "@/constants/data";

export default function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const { cat: initialCat } = useLocalSearchParams<{ cat?: string }>();
  const [selectedCat, setSelectedCat] = useState<string | null>(initialCat ?? null);
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;

  useEffect(() => {
    if (initialCat) setSelectedCat(initialCat);
  }, [initialCat]);

  const displayedLaws = selectedCat ? LAWS_DB.filter((l) => l.category === selectedCat) : LAWS_DB;

  const openLaw = (law: Law) => {
    router.push({
      pathname: "/law-detail",
      params: {
        id: law.id.toString(),
        title: law.title,
        subtitle: law.subtitle,
        category: law.category,
        sectionsJson: JSON.stringify(law.sections),
      },
    });
  };

  const renderLaw = ({ item: law }: { item: Law }) => {
    const color = getCatColor(law.category);
    return (
      <TouchableOpacity style={styles.lawCard} onPress={() => openLaw(law)} activeOpacity={0.75}>
        <Text style={styles.lawTitle}>{law.title}</Text>
        <Text style={styles.lawSub}>{law.subtitle}</Text>
        <View style={styles.lawMeta}>
          <View style={[styles.badge, { backgroundColor: `${color}20`, borderColor: `${color}40` }]}>
            <Text style={[styles.badgeText, { color }]}>{getCatLabel(law.category)}</Text>
          </View>
          <Text style={styles.sectionCount}>{law.sections.length} section{law.sections.length !== 1 ? "s" : ""}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={styles.headerTitle}>Law Library</Text>
      </View>

      {/* Category filter */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, !selectedCat && styles.filterChipActive]}
            onPress={() => setSelectedCat(null)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterChipText, !selectedCat && styles.filterChipTextActive]}>All</Text>
          </TouchableOpacity>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.filterChip, selectedCat === cat.id && styles.filterChipActive]}
              onPress={() => setSelectedCat(selectedCat === cat.id ? null : cat.id)}
              activeOpacity={0.7}
            >
              <Feather
                name={cat.icon as any}
                size={12}
                color={selectedCat === cat.id ? "#FF9933" : "#555"}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.filterChipText, selectedCat === cat.id && styles.filterChipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={displayedLaws}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLaw}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 90, paddingTop: 4 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1E" },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,153,51,0.12)",
    backgroundColor: "rgba(10,15,30,0.97)",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#E8E0D0", fontFamily: "Inter_700Bold" },
  filterWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    paddingVertical: 12,
  },
  filterRow: { paddingHorizontal: 16, gap: 8 },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  filterChipActive: {
    borderColor: "#FF9933",
    backgroundColor: "rgba(255,153,51,0.12)",
  },
  filterChipText: { fontSize: 13, color: "#555", fontFamily: "Inter_500Medium" },
  filterChipTextActive: { color: "#FF9933" },
  lawCard: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 16,
  },
  lawTitle: { fontSize: 16, fontWeight: "600", color: "#E8E0D0", fontFamily: "Inter_600SemiBold", marginBottom: 4 },
  lawSub: { fontSize: 12, color: "#555", fontFamily: "Inter_400Regular", marginBottom: 12 },
  lawMeta: { flexDirection: "row", alignItems: "center", gap: 10 },
  badge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  badgeText: { fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 },
  sectionCount: { fontSize: 11, color: "#444", fontFamily: "Inter_400Regular" },
});
