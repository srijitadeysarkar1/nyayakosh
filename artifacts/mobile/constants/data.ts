export type { Section, Law, NewsItem, Category } from "./types";

import { constitutionLaws } from "./laws/constitution";
import { criminalLaws } from "./laws/criminal";
import { civilLaws } from "./laws/civil";
import { corporateLaws } from "./laws/corporate";
import { familyLaws } from "./laws/family";
import { taxLaws } from "./laws/tax";
import { laborLaws } from "./laws/labor";
import { propertyLaws } from "./laws/property";
import { contractLaws } from "./laws/contract";
import { itLaws } from "./laws/it";
import { ipLaws } from "./laws/ip";
import { environmentLaws } from "./laws/environment";
import { evidenceLaws } from "./laws/evidence";
import type { Law, NewsItem } from "./types";

export const CATEGORIES = [
  { id: "constitution", label: "Constitution", icon: "book", color: "#FF9933" },
  { id: "criminal", label: "Criminal Law", icon: "shield", color: "#DC2626" },
  { id: "civil", label: "Civil Law", icon: "file-text", color: "#2563EB" },
  { id: "corporate", label: "Corporate Law", icon: "briefcase", color: "#7C3AED" },
  { id: "family", label: "Family Law", icon: "heart", color: "#059669" },
  { id: "tax", label: "Tax Law", icon: "dollar-sign", color: "#D97706" },
  { id: "labor", label: "Labour Law", icon: "tool", color: "#0891B2" },
  { id: "property", label: "Property Law", icon: "home", color: "#BE185D" },
  { id: "contract", label: "Contract Law", icon: "edit-3", color: "#16A34A" },
  { id: "it", label: "IT & Cyber Law", icon: "monitor", color: "#6366F1" },
  { id: "ip", label: "Intellectual Property", icon: "award", color: "#EA580C" },
  { id: "environment", label: "Environment Law", icon: "wind", color: "#10B981" },
  { id: "evidence", label: "Evidence Law", icon: "eye", color: "#8B5CF6" },
];

export const LAWS_DB: Law[] = [
  ...constitutionLaws,
  ...criminalLaws,
  ...civilLaws,
  ...corporateLaws,
  ...familyLaws,
  ...taxLaws,
  ...laborLaws,
  ...propertyLaws,
  ...contractLaws,
  ...itLaws,
  ...ipLaws,
  ...environmentLaws,
  ...evidenceLaws,
];

export const NEWS_FEED: NewsItem[] = [
  {
    id: 1,
    date: "May 24, 2026",
    category: "Supreme Court",
    title: "SC Upholds Right to Privacy in Digital Data Case",
    summary: "The Supreme Court ruled that citizens have a fundamental right to privacy over their digital footprints, setting landmark precedent for data protection.",
    tag: "Landmark Judgment",
    tagColor: "#DC2626",
  },
  {
    id: 2,
    date: "May 22, 2026",
    category: "Parliament",
    title: "Digital Personal Data Protection Rules 2026 Notified",
    summary: "The Ministry of Electronics notified the final rules under the DPDP Act, requiring companies to appoint Data Protection Officers by August 2026.",
    tag: "New Law",
    tagColor: "#059669",
  },
  {
    id: 3,
    date: "May 20, 2026",
    category: "High Court",
    title: "Delhi HC: WhatsApp Messages Admissible as Evidence",
    summary: "Delhi High Court held that WhatsApp screenshots, if properly certified, are admissible under the Indian Evidence Act in civil proceedings.",
    tag: "Court Ruling",
    tagColor: "#2563EB",
  },
  {
    id: 4,
    date: "May 18, 2026",
    category: "Parliament",
    title: "Amendment to Companies Act Increases Penalty for Fraud",
    summary: "Parliament passed an amendment increasing the minimum imprisonment for corporate fraud under Section 447 from 6 months to 2 years.",
    tag: "Amendment",
    tagColor: "#D97706",
  },
  {
    id: 5,
    date: "May 15, 2026",
    category: "Supreme Court",
    title: "SC: Bail Cannot Be Denied Solely on Gravity of Offence",
    summary: "A Constitution Bench ruled that bail applications must be assessed on individual merits and personal liberty cannot be curtailed indefinitely.",
    tag: "Landmark Judgment",
    tagColor: "#DC2626",
  },
  {
    id: 6,
    date: "May 10, 2026",
    category: "Parliament",
    title: "Bharatiya Nyaya Sanhita Amendments — New Cyber Provisions Added",
    summary: "Parliament passed amendments to BNS 2023 adding new sections on deepfake fraud, AI-assisted crime, and cryptocurrency offences.",
    tag: "Amendment",
    tagColor: "#D97706",
  },
  {
    id: 7,
    date: "May 5, 2026",
    category: "SEBI",
    title: "SEBI Issues New Framework for AI-Based Trading Algorithms",
    summary: "SEBI released a consultation paper on regulating artificial intelligence in algorithmic trading, seeking public comments before formal rules.",
    tag: "Regulatory Update",
    tagColor: "#7C3AED",
  },
];

