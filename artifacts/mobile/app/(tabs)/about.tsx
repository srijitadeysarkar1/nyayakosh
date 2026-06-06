import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FEATURES = [
  { icon: "search" as const, title: "Keyword Search", desc: "Search across all Indian laws by any term — fraud, bail, murder, divorce, rights." },
  { icon: "book-open" as const, title: "Complete Library", desc: "Constitution, BNS, CrPC, Companies Act, Family Law, Labour Law and more." },
  { icon: "users" as const, title: "Plain Language", desc: "Every legal section explained in simple English anyone can understand." },
  { icon: "bell" as const, title: "Live Updates", desc: "New laws, Supreme Court judgments, and amendments — always current." },
  { icon: "globe" as const, title: "Free & Open", desc: "No login required. Your rights should never be behind a paywall." },
];

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 90 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Feather name="shield" size={32} color="#FF9933" />
          </View>
          <Text style={styles.heroTitle}>NyayaKosh</Text>
          <Text style={styles.heroSub}>न्यायकोश — Treasury of Justice</Text>
          <Text style={styles.heroBody}>
            Making Indian law accessible to every citizen. You don't need to be a lawyer to understand your rights.
          </Text>
        </View>

        <Text style={styles.sectionHead}>Features</Text>
        {FEATURES.map((f, i) => (
          <View key={i} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Feather name={f.icon} size={18} color="#FF9933" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}

        <View style={styles.disclaimerCard}>
          <Feather name="alert-triangle" size={14} color="#AA6600" style={{ marginTop: 2 }} />
          <Text style={styles.disclaimerText}>
            This information is for educational purposes only. For legal advice specific to your situation, please consult a qualified advocate.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>NyayaKosh MVP v1.0 · For educational purposes only</Text>
          <Text style={styles.footerAccent}>जानिए अपने अधिकार — Know Your Rights</Text>
        </View>
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
    borderBottomColor: "rgba(255,153,51,0.12)",
    backgroundColor: "rgba(10,15,30,0.97)",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#E8E0D0", fontFamily: "Inter_700Bold" },
  hero: { alignItems: "center", paddingHorizontal: 24, paddingTop: 32, paddingBottom: 24 },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "rgba(255,153,51,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: { fontSize: 28, fontWeight: "700", color: "#FF9933", fontFamily: "Inter_700Bold", marginBottom: 4 },
  heroSub: { fontSize: 13, color: "#555", fontStyle: "italic", fontFamily: "Inter_400Regular", marginBottom: 12 },
  heroBody: {
    fontSize: 14,
    color: "#777",
    lineHeight: 22,
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  sectionHead: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#555",
    fontFamily: "Inter_600SemiBold",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  featureCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },
  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255,153,51,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 15, fontWeight: "600", color: "#E8E0D0", fontFamily: "Inter_600SemiBold", marginBottom: 4 },
  featureDesc: { fontSize: 13, color: "#666", lineHeight: 20, fontFamily: "Inter_400Regular" },
  disclaimerCard: {
    marginHorizontal: 20,
    marginTop: 8,
    backgroundColor: "rgba(255,153,51,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,153,51,0.15)",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  disclaimerText: { flex: 1, fontSize: 12, color: "#AA6600", lineHeight: 18, fontFamily: "Inter_400Regular" },
  footer: { alignItems: "center", padding: 24, gap: 4 },
  footerText: { fontSize: 11, color: "#333", fontFamily: "Inter_400Regular" },
  footerAccent: { fontSize: 12, color: "#FF9933", fontFamily: "Inter_500Medium" },
});
