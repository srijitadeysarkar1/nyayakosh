import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
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
import { Section, getCatColor, getCatLabel } from "@/constants/data";

const BAIL_COLOR: Record<BailStatus, string> = {
  bailable: "#059669",
  "non-bailable": "#DC2626",
  compoundable: "#2563EB",
  "not-applicable": "#333",
  varies: "#D97706",
};

const BAIL_SHORT: Record<BailStatus, string> = {
  bailable: "Bailable",
  "non-bailable": "Non-Bailable",
  compoundable: "Compoundable",
  "not-applicable": "Civil",
  varies: "Varies",
};

const BAIL_ICON: Record<BailStatus, any> = {
  bailable: "unlock",
  "non-bailable": "lock",
  compoundable: "check-circle",
  "not-applicable": "minus",
  varies: "alert-circle",
};

export default function LawDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    subtitle: string;
    category: string;
    sectionsJson: string;
  }>();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const lawId = parseInt(params.id ?? "0", 10);

  const sections: Section[] = params.sectionsJson ? JSON.parse(params.sectionsJson) : [];
  const color = getCatColor(params.category ?? "");

  const openSection = (sec: Section) => {
    router.push({
      pathname: "/section-detail",
      params: {
        no: sec.no,
        title: sec.title,
        summary: sec.summary,
        keywords: sec.keywords.join(","),
        category: params.category,
        lawTitle: params.title,
        lawId: params.id,
        lawSubtitle: params.subtitle,
      },
    });
  };

  const renderSection = ({ item: sec }: { item: Section }) => {
    const bail = getBailInfo(lawId, sec.no);
    const bColor = bail.status !== "not-applicable" ? BAIL_COLOR[bail.status] : "#333";

    return (
      <TouchableOpacity style={styles.sectionCard} onPress={() => openSection(sec)} activeOpacity={0.75}>
        <View style={styles.secRow}>
          <View style={[styles.secNoBadge, { backgroundColor: `${color}18` }]}>
            <Text style={[styles.secNo, { color }]}>{sec.no}</Text>
          </View>
          <View style={styles.secRight}>
            {bail.status !== "not-applicable" && (
              <View style={[styles.bailBadge, { backgroundColor: `${bColor}18`, borderColor: `${bColor}35` }]}>
                <Feather name={BAIL_ICON[bail.status]} size={10} color={bColor} />
                <Text style={[styles.bailBadgeText, { color: bColor }]}>{BAIL_SHORT[bail.status]}</Text>
              </View>
            )}
            <Feather name="chevron-right" size={16} color="#444" />
          </View>
        </View>
        <Text style={styles.secTitle}>{sec.title}</Text>
        <Text style={styles.secSummary} numberOfLines={2}>{sec.summary}</Text>
      </TouchableOpacity>
    );
  };

  const bailable = sections.filter((s) => getBailInfo(lawId, s.no).status === "bailable").length;
  const nonBailable = sections.filter((s) => getBailInfo(lawId, s.no).status === "non-bailable").length;
  const varies = sections.filter((s) => getBailInfo(lawId, s.no).status === "varies").length;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 4 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={18} color="#FF9933" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.catBadge, { backgroundColor: `${color}18` }]}>
            <Text style={[styles.catBadgeText, { color }]}>{getCatLabel(params.category ?? "")}</Text>
          </View>
          <Text style={styles.headerTitle} numberOfLines={2}>{params.title}</Text>
          <Text style={styles.headerSub}>{params.subtitle}</Text>
        </View>
      </View>

      <FlatList
        data={sections}
        keyExtractor={(item) => item.no}
        renderItem={renderSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 : 20, paddingTop: 8 }}
        ListHeaderComponent={
          <View>
            <Text style={styles.sectionLabel}>Sections ({sections.length})</Text>
            {(bailable > 0 || nonBailable > 0 || varies > 0) && (
              <View style={styles.bailSummary}>
                {nonBailable > 0 && (
                  <View style={[styles.summaryChip, { backgroundColor: "rgba(220,38,38,0.12)", borderColor: "rgba(220,38,38,0.3)" }]}>
                    <Feather name="lock" size={11} color="#DC2626" />
                    <Text style={[styles.summaryChipText, { color: "#DC2626" }]}>{nonBailable} Non-Bailable</Text>
                  </View>
                )}
                {bailable > 0 && (
                  <View style={[styles.summaryChip, { backgroundColor: "rgba(5,150,105,0.12)", borderColor: "rgba(5,150,105,0.3)" }]}>
                    <Feather name="unlock" size={11} color="#059669" />
                    <Text style={[styles.summaryChipText, { color: "#059669" }]}>{bailable} Bailable</Text>
                  </View>
                )}
                {varies > 0 && (
                  <View style={[styles.summaryChip, { backgroundColor: "rgba(217,119,6,0.12)", borderColor: "rgba(217,119,6,0.3)" }]}>
                    <Feather name="alert-circle" size={11} color="#D97706" />
                    <Text style={[styles.summaryChipText, { color: "#D97706" }]}>{varies} Varies</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1E" },
  header: {
    paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1,
    borderBottomColor: "rgba(255,153,51,0.12)", backgroundColor: "rgba(10,15,30,0.97)",
  },
  backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 12, alignSelf: "flex-start" },
  headerContent: { gap: 4 },
  catBadge: { alignSelf: "flex-start", borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10, marginBottom: 6 },
  catBadgeText: { fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#E8E0D0", fontFamily: "Inter_700Bold", lineHeight: 26 },
  headerSub: { fontSize: 12, color: "#555", fontFamily: "Inter_400Regular" },
  sectionLabel: {
    fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#555",
    fontFamily: "Inter_600SemiBold", paddingHorizontal: 20, paddingTop: 14, paddingBottom: 10,
  },
  bailSummary: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 20, marginBottom: 10 },
  summaryChip: { flexDirection: "row", alignItems: "center", gap: 5, borderWidth: 1, borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  summaryChipText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  sectionCard: {
    marginHorizontal: 20, marginBottom: 10, backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", borderRadius: 14, padding: 16,
  },
  secRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  secNoBadge: { borderRadius: 8, paddingVertical: 3, paddingHorizontal: 10 },
  secNo: { fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1, textTransform: "uppercase" },
  secRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  bailBadge: { flexDirection: "row", alignItems: "center", gap: 4, borderWidth: 1, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 8 },
  bailBadgeText: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 },
  secTitle: { fontSize: 15, fontWeight: "600", color: "#E8E0D0", fontFamily: "Inter_600SemiBold", marginBottom: 6 },
  secSummary: { fontSize: 13, color: "#777", lineHeight: 20, fontFamily: "Inter_400Regular" },
});
