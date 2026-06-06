import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getBailInfo, BailStatus } from "@/constants/bail-info";
import { PLAIN_LANGUAGE, getCatColor, getCatLabel } from "@/constants/data";
import { useBookmarks } from "@/hooks/useBookmarks";

const BAIL_COLOR: Record<BailStatus, string> = {
  bailable: "#059669",
  "non-bailable": "#DC2626",
  compoundable: "#2563EB",
  "not-applicable": "#555",
  varies: "#D97706",
};

const BAIL_LABEL: Record<BailStatus, string> = {
  bailable: "BAILABLE",
  "non-bailable": "NON-BAILABLE",
  compoundable: "BAILABLE & COMPOUNDABLE",
  "not-applicable": "N/A (CIVIL / PROCEDURAL)",
  varies: "VARIES BY CIRCUMSTANCE",
};

const BAIL_ICON: Record<BailStatus, any> = {
  bailable: "unlock",
  "non-bailable": "lock",
  compoundable: "check-circle",
  "not-applicable": "minus-circle",
  varies: "alert-circle",
};

export default function SectionDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    no: string;
    title: string;
    summary: string;
    keywords: string;
    category: string;
    lawTitle: string;
    lawId: string;
    lawSubtitle: string;
  }>();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;

  const keywords = params.keywords ? params.keywords.split(",") : [];
  const color = getCatColor(params.category ?? "");
  const lawId = parseInt(params.lawId ?? "0", 10);

  const bailInfo = getBailInfo(lawId, params.no ?? "");

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(lawId, params.no ?? ""));
  }, [isBookmarked, lawId, params.no]);

  const handleBookmark = async () => {
    await toggleBookmark({
      lawId,
      lawTitle: params.lawTitle ?? "",
      lawSubtitle: params.lawSubtitle ?? "",
      category: params.category ?? "",
      sectionNo: params.no ?? "",
      sectionTitle: params.title ?? "",
      summary: params.summary ?? "",
      keywords,
    });
    setBookmarked((v) => !v);
  };

  const plainExplanation =
    PLAIN_LANGUAGE[keywords[0] ?? ""] ??
    `This section covers ${(params.title ?? "").toLowerCase()}. It is part of ${params.lawTitle} and applies to situations involving ${keywords.slice(0, 3).join(", ")}. Always consult a qualified lawyer for your specific situation.`;

  const bailColor = BAIL_COLOR[bailInfo.status];
  const isNonBailable = bailInfo.status === "non-bailable";
  const isBailable = bailInfo.status === "bailable";
  const isVaries = bailInfo.status === "varies";

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 4 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Feather name="arrow-left" size={18} color="#FF9933" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkBtn} onPress={handleBookmark} activeOpacity={0.7}>
            <Feather
              name={bookmarked ? "bookmark" : "bookmark"}
              size={20}
              color={bookmarked ? "#FF9933" : "#444"}
              style={{ opacity: bookmarked ? 1 : 0.6 }}
            />
            {bookmarked && <View style={styles.bookmarkDot} />}
          </TouchableOpacity>
        </View>
        <View style={[styles.catBadge, { backgroundColor: `${color}18` }]}>
          <Text style={[styles.catBadgeText, { color }]}>{getCatLabel(params.category ?? "")}</Text>
        </View>
        <Text style={styles.headerTitle} numberOfLines={2}>{params.title}</Text>
        <Text style={styles.headerSub}>{params.no} · {params.lawTitle}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: isWeb ? 34 : 32 }}>

        {/* ── BAIL STATUS CARD ── */}
        {bailInfo.status !== "not-applicable" && (
          <View style={[styles.bailCard, { borderColor: `${bailColor}40`, backgroundColor: `${bailColor}10` }]}>
            <View style={styles.bailHeader}>
              <View style={[styles.bailIconWrap, { backgroundColor: `${bailColor}20` }]}>
                <Feather name={BAIL_ICON[bailInfo.status]} size={18} color={bailColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bailLabel}>BAIL STATUS</Text>
                <Text style={[styles.bailStatus, { color: bailColor }]}>
                  {BAIL_LABEL[bailInfo.status]}
                </Text>
              </View>
            </View>

            {bailInfo.cognizable !== null && (
              <View style={styles.cognizableRow}>
                <View style={[styles.cogBadge, { backgroundColor: bailInfo.cognizable ? "rgba(220,38,38,0.15)" : "rgba(5,150,105,0.15)" }]}>
                  <Feather name={bailInfo.cognizable ? "alert-triangle" : "check"} size={11} color={bailInfo.cognizable ? "#DC2626" : "#059669"} />
                  <Text style={[styles.cogBadgeText, { color: bailInfo.cognizable ? "#DC2626" : "#059669" }]}>
                    {bailInfo.cognizable ? "COGNIZABLE" : "NON-COGNIZABLE"}
                  </Text>
                </View>
                <Text style={styles.cogExplain}>
                  {bailInfo.cognizable
                    ? "Police may arrest without warrant"
                    : "Police require a warrant to arrest"}
                </Text>
              </View>
            )}

            <Text style={styles.bailConditions}>{bailInfo.conditions}</Text>

            {bailInfo.triedBy && (
              <View style={styles.triedByRow}>
                <Feather name="grid" size={11} color="#555" />
                <Text style={styles.triedByText}>Tried by: <Text style={styles.triedByVal}>{bailInfo.triedBy}</Text></Text>
              </View>
            )}

            {isNonBailable && (
              <View style={styles.bailTip}>
                <Feather name="info" size={12} color="#DC2626" />
                <Text style={styles.bailTipText}>Only a Sessions Court or High Court can grant bail for non-bailable offences. You must engage a lawyer and file a bail application.</Text>
              </View>
            )}
            {isBailable && (
              <View style={[styles.bailTip, { borderColor: "rgba(5,150,105,0.3)", backgroundColor: "rgba(5,150,105,0.06)" }]}>
                <Feather name="info" size={12} color="#059669" />
                <Text style={[styles.bailTipText, { color: "#059669" }]}>For bailable offences, bail is a right — not a favour. The police or Magistrate must release you if you are ready to provide surety.</Text>
              </View>
            )}
            {isVaries && (
              <View style={[styles.bailTip, { borderColor: "rgba(217,119,6,0.3)", backgroundColor: "rgba(217,119,6,0.06)" }]}>
                <Feather name="info" size={12} color="#D97706" />
                <Text style={[styles.bailTipText, { color: "#D97706" }]}>Bail status depends on the specific facts — consult a lawyer to determine the applicable bail conditions in your case.</Text>
              </View>
            )}
          </View>
        )}

        {bailInfo.status === "not-applicable" && (
          <View style={styles.bailNACard}>
            <Feather name="minus-circle" size={14} color="#333" />
            <Text style={styles.bailNAText}>Civil / Administrative Provision — No criminal bail considerations apply</Text>
          </View>
        )}

        {/* ── FULL TEXT ── */}
        <Text style={styles.blockLabel}>Full Text</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bodyText}>{params.summary}</Text>
        </View>

        {/* ── PLAIN LANGUAGE ── */}
        <View style={styles.plainCard}>
          <View style={styles.plainHeader}>
            <Feather name="message-circle" size={14} color="#059669" />
            <Text style={styles.plainLabel}>Plain Language Explanation</Text>
          </View>
          <Text style={styles.plainText}>{plainExplanation}</Text>
        </View>

        {/* ── KEY TERMS ── */}
        {keywords.length > 0 && (
          <View style={styles.keywordsCard}>
            <View style={styles.keywordsHeader}>
              <Feather name="tag" size={13} color="#60A5FA" />
              <Text style={styles.keywordsLabel}>Key Terms</Text>
            </View>
            <View style={styles.keywordsRow}>
              {keywords.map((k) => (
                <View key={k} style={styles.keyword}>
                  <Text style={styles.keywordText}>{k}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── DISCLAIMER ── */}
        <View style={styles.disclaimerCard}>
          <Feather name="alert-triangle" size={13} color="#AA6600" />
          <Text style={styles.disclaimerText}>
            This information is for educational purposes only. For legal advice specific to your situation, please consult a qualified advocate.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1E" },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,153,51,0.12)",
    backgroundColor: "rgba(10,15,30,0.97)",
    gap: 6,
  },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 },
  backBtn: { flexDirection: "row", alignItems: "center" },
  bookmarkBtn: { position: "relative", padding: 4 },
  bookmarkDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FF9933",
    borderWidth: 1,
    borderColor: "#0A0F1E",
  },
  catBadge: { alignSelf: "flex-start", borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10 },
  catBadgeText: { fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#E8E0D0", fontFamily: "Inter_700Bold", lineHeight: 26 },
  headerSub: { fontSize: 12, color: "#555", fontFamily: "Inter_400Regular" },

  bailCard: {
    marginHorizontal: 20,
    marginTop: 18,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  bailHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  bailIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  bailLabel: { fontSize: 9, letterSpacing: 2, color: "#555", fontFamily: "Inter_600SemiBold", textTransform: "uppercase", marginBottom: 2 },
  bailStatus: { fontSize: 15, fontWeight: "700", fontFamily: "Inter_700Bold", letterSpacing: 0.2 },
  cognizableRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  cogBadge: { flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10 },
  cogBadgeText: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 0.5 },
  cogExplain: { fontSize: 12, color: "#555", fontFamily: "Inter_400Regular", flex: 1 },
  bailConditions: { fontSize: 13, color: "#C8C0B0", lineHeight: 21, fontFamily: "Inter_400Regular" },
  triedByRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  triedByText: { fontSize: 11, color: "#444", fontFamily: "Inter_400Regular" },
  triedByVal: { color: "#888", fontFamily: "Inter_600SemiBold" },
  bailTip: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    backgroundColor: "rgba(220,38,38,0.06)",
    borderWidth: 1,
    borderColor: "rgba(220,38,38,0.2)",
    borderRadius: 10,
    padding: 10,
  },
  bailTipText: { flex: 1, fontSize: 12, color: "#EF4444", lineHeight: 18, fontFamily: "Inter_400Regular" },
  bailNACard: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: 12,
  },
  bailNAText: { fontSize: 12, color: "#444", fontFamily: "Inter_400Regular" },

  blockLabel: {
    fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#555",
    fontFamily: "Inter_600SemiBold", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10,
  },
  textBlock: {
    marginHorizontal: 20, backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", borderRadius: 14, padding: 18,
  },
  bodyText: { fontSize: 15, color: "#C8C0B0", lineHeight: 26, fontFamily: "Inter_400Regular" },
  plainCard: {
    marginHorizontal: 20, marginTop: 14, backgroundColor: "rgba(5,150,105,0.08)",
    borderWidth: 1, borderColor: "rgba(5,150,105,0.2)", borderRadius: 14, padding: 16,
  },
  plainHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  plainLabel: { fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "#059669", fontFamily: "Inter_600SemiBold" },
  plainText: { fontSize: 14, color: "#80C878", lineHeight: 22, fontFamily: "Inter_400Regular" },
  keywordsCard: {
    marginHorizontal: 20, marginTop: 14, backgroundColor: "rgba(37,99,235,0.08)",
    borderWidth: 1, borderColor: "rgba(37,99,235,0.2)", borderRadius: 14, padding: 16,
  },
  keywordsHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 },
  keywordsLabel: { fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "#60A5FA", fontFamily: "Inter_600SemiBold" },
  keywordsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  keyword: {
    backgroundColor: "rgba(37,99,235,0.1)", borderWidth: 1, borderColor: "rgba(37,99,235,0.2)",
    borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12,
  },
  keywordText: { fontSize: 12, color: "#93C5FD", fontFamily: "Inter_500Medium" },
  disclaimerCard: {
    marginHorizontal: 20, marginTop: 14, backgroundColor: "rgba(255,153,51,0.06)",
    borderWidth: 1, borderColor: "rgba(255,153,51,0.15)", borderRadius: 12, padding: 14,
    flexDirection: "row", gap: 10, alignItems: "flex-start",
  },
  disclaimerText: { flex: 1, fontSize: 12, color: "#AA6600", lineHeight: 18, fontStyle: "italic", fontFamily: "Inter_400Regular" },
});
