import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CATEGORIES, LAWS_DB, NEWS_FEED, getCatColor } from "@/constants/data";

const QUICK_PILLS = ["Fraud", "Bail", "Divorce", "Murder", "Rights", "GST", "Trademark"];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState("");
  const isWeb = Platform.OS === "web";

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    router.push({ pathname: "/(tabs)/search", params: { q } });
  };

  const handlePill = (term: string) => {
    router.push({ pathname: "/(tabs)/search", params: { q: term } });
  };

  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : 0;

  const totalSections = LAWS_DB.reduce((acc, l) => acc + l.sections.length, 0);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <View style={styles.logoRow}>
          <View style={styles.logoMark}>
            <Feather name="shield" size={18} color="#0A0F1E" />
          </View>
          <View>
            <Text style={styles.logoText}>NyayaKosh</Text>
            <Text style={styles.logoSub}>न्यायकोश</Text>
          </View>
        </View>
        <Text style={styles.tagline}>INDIA'S LAW LIBRARY</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: bottomPad + 90 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Know Your{"\n"}Rights</Text>
          <Text style={styles.heroSub}>Every Indian law, explained simply</Text>

          <View style={styles.statsRow}>
            <View style={styles.statChip}>
              <Text style={styles.statNumber}>{LAWS_DB.length}</Text>
              <Text style={styles.statLabel}>Acts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statChip}>
              <Text style={styles.statNumber}>{totalSections}</Text>
              <Text style={styles.statLabel}>Sections</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statChip}>
              <Text style={styles.statNumber}>{CATEGORIES.length}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
          </View>

          <View style={styles.searchBar}>
            <Feather name="search" size={16} color="#666" style={{ marginLeft: 14 }} />
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder='Search "fraud", "bail", "GST", "trademark"...'
              placeholderTextColor="#555"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch} activeOpacity={0.8}>
              <Feather name="arrow-right" size={16} color="#0A0F1E" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            <View style={styles.pillRow}>
              {QUICK_PILLS.map((t) => (
                <TouchableOpacity key={t} style={styles.pill} onPress={() => handlePill(t)} activeOpacity={0.7}>
                  <Text style={styles.pillText}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionHead}>Browse by Category</Text>
        <View style={styles.catGrid}>
          {CATEGORIES.map((cat) => {
            const color = cat.color;
            const lawCount = LAWS_DB.filter((l) => l.category === cat.id).length;
            const sectionCount = LAWS_DB
              .filter((l) => l.category === cat.id)
              .reduce((a, l) => a + l.sections.length, 0);
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catCard, { borderColor: `${color}33`, backgroundColor: `${color}12` }]}
                onPress={() => router.push({ pathname: "/(tabs)/library", params: { cat: cat.id } })}
                activeOpacity={0.75}
              >
                <View style={[styles.catIconWrap, { backgroundColor: `${color}22` }]}>
                  <Feather name={cat.icon as any} size={20} color={color} />
                </View>
                <Text style={styles.catLabel}>{cat.label}</Text>
                <Text style={styles.catCount}>{lawCount} act{lawCount !== 1 ? "s" : ""} · {sectionCount} sections</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionHead}>Latest Updates</Text>
        {NEWS_FEED.slice(0, 2).map((n) => (
          <View key={n.id} style={styles.newsCard}>
            <Text style={styles.newsDate}>{n.date}</Text>
            <Text style={styles.newsTitle}>{n.title}</Text>
            <Text style={styles.newsSummary} numberOfLines={2}>{n.summary}</Text>
            <View style={[styles.newsTag, { backgroundColor: `${n.tagColor}22` }]}>
              <Text style={[styles.newsTagText, { color: n.tagColor }]}>{n.tag}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={() => router.push("/(tabs)/news")}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllText}>View All Updates</Text>
          <Feather name="arrow-right" size={14} color="#FF9933" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1E" },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,153,51,0.15)",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "rgba(10,15,30,0.97)",
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FF9933",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: 20, fontWeight: "700", color: "#FF9933", fontFamily: "Inter_700Bold" },
  logoSub: { fontSize: 10, color: "#555", letterSpacing: 1, fontFamily: "Inter_400Regular" },
  tagline: { fontSize: 9, color: "#333", letterSpacing: 2, fontFamily: "Inter_500Medium" },
  scroll: { flex: 1 },
  hero: { padding: 20, paddingTop: 28 },
  heroTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#FF9933",
    lineHeight: 46,
    marginBottom: 6,
    fontFamily: "Inter_700Bold",
  },
  heroSub: { fontSize: 15, color: "#888", marginBottom: 16, fontFamily: "Inter_400Regular", fontStyle: "italic" },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: "rgba(255,153,51,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.15)",
    borderRadius: 12,
    padding: 12,
  },
  statChip: { flex: 1, alignItems: "center" },
  statNumber: { fontSize: 20, fontWeight: "700", color: "#FF9933", fontFamily: "Inter_700Bold" },
  statLabel: { fontSize: 10, color: "#666", fontFamily: "Inter_400Regular", marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 },
  statDivider: { width: 1, height: 32, backgroundColor: "rgba(255,153,51,0.2)" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.35)",
    borderRadius: 14,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    color: "#E8E0D0",
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  searchBtn: {
    backgroundColor: "#FF9933",
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  pillRow: { flexDirection: "row", gap: 8, paddingHorizontal: 0 },
  pill: {
    backgroundColor: "rgba(255,153,51,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.25)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  pillText: { color: "#CC7700", fontSize: 13, fontFamily: "Inter_500Medium" },
  divider: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "rgba(255,153,51,0.15)",
    marginBottom: 4,
  },
  sectionHead: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#555",
    fontFamily: "Inter_600SemiBold",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  catGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
  },
  catCard: {
    width: "47%",
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  catIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  catLabel: { fontSize: 13, fontWeight: "600", color: "#E8E0D0", fontFamily: "Inter_600SemiBold" },
  catCount: { fontSize: 10, color: "#555", fontFamily: "Inter_400Regular" },
  newsCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 16,
  },
  newsDate: { fontSize: 11, color: "#444", fontFamily: "Inter_400Regular", marginBottom: 6 },
  newsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E8E0D0",
    fontFamily: "Inter_600SemiBold",
    lineHeight: 22,
    marginBottom: 6,
  },
  newsSummary: { fontSize: 13, color: "#777", lineHeight: 20, fontFamily: "Inter_400Regular", marginBottom: 10 },
  newsTag: { alignSelf: "flex-start", borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10 },
  newsTagText: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 0.5, textTransform: "uppercase" },
  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.25)",
    borderRadius: 20,
    paddingVertical: 10,
  },
  viewAllText: { color: "#FF9933", fontSize: 13, fontFamily: "Inter_500Medium" },
});
