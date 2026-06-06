import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CATEGORIES, getCatColor, getCatIcon, getPlainTip, searchLaws } from "@/constants/data";

const POPULAR = ["Fraud", "Bail", "Divorce", "Murder", "Equality", "Director duties", "Retrenchment"];

type SearchResult = ReturnType<typeof searchLaws>[number];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { q: initialQ } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(initialQ ?? "");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const isWeb = Platform.OS === "web";

  const topPad = isWeb ? 67 : insets.top;

  useEffect(() => {
    if (initialQ) {
      doSearch(initialQ);
    }
  }, [initialQ]);

  const doSearch = (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setHasSearched(true);
    setResults(searchLaws(q));
  };

  const tip = query ? getPlainTip(query) : null;

  const openSection = (item: SearchResult) => {
    router.push({
      pathname: "/section-detail",
      params: {
        no: item.no,
        title: item.title,
        summary: item.summary,
        keywords: item.keywords.join(","),
        category: item.category,
        lawTitle: item.lawTitle,
      },
    });
  };

  const renderResult = ({ item }: { item: SearchResult }) => {
    const color = getCatColor(item.category);
    return (
      <TouchableOpacity style={styles.resultCard} onPress={() => openSection(item)} activeOpacity={0.75}>
        <Text style={[styles.resultSection, { color }]}>
          {item.no}
        </Text>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultFrom}>{item.lawTitle}</Text>
        <Text style={styles.resultSummary} numberOfLines={3}>{item.summary}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header + search input */}
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <View style={styles.searchBar}>
          <Feather name="search" size={16} color="#666" style={{ marginLeft: 14 }} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search laws, sections, keywords..."
            placeholderTextColor="#555"
            value={query}
            onChangeText={doSearch}
            autoFocus={!initialQ}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => doSearch("")} style={{ paddingRight: 14 }}>
              <Feather name="x" size={16} color="#555" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderResult}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 90 }}
        ListHeaderComponent={
          <>
            {tip && (
              <View style={styles.tipCard}>
                <Text style={styles.tipLabel}>What does "{tip.word}" mean in law?</Text>
                <Text style={styles.tipText}>{tip.text}</Text>
              </View>
            )}
            {hasSearched && (
              <Text style={styles.resultCount}>
                {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !hasSearched ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Feather name="search" size={28} color="#333" />
              </View>
              <Text style={styles.emptyTitle}>Search any legal term</Text>
              <Text style={styles.emptySubtitle}>Act, section, or keyword</Text>
              <Text style={styles.popularLabel}>Popular Searches</Text>
              <View style={styles.pillRow}>
                {POPULAR.map((t) => (
                  <TouchableOpacity key={t} style={styles.pill} onPress={() => doSearch(t)} activeOpacity={0.7}>
                    <Text style={styles.pillText}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.noResult}>
              <View style={styles.emptyIcon}>
                <Feather name="alert-circle" size={28} color="#333" />
              </View>
              <Text style={styles.emptyTitle}>No results for "{query}"</Text>
              <Text style={styles.emptySubtitle}>Try: fraud, bail, divorce, murder, rights</Text>
            </View>
          )
        }
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.3)",
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 13,
    color: "#E8E0D0",
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  tipCard: {
    margin: 16,
    backgroundColor: "rgba(255,153,51,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.22)",
    borderRadius: 14,
    padding: 14,
  },
  tipLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#FF9933",
    fontFamily: "Inter_600SemiBold",
    marginBottom: 6,
  },
  tipText: { fontSize: 14, color: "#C0B090", lineHeight: 22, fontFamily: "Inter_400Regular" },
  resultCount: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 6,
    fontSize: 12,
    color: "#555",
    fontFamily: "Inter_500Medium",
  },
  resultCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 16,
  },
  resultSection: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E8E0D0",
    fontFamily: "Inter_600SemiBold",
    marginBottom: 3,
  },
  resultFrom: { fontSize: 12, color: "#555", fontFamily: "Inter_400Regular", marginBottom: 8 },
  resultSummary: { fontSize: 13, color: "#777", lineHeight: 20, fontFamily: "Inter_400Regular" },
  emptyState: { padding: 32, alignItems: "center" },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  emptySubtitle: { fontSize: 13, color: "#444", fontFamily: "Inter_400Regular", marginBottom: 24 },
  popularLabel: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#444",
    fontFamily: "Inter_600SemiBold",
    marginBottom: 12,
  },
  pillRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  pill: {
    backgroundColor: "rgba(255,153,51,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.22)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  pillText: { color: "#CC7700", fontSize: 13, fontFamily: "Inter_500Medium" },
  noResult: { padding: 48, alignItems: "center" },
});
