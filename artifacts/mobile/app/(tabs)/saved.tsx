import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getBailInfo, BailStatus } from "@/constants/bail-info";
import { getCatColor, getCatLabel } from "@/constants/data";
import { Bookmark, useBookmarks } from "@/hooks/useBookmarks";

const BAIL_COLOR: Record<BailStatus, string> = {
  bailable: "#059669",
  "non-bailable": "#DC2626",
  compoundable: "#2563EB",
  "not-applicable": "#444",
  varies: "#D97706",
};

const BAIL_SHORT: Record<BailStatus, string> = {
  bailable: "Bailable",
  "non-bailable": "Non-Bailable",
  compoundable: "Compoundable",
  "not-applicable": "Civil",
  varies: "Varies",
};

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const { bookmarks, loaded, removeBookmark } = useBookmarks();
  const [removing, setRemoving] = useState<string | null>(null);

  const handleOpen = (bm: Bookmark) => {
    router.push({
      pathname: "/section-detail",
      params: {
        no: bm.sectionNo,
        title: bm.sectionTitle,
        summary: bm.summary,
        keywords: bm.keywords.join(","),
        category: bm.category,
        lawTitle: bm.lawTitle,
        lawId: bm.lawId.toString(),
        lawSubtitle: bm.lawSubtitle,
      },
    });
  };

  const handleRemove = async (id: string) => {
    setRemoving(id);
    await removeBookmark(id);
    setRemoving(null);
  };

  const renderItem = ({ item }: { item: Bookmark }) => {
    const color = getCatColor(item.category);
    const bail = getBailInfo(item.lawId, item.sectionNo);
    const bColor = bail.status !== "not-applicable" ? BAIL_COLOR[bail.status] : "#444";

    return (
      <TouchableOpacity
        style={[styles.card, removing === item.id && { opacity: 0.4 }]}
        onPress={() => handleOpen(item)}
        activeOpacity={0.75}
      >
        <View style={styles.cardTop}>
          <View style={[styles.catBadge, { backgroundColor: `${color}18` }]}>
            <Text style={[styles.catBadgeText, { color }]}>{getCatLabel(item.category)}</Text>
          </View>
          <View style={styles.cardTopRight}>
            {bail.status !== "not-applicable" && (
              <View style={[styles.bailBadge, { backgroundColor: `${bColor}18`, borderColor: `${bColor}35` }]}>
                <Feather name={bail.status === "non-bailable" ? "lock" : bail.status === "bailable" ? "unlock" : "alert-circle"} size={10} color={bColor} />
                <Text style={[styles.bailBadgeText, { color: bColor }]}>{BAIL_SHORT[bail.status]}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => handleRemove(item.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="x" size={14} color="#444" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.secNoBadge, { backgroundColor: `${color}12` }]}>
          <Text style={[styles.secNo, { color }]}>{item.sectionNo}</Text>
        </View>
        <Text style={styles.sectionTitle}>{item.sectionTitle}</Text>
        <Text style={styles.lawName}>{item.lawTitle}</Text>
        <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={styles.headerTitle}>Saved Sections</Text>
        {bookmarks.length > 0 && (
          <Text style={styles.headerCount}>{bookmarks.length} saved</Text>
        )}
      </View>

      {!loaded ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Loading…</Text>
        </View>
      ) : bookmarks.length === 0 ? (
        <View style={styles.center}>
          <View style={styles.emptyIcon}>
            <Feather name="bookmark" size={32} color="#333" />
          </View>
          <Text style={styles.emptyTitle}>No Saved Sections</Text>
          <Text style={styles.emptyText}>
            Tap the bookmark icon on any section to save it here for quick reference.
          </Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => router.push("/(tabs)/library")}
            activeOpacity={0.8}
          >
            <Feather name="book-open" size={14} color="#0A0F1E" />
            <Text style={styles.exploreBtnText}>Browse Laws</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 90, paddingTop: 4 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1E" },
  header: {
    paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1,
    borderBottomColor: "rgba(255,153,51,0.12)", backgroundColor: "rgba(10,15,30,0.97)",
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#E8E0D0", fontFamily: "Inter_700Bold" },
  headerCount: { fontSize: 12, color: "#555", fontFamily: "Inter_400Regular" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40, gap: 12 },
  emptyIcon: {
    width: 72, height: 72, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", alignItems: "center", justifyContent: "center",
    marginBottom: 4,
  },
  emptyTitle: { fontSize: 18, fontWeight: "600", color: "#555", fontFamily: "Inter_600SemiBold" },
  emptyText: { fontSize: 14, color: "#333", textAlign: "center", lineHeight: 22, fontFamily: "Inter_400Regular" },
  exploreBtn: {
    flexDirection: "row", gap: 8, alignItems: "center",
    backgroundColor: "#FF9933", borderRadius: 20, paddingVertical: 10, paddingHorizontal: 20, marginTop: 8,
  },
  exploreBtnText: { color: "#0A0F1E", fontFamily: "Inter_700Bold", fontSize: 14 },
  card: {
    marginHorizontal: 20, marginTop: 10, backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", borderRadius: 14, padding: 16, gap: 6,
  },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardTopRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  catBadge: { alignSelf: "flex-start", borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10 },
  catBadgeText: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 },
  bailBadge: { flexDirection: "row", alignItems: "center", gap: 4, borderWidth: 1, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 8 },
  bailBadgeText: { fontSize: 10, fontFamily: "Inter_600SemiBold" },
  removeBtn: { padding: 2 },
  secNoBadge: { alignSelf: "flex-start", borderRadius: 8, paddingVertical: 3, paddingHorizontal: 10 },
  secNo: { fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1, textTransform: "uppercase" },
  sectionTitle: { fontSize: 15, fontWeight: "600", color: "#E8E0D0", fontFamily: "Inter_600SemiBold" },
  lawName: { fontSize: 11, color: "#444", fontFamily: "Inter_400Regular" },
  summary: { fontSize: 13, color: "#666", lineHeight: 20, fontFamily: "Inter_400Regular" },
});