export const PLAIN_LANGUAGE: Record<string, string> = {
  fraud:
    "Fraud means tricking someone to gain money or property unfairly. In India, it can lead to 7–10 years in prison depending on the amount involved.",
  bail: "Bail means being temporarily released from custody while your case is being heard. Courts consider factors like flight risk, evidence tampering, and crime severity.",
  divorce:
    "Divorce legally ends a marriage. In India, you can file for divorce on grounds like cruelty, adultery, or desertion. It typically takes 6 months to several years.",
  cheating:
    "Legal cheating means deceiving someone to make them give you money or property. This is different from relationship cheating. It's a criminal offence.",
  murder:
    "Murder is the intentional killing of a person. It carries the maximum punishment — death or life imprisonment — under Indian law.",
  contract:
    "A contract is a legally binding agreement between two or more parties. It must have offer, acceptance, consideration and free consent to be valid.",
  copyright:
    "Copyright protects original creative works like books, music, films and art automatically from the moment of creation. It lasts for the author's lifetime plus 60 years.",
  trademark:
    "A trademark is a sign, logo or word that distinguishes your goods/services from others. Registration gives you exclusive rights and legal protection for 10 years (renewable).",
  patent:
    "A patent gives you exclusive rights over your invention for 20 years. You must apply to the Patent Office and the invention must be new, non-obvious and capable of industrial use.",
  arbitration:
    "Arbitration is a private way to resolve disputes without going to court. Both parties agree to let a neutral arbitrator decide the case. The award is legally binding.",
  retrenchment:
    "Retrenchment is when an employer terminates workers due to business reasons (not misconduct). Workers with 1+ year service are entitled to 1 month notice and 15 days pay per year of service.",
  maintenance:
    "Maintenance is the financial support one spouse must pay the other. Courts consider both parties' income, expenses and standard of living. It can be interim (during proceedings) or permanent.",
  injunction:
    "An injunction is a court order telling someone to stop doing something (or start doing something). It can be temporary or permanent depending on the case.",
  eviction:
    "Eviction is the legal process of removing a tenant from a property. Landlords must follow due process — a tenant cannot be forcibly removed without a court order.",
  insider:
    "Insider trading is buying or selling stocks using price-sensitive information that is not publicly available. It is illegal and can result in imprisonment and fines.",
  gst:
    "GST (Goods and Services Tax) is a single tax on the supply of goods and services. It replaced multiple taxes like VAT and Service Tax. Most businesses above ₹20 lakh turnover must register.",
  tds:
    "TDS (Tax Deducted at Source) is tax deducted by the payer before making payment. For example, your employer deducts TDS from your salary every month on behalf of the Income Tax Department.",
  rera:
    "RERA (Real Estate Regulation Act) protects homebuyers from builder delays and fraud. Builders must register projects, keep 70% funds in escrow, and complete on time or pay interest.",
  pocso:
    "POCSO (Protection of Children from Sexual Offences) is a strict law protecting children under 18. It has a presumption of guilt against the accused and mandatory reporting requirements.",
};

export function getCatColor(catId: string): string {
  return CATEGORIES.find((c) => c.id === catId)?.color ?? "#FF9933";
}

export function getCatLabel(catId: string): string {
  return CATEGORIES.find((c) => c.id === catId)?.label ?? catId;
}

export function getCatIcon(catId: string): string {
  return CATEGORIES.find((c) => c.id === catId)?.icon ?? "file-text";
}

export function searchLaws(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: Array<import("./types").Section & {
    lawTitle: string;
    lawSubtitle: string;
    category: string;
    lawId: number;
  }> = [];
  LAWS_DB.forEach((law) => {
    law.sections.forEach((sec) => {
      if (
        sec.keywords.some((k) => k.includes(q) || q.includes(k)) ||
        sec.title.toLowerCase().includes(q) ||
        sec.summary.toLowerCase().includes(q) ||
        law.title.toLowerCase().includes(q)
      ) {
        results.push({
          ...sec,
          lawTitle: law.title,
          lawSubtitle: law.subtitle,
          category: law.category,
          lawId: law.id,
        });
      }
    });
  });
  return results;
}

export function getPlainTip(query: string): { word: string; text: string } | null {
  const q = query.toLowerCase();
  const key = Object.keys(PLAIN_LANGUAGE).find((k) => q.includes(k));
  return key ? { word: key, text: PLAIN_LANGUAGE[key] } : null;
}
