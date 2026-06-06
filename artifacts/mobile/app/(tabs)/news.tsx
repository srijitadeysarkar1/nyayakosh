import { Feather } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { API_BASE } from "@/constants/config";

interface Article {
  id: number;
  date: string;
  category: string;
  title: string;
  summary: string;
  tag: string;
  tagColor: string;
  published: boolean;
  createdAt: string;
}

async function fetchNews(): Promise<Article[]> {
  const res = await fetch(`${API_BASE}/news?limit=50`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.articles as Article[];
}

export default function NewsScreen() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const data = await fetchNews();
      setArticles(data);
    } catch (e: any) {
      setError("Could not load updates. Check your connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load(true);
  };

  const renderItem = ({ item: n }: { item: Article }) => (
    <View style={styles.newsCard}>
      <View style={styles.newsCardTop}>
        <Text style={styles.newsDate}>{n.date} · {n.category}</Text>
        <View style={[styles.tag, { backgroundColor: `${n.tagColor}20` }]}>
          <Text style={[styles.tagText, { color: n.tagColor }]}>{n.tag}</Text>
        </View>
      </View>
      <Text style={styles.newsTitle}>{n.title}</Text>
      <Text style={styles.newsSummary}>{n.summary}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <View>
          <Text style={styles.headerTitle}>Legal Updates</Text>
          <Text style={styles.headerSub}>Judgments, new laws & amendments</Text>
        </View>
        {!loading && (
          <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn} activeOpacity={0.7}>
            <Feather name="refresh-cw" size={16} color="#555" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF9933" />
          <Text style={styles.loadingText}>Loading updates…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Feather name="wifi-off" size={32} color="#333" style={{ marginBottom: 12 }} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => load()} activeOpacity={0.8}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 90, paddingTop: 12 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FF9933"
              colors={["#FF9933"]}
            />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Feather name="inbox" size={32} color="#333" style={{ marginBottom: 12 }} />
              <Text style={styles.emptyText}>No articles yet</Text>
            </View>
          }
          ListFooterComponent={
            articles.length > 0 ? (
              <View style={styles.footerCard}>
                <View style={styles.footerIcon}>
                  <Feather name="bell" size={20} color="#FF9933" />
                </View>
                <Text style={styles.footerTitle}>Live Updates</Text>
                <Text style={styles.footerDesc}>
                  Pull down to refresh for the latest Supreme Court judgments, Parliament acts and amendments.
                </Text>
                <Text style={styles.footerCount}>{articles.length} article{articles.length !== 1 ? "s" : ""} loaded</Text>
              </View>
            ) : null
          }
        />
      )}
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
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#E8E0D0", fontFamily: "Inter_700Bold" },
  headerSub: { fontSize: 12, color: "#555", fontFamily: "Inter_400Regular", marginTop: 2 },
  refreshBtn: { padding: 6 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 80, gap: 8 },
  loadingText: { color: "#444", fontSize: 13, fontFamily: "Inter_400Regular" },
  errorText: { color: "#666", fontSize: 14, textAlign: "center", fontFamily: "Inter_400Regular", lineHeight: 22 },
  emptyText: { color: "#444", fontSize: 14, fontFamily: "Inter_400Regular" },
  retryBtn: {
    marginTop: 8,
    backgroundColor: "#FF9933",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  retryText: { color: "#0A0F1E", fontFamily: "Inter_700Bold", fontSize: 13 },
  newsCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 16,
  },
  newsCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  newsDate: { fontSize: 11, color: "#444", fontFamily: "Inter_400Regular", flex: 1, marginRight: 8 },
  tag: { borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10 },
  tagText: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 0.5, textTransform: "uppercase" },
  newsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E8E0D0",
    fontFamily: "Inter_600SemiBold",
    lineHeight: 22,
    marginBottom: 8,
  },
  newsSummary: { fontSize: 13, color: "#777", lineHeight: 20, fontFamily: "Inter_400Regular" },
  footerCard: {
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 10,
    backgroundColor: "rgba(255,153,51,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.15)",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    gap: 6,
  },
  footerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,153,51,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  footerTitle: { fontSize: 14, fontWeight: "600", color: "#C0A060", fontFamily: "Inter_600SemiBold" },
  footerDesc: { fontSize: 12, color: "#555", textAlign: "center", lineHeight: 18, fontFamily: "Inter_400Regular" },
  footerCount: { fontSize: 11, color: "#333", fontFamily: "Inter_400Regular", marginTop: 4 },
});
