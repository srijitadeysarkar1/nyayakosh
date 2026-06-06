export type BailStatus =
  | "bailable"
  | "non-bailable"
  | "compoundable"
  | "not-applicable"
  | "varies";

export interface BailInfo {
  status: BailStatus;
  cognizable: boolean | null;
  conditions: string;
  triedBy?: string;
}

const NA: BailInfo = {
  status: "not-applicable",
  cognizable: null,
  conditions: "This is a civil, procedural or definitional provision. No bail considerations apply.",
};

const CIVIL: BailInfo = {
  status: "not-applicable",
  cognizable: null,
  conditions: "This is a civil remedy. Parties seek orders or compensation through civil courts, not criminal prosecution.",
};

// Key format: `${lawId}|${sectionNo}`
export const BAIL_INFO: Record<string, BailInfo> = {

  // ─── BNS 2023 (lawId 201) ────────────────────────────────────────────────
  "201|Section 3": NA,
  "201|Section 4": NA,
  "201|Section 9": NA,
  "201|Section 13": NA,
  "201|Section 17": NA,
  "201|Section 34": {
    status: "varies",
    cognizable: null,
    conditions: "Bail status mirrors the main offence. If the primary offence is non-bailable, common intention liability is also non-bailable.",
  },
  "201|Section 40": {
    status: "varies",
    cognizable: null,
    conditions: "Abetment carries the same bail status as the offence abetted. Abetment of murder = non-bailable; abetment of a bailable offence = bailable.",
  },
  "201|Section 61": {
    status: "bailable",
    cognizable: false,
    conditions: "Simple criminal conspiracy (up to 6 months) is bailable and non-cognizable. Conspiracy to commit a non-bailable offence takes the same status as that offence.",
    triedBy: "Any Magistrate",
  },
  "201|Section 74": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Bail can only be granted by a Magistrate or Sessions Court. Police can arrest without warrant.",
    triedBy: "Any Magistrate",
  },
  "201|Section 85": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Cruelty by husband or relatives is a serious offence. Complaint can be filed directly at police station.",
    triedBy: "Magistrate of the first class",
  },
  "201|Section 86": NA,
  "201|Section 100": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Triable by High Court only. Police arrest without warrant is permitted.",
    triedBy: "Court of Session",
  },
  "201|Section 101": NA,
  "201|Section 103": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. This is the most serious criminal offence in India, punishable by death or life imprisonment. Bail can only be granted in exceptional circumstances by a Sessions Court or High Court.",
    triedBy: "Court of Session",
  },
  "201|Section 104": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Punishable by life imprisonment or up to 10 years. Bail may be considered by Sessions Court upon merits.",
    triedBy: "Court of Session",
  },
  "201|Section 106": {
    status: "varies",
    cognizable: true,
    conditions: "Simple death by negligence (up to 5 years): Non-bailable, cognizable. Hit-and-run with fleeing (up to 10 years): Non-bailable. Both are cognizable offences — police can arrest without warrant.",
    triedBy: "Magistrate of the first class",
  },
  "201|Section 109": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Attempt to murder carries up to 10 years imprisonment (life imprisonment if hurt caused). Only Sessions Court can grant bail.",
    triedBy: "Court of Session",
  },
  "201|Section 111": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Organised crime is treated as a serious offence — bail is rarely granted. Special courts may be designated.",
    triedBy: "Court of Session",
  },
  "201|Section 113": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Terrorism is the gravest category — bail is almost never granted at lower courts. NIA Act may additionally apply.",
    triedBy: "Special Court / Court of Session",
  },
  "201|Section 115": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Grievous hurt carries up to 7 years. Bail depends on nature of injury; Sessions Court has jurisdiction.",
    triedBy: "Magistrate of the first class",
  },
  "201|Section 118": {
    status: "bailable",
    cognizable: true,
    conditions: "Cognizable but bailable. Simple hurt (up to 1 year) is bailable as of right at the police station. Accused can get bail without going to court.",
    triedBy: "Any Magistrate",
  },
  "201|Section 121": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Using a dangerous weapon or corrosive substance elevates this to a serious offence. Only Sessions Court or High Court can grant bail.",
    triedBy: "Magistrate of the first class",
  },
  "201|Section 124": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Acid attacks are treated with severity — minimum 5 years imprisonment. Bail is strongly opposed by prosecution and rarely granted at initial stages.",
    triedBy: "Court of Session",
  },
  "201|Section 130": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Wrongful restraint (up to 1 month) is a minor offence — bail is available at the police station as a right.",
    triedBy: "Any Magistrate",
  },
  "201|Section 131": {
    status: "varies",
    cognizable: true,
    conditions: "Bailable if confinement is for less than 3 days (up to 1 year). Non-bailable if confinement exceeds 3 days or if the victim is subjected to harm. Cognizable in all forms.",
    triedBy: "Any Magistrate",
  },
  "201|Section 137": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Kidnapping carries 7 years to life imprisonment. Bail is considered only by Sessions Court or High Court after hearing the prosecution.",
    triedBy: "Court of Session",
  },
  "201|Section 140": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Kidnapping with intent to murder carries life imprisonment or 10 years. Courts rarely grant bail in such cases.",
    triedBy: "Court of Session",
  },
  "201|Section 143": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Human trafficking is a serious organised crime — minimum 7 years, up to life imprisonment. Bail is very rarely granted.",
    triedBy: "Court of Session",
  },
  "201|Section 152": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. This section (replacing sedition) carries 7 years to life imprisonment for acts threatening India's sovereignty. Bail is strongly opposed by the State.",
    triedBy: "Court of Session",
  },
  "201|Section 170": {
    status: "bailable",
    cognizable: true,
    conditions: "Cognizable but bailable. Impersonating a public servant (up to 2 years) is bailable — accused can get bail from the Magistrate.",
    triedBy: "Any Magistrate",
  },
  "201|Section 175": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Absconding to avoid summons is a minor offence (up to 1 month imprisonment) — bail is available as of right.",
    triedBy: "Any Magistrate",
  },
  "201|Section 209": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Contempt of a public servant's authority is a minor offence — bail is available as of right at the police station.",
    triedBy: "Any Magistrate",
  },
  "201|Section 215": {
    status: "non-bailable",
    cognizable: false,
    conditions: "Non-cognizable but non-bailable. Perjury (false evidence) is not cognizable — police cannot arrest without warrant. However, it is non-bailable, requiring court approval for bail.",
    triedBy: "Court in which offence was committed",
  },
  "201|Section 224": {
    status: "bailable",
    cognizable: true,
    conditions: "Cognizable but bailable. Destruction of document to prevent evidence (up to 2 years) is bailable — bail is available from the Magistrate.",
    triedBy: "Any Magistrate",
  },
  "201|Section 239": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable under the Prevention of Corruption Act as well. Bribery of a public servant is treated seriously. Bail may be considered by Sessions Court.",
    triedBy: "Special Judge (Prevention of Corruption Act)",
  },
  "201|Section 303": {
    status: "varies",
    cognizable: true,
    conditions: "Cognizable. Bailable if property value is less than ₹5,000 (first offence). Non-bailable for repeat offenders or theft above ₹5,000 (up to 3 years). Police can arrest without warrant.",
    triedBy: "Any Magistrate",
  },
  "201|Section 308": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Extortion causes fear and economic harm — bail is considered on merit by Sessions Court. Accused must show no flight risk.",
    triedBy: "Magistrate of the first class",
  },
  "201|Section 309": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Robbery involves violence alongside theft — bail is rarely granted at initial stages. Sessions Court considers on merits.",
    triedBy: "Court of Session",
  },
  "201|Section 310": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Dacoity (gang robbery with 5+ persons) is a serious organised offence — bail is strongly opposed by prosecution. Only Sessions Court has jurisdiction.",
    triedBy: "Court of Session",
  },
  "201|Section 316": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable (where amount exceeds ₹250). Serious cheating carries 7 years. Bail considered by Sessions Court after hearing the victim.",
    triedBy: "Magistrate of the first class",
  },
  "201|Section 318": {
    status: "bailable",
    cognizable: true,
    conditions: "Cognizable but bailable. Cheating by personation (up to 3 years) is bailable — bail can be obtained from the Magistrate.",
    triedBy: "Any Magistrate",
  },
  "201|Section 319": {
    status: "varies",
    cognizable: true,
    conditions: "Cognizable. Simple mischief (up to 3 months/1 year): Bailable. Mischief causing damage over ₹75 or involving fire/explosion: Non-bailable.",
    triedBy: "Any Magistrate",
  },
  "201|Section 324": {
    status: "bailable",
    cognizable: true,
    conditions: "Cognizable but bailable. Dishonest misappropriation of property (up to 2 years) is bailable — bail available from Magistrate.",
    triedBy: "Any Magistrate",
  },
  "201|Section 327": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Criminal breach of trust (up to 7 years) is a serious offence involving betrayal of trust. Bail considered by Sessions Court.",
    triedBy: "Magistrate of the first class",
  },
  "201|Section 329": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. CBT by a public servant/banker (up to 10 years/life) is treated very seriously. High Court or Sessions Court may grant bail in exceptional circumstances.",
    triedBy: "Court of Session",
  },
  "201|Section 336": {
    status: "non-bailable",
    cognizable: false,
    conditions: "Non-cognizable but non-bailable. Police cannot arrest without a warrant, but bail requires court approval. Forgery carries up to 2 years or fine.",
    triedBy: "Magistrate of the first class",
  },
  "201|Section 351": {
    status: "varies",
    cognizable: false,
    conditions: "Non-cognizable. Simple criminal intimidation (up to 2 years): Bailable. Threat of death or grievous hurt (up to 7 years): Non-bailable. Police cannot arrest without warrant in either case.",
    triedBy: "Any Magistrate",
  },
  "201|Section 356": {
    status: "compoundable",
    cognizable: false,
    conditions: "Non-cognizable, bailable, and compoundable (can be settled between parties). Defamation (up to 2 years) — police cannot arrest without warrant. The parties can compound the offence with court permission.",
    triedBy: "Any Magistrate",
  },

  // ─── BNSS 2023 (lawId 202) ───────────────────────────────────────────────
  "202|Section 2(1)(a)": NA,
  "202|Section 35": NA,
  "202|Section 37": NA,
  "202|Section 43": NA,
  "202|Section 88": NA,
  "202|Section 167": NA,
  "202|Section 173": NA,
  "202|Section 226": NA,
  "202|Section 436": {
    status: "bailable",
    cognizable: null,
    conditions: "This section itself defines and establishes the right to bail for bailable offences. Bail is a matter of right — the police or court must release the accused if they are prepared to give surety.",
  },
  "202|Section 437": {
    status: "non-bailable",
    cognizable: null,
    conditions: "This section governs bail for non-bailable offences. Bail is discretionary. Courts consider: gravity of accusation, nature of evidence, possibility of fleeing, likelihood of repeating the offence, and safety of the community.",
  },
  "202|Section 439": NA,
  "202|Section 482": NA,

  // ─── POCSO (lawId 203) ──────────────────────────────────────────────────
  "203|Section 2(d)": NA,
  "203|Section 3": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. POCSO offences against children are treated with the utmost severity. Bail is strongly opposed. Accused must rebut the presumption of guilt under Section 29.",
    triedBy: "Special Court designated under POCSO",
  },
  "203|Section 4": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Minimum 10 years to life imprisonment. Bail is rarely granted. Special POCSO courts prioritise speedy trial.",
    triedBy: "Special Court designated under POCSO",
  },
  "203|Section 5": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Aggravated penetrative sexual assault (e.g., by police officer, teacher, or against a child below 12) carries minimum 20 years to life. Bail is almost never granted.",
    triedBy: "Special Court designated under POCSO",
  },
  "203|Section 7": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Sexual assault on a child (3–5 years) is treated seriously. Courts apply the presumption of guilt under Section 29 against the accused.",
    triedBy: "Special Court designated under POCSO",
  },
  "203|Section 11": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Sexual harassment of a child carries 3 years imprisonment. The accused must prove innocence given Section 29's reverse burden of proof.",
    triedBy: "Special Court designated under POCSO",
  },
  "203|Section 14": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Using a child for pornography (minimum 5 years) is treated very seriously. Bail is strongly resisted by prosecution.",
    triedBy: "Special Court designated under POCSO",
  },
  "203|Section 19": NA,
  "203|Section 29": NA,
  "203|Section 42A": NA,

  // ─── Prevention of Corruption Act (lawId 204) ────────────────────────────
  "204|Section 7": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Bribery of a public servant is tried by Special Courts under PCA. Prior approval of government (Section 17A) required before investigation. Bail considered by Special Court.",
    triedBy: "Special Judge (PCA)",
  },
  "204|Section 11": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Obtaining valuable things without adequate consideration by a public servant is a serious offence. Special Court jurisdiction applies.",
    triedBy: "Special Judge (PCA)",
  },
  "204|Section 13": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Disproportionate assets and criminal misconduct by a public servant carries 4–10 years. Bail is strongly opposed especially in high-profile cases.",
    triedBy: "Special Judge (PCA)",
  },
  "204|Section 17A": NA,

  // ─── SC/ST Atrocities Act (lawId 205) ────────────────────────────────────
  "205|Section 3": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. The Supreme Court in Dr. Subhash Kashinath Mahajan v. State (2018) initially allowed anticipatory bail, but Parliament reversed this. No anticipatory bail is available as a general rule. Police must arrest on complaint.",
    triedBy: "Special Court for SC/ST Atrocities",
  },
  "205|Section 4": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Wilful neglect by a public servant in implementing the Atrocities Act is punishable with 6 months–1 year imprisonment.",
    triedBy: "Special Court for SC/ST Atrocities",
  },
  "205|Section 14A": NA,

  // ─── NDPS Act (lawId 206) ────────────────────────────────────────────────
  "206|Section 2(vii)": NA,
  "206|Section 8": NA,
  "206|Section 15": {
    status: "varies",
    cognizable: true,
    conditions: "Cognizable. Small quantity (up to 1 year): Bailable. More than small quantity (1–10 years): Non-bailable. Commercial quantity (10–20 years): Non-bailable — bail can only be granted if the court is satisfied that there are reasonable grounds the accused is not guilty (Section 37 NDPS).",
    triedBy: "Special Court / Magistrate of first class",
  },
  "206|Section 20": {
    status: "varies",
    cognizable: true,
    conditions: "Cognizable. Small quantity cannabis: Bailable (up to 1 year). Intermediate quantity: Non-bailable. Commercial quantity (up to 20 years): Strictly non-bailable — the 'twin test' of Section 37 must be satisfied: (1) reasonable grounds that accused is not guilty, AND (2) no likelihood of committing offence while on bail.",
    triedBy: "Special Court / Sessions Court",
  },
  "206|Section 37": NA,

  // ─── CPC (lawId 301) — all civil ─────────────────────────────────────────
  "301|Section 9": CIVIL,
  "301|Section 11": CIVIL,
  "301|Section 12": CIVIL,
  "301|Section 20": CIVIL,
  "301|Section 35": CIVIL,
  "301|Section 60": CIVIL,
  "301|Section 80": CIVIL,
  "301|Section 89": CIVIL,
  "301|Order VII Rule 1": CIVIL,
  "301|Order VIII Rule 1": CIVIL,
  "301|Order XXXIX Rule 1": CIVIL,
  "301|Order XLI Rule 1": CIVIL,

  // ─── Limitation Act (lawId 302) — all civil ──────────────────────────────
  "302|Section 3": CIVIL,
  "302|Section 5": CIVIL,
  "302|Section 10": CIVIL,
  "302|Section 14": CIVIL,
  "302|Section 18": CIVIL,
  "302|Schedule — Article 113": CIVIL,
  "302|Schedule — Article 136": CIVIL,

  // ─── Specific Relief Act (lawId 303) — all civil ─────────────────────────
  "303|Section 10": CIVIL,
  "303|Section 14": CIVIL,
  "303|Section 34": CIVIL,
  "303|Section 38": CIVIL,
  "303|Section 41": CIVIL,

  // ─── Consumer Protection Act (lawId 304) — mostly civil ──────────────────
  "304|Section 2(7)": CIVIL,
  "304|Section 2(9)": CIVIL,
  "304|Section 2(28)": CIVIL,
  "304|Section 17": CIVIL,
  "304|Section 24": CIVIL,
  "304|Section 28": CIVIL,
  "304|Section 35": CIVIL,
  "304|Section 47": CIVIL,

  // ─── Companies Act (lawId 401) ───────────────────────────────────────────
  "401|Section 2(20)": CIVIL,
  "401|Section 2(68)": CIVIL,
  "401|Section 2(71)": CIVIL,
  "401|Section 3A": CIVIL,
  "401|Section 7": CIVIL,
  "401|Section 42": CIVIL,
  "401|Section 53": CIVIL,
  "401|Section 73": CIVIL,
  "401|Section 96": CIVIL,
  "401|Section 100": CIVIL,
  "401|Section 108": CIVIL,
  "401|Section 123": CIVIL,
  "401|Section 135": CIVIL,
  "401|Section 139": CIVIL,
  "401|Section 149": CIVIL,
  "401|Section 152": CIVIL,
  "401|Section 166": CIVIL,
  "401|Section 177": CIVIL,
  "401|Section 180": CIVIL,
  "401|Section 186": CIVIL,
  "401|Section 188": CIVIL,
  "401|Section 197": CIVIL,
  "401|Section 203": CIVIL,
  "401|Section 230": CIVIL,
  "401|Section 247": CIVIL,
  "401|Section 447": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Corporate fraud of ₹10 lakh+ carries 6 months–10 years imprisonment. The Serious Fraud Investigation Office (SFIO) investigates. Bail may be considered by Sessions Court.",
    triedBy: "Special Court (Companies Act)",
  },

  // ─── IBC (lawId 402) — civil/commercial ──────────────────────────────────
  "402|Section 5(7)": CIVIL,
  "402|Section 5(8)": CIVIL,
  "402|Section 5(21)": CIVIL,
  "402|Section 7": CIVIL,
  "402|Section 9": CIVIL,
  "402|Section 14": CIVIL,
  "402|Section 29A": CIVIL,
  "402|Section 53": CIVIL,

  // ─── SEBI Act (lawId 403) ────────────────────────────────────────────────
  "403|Section 11": CIVIL,
  "403|Section 11B": CIVIL,
  "403|Section 12A": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable for insider trading and market manipulation. Criminal prosecution under SEBI Act carries imprisonment up to 10 years. Securities Appellate Tribunal handles civil penalties separately.",
    triedBy: "Court of Sessions (SEBI cases)",
  },
  "403|Section 15G": CIVIL,
  "403|Section 15H": CIVIL,

  // ─── LLP Act (lawId 404) — civil ─────────────────────────────────────────
  "404|Section 2(1)(n)": CIVIL,
  "404|Section 3": CIVIL,
  "404|Section 8": CIVIL,

  // ─── Hindu Marriage Act (lawId 501) — civil ──────────────────────────────
  "501|Section 5": CIVIL,
  "501|Section 7": CIVIL,
  "501|Section 9": CIVIL,
  "501|Section 10": CIVIL,
  "501|Section 11": CIVIL,
  "501|Section 12": CIVIL,
  "501|Section 13": CIVIL,
  "501|Section 13B": CIVIL,
  "501|Section 24": CIVIL,
  "501|Section 25": CIVIL,
  "501|Section 26": CIVIL,

  // ─── Hindu Succession Act (lawId 502) — civil ────────────────────────────
  "502|Section 6": CIVIL,
  "502|Section 8": CIVIL,
  "502|Section 10": CIVIL,
  "502|Section 14": CIVIL,
  "502|Section 15": CIVIL,
  "502|Section 22": CIVIL,
  "502|Section 30": CIVIL,

  // ─── DV Act (lawId 503) ──────────────────────────────────────────────────
  "503|Section 2(a)": NA,
  "503|Section 3": NA,
  "503|Section 12": CIVIL,
  "503|Section 17": CIVIL,
  "503|Section 18": {
    status: "varies",
    cognizable: null,
    conditions: "Protection orders are civil in nature. However, breach of a protection order under Section 31 is a criminal offence punishable with 1 year imprisonment and is non-bailable. Repeat breach is treated more seriously.",
  },
  "503|Section 19": CIVIL,
  "503|Section 20": CIVIL,

  // ─── Special Marriage Act (lawId 504) — civil ────────────────────────────
  "504|Section 4": CIVIL,
  "504|Section 5": CIVIL,
  "504|Section 15": CIVIL,
  "504|Section 27": CIVIL,

  // ─── Muslim Personal Law (lawId 505) — civil ─────────────────────────────
  "505|Section 2": CIVIL,

  // ─── Guardians & Wards (lawId 506) — civil ───────────────────────────────
  "506|Section 7": CIVIL,
  "506|Section 17": CIVIL,

  // ─── Senior Citizens Act (lawId 507) ─────────────────────────────────────
  "507|Section 4": CIVIL,
  "507|Section 9": CIVIL,
  "507|Section 23": CIVIL,

  // ─── Income Tax Act (lawId 601) — mostly civil ───────────────────────────
  "601|Section 2(9)": NA,
  "601|Section 2(24)": NA,
  "601|Section 4": NA,
  "601|Section 10": NA,
  "601|Section 10(14)": NA,
  "601|Section 14A": NA,
  "601|Section 16": NA,
  "601|Section 24": NA,
  "601|Section 32": NA,
  "601|Section 36": NA,
  "601|Section 40A(3)": NA,
  "601|Section 44AB": NA,
  "601|Section 44AD": NA,
  "601|Section 54": NA,
  "601|Section 80C": NA,
  "601|Section 80D": NA,
  "601|Section 80G": NA,
  "601|Section 115BAC": NA,
  "601|Section 131": NA,
  "601|Section 132": {
    status: "not-applicable",
    cognizable: null,
    conditions: "IT raids (search & seizure) are administrative actions. The Income Tax Act empowers IT officers to search — this is not a criminal arrest. Post-raid, criminal prosecution under Chapter XXII of the IT Act may follow (imprisonment up to 7 years for willful tax evasion — non-bailable).",
  },
  "601|Section 139(1)": NA,
  "601|Section 147": NA,
  "601|Section 192": NA,
  "601|Section 194A": NA,

  // ─── GST Acts (lawId 602) ────────────────────────────────────────────────
  "602|Section 2(44)": NA,
  "602|Section 7": NA,
  "602|Section 9": NA,
  "602|Section 16": NA,
  "602|Section 22": NA,
  "602|Section 73": {
    status: "not-applicable",
    cognizable: null,
    conditions: "Section 73 deals with civil/administrative tax demand. No criminal liability arises under Section 73. Penalty is up to 10% of tax.",
  },
  "602|Section 74": {
    status: "not-applicable",
    cognizable: null,
    conditions: "Section 74 deals with civil/administrative tax demand due to fraud. Penalty is 100% of tax. Criminal prosecution under Section 132 is separate and may be initiated for wilful evasion.",
  },
  "602|Section 132": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable where tax evaded exceeds ₹5 crore. For ₹2–5 crore evasion (non-bailable, up to 3 years). Below ₹2 crore: bailable. Police can arrest for amounts above threshold.",
    triedBy: "Magistrate of the first class / Court of Session",
  },

  // ─── Customs Act (lawId 603) ─────────────────────────────────────────────
  "603|Section 12": NA,
  "603|Section 46": NA,
  "603|Section 111": {
    status: "not-applicable",
    cognizable: null,
    conditions: "Confiscation is an administrative/civil remedy. No criminal arrest under this section alone. Criminal prosecution under Section 135 for evasion may additionally apply.",
  },
  "603|Section 135": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable for smuggling and serious Customs evasion (up to 7 years). Customs officers have powers of arrest. Bail may be considered by Magistrate or Sessions Court.",
    triedBy: "Court of Session / Magistrate of first class",
  },

  // ─── Industrial Disputes Act (lawId 701) — mostly civil ──────────────────
  "701|Section 2(k)": NA,
  "701|Section 2(s)": NA,
  "701|Section 22": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Illegal strikes and lockouts are punishable with up to 1 month imprisonment and/or fine. Police cannot arrest without warrant.",
    triedBy: "Magistrate of the first class",
  },
  "701|Section 25B": NA,
  "701|Section 25C": CIVIL,
  "701|Section 25F": CIVIL,
  "701|Section 25G": CIVIL,
  "701|Section 25H": CIVIL,
  "701|Section 25N": CIVIL,
  "701|Section 33": CIVIL,

  // ─── Minimum Wages Act (lawId 702) ───────────────────────────────────────
  "702|Section 3": NA,
  "702|Section 12": CIVIL,
  "702|Section 22": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Non-payment of minimum wages (up to 6 months imprisonment) is bailable — bail is available as of right. Inspectors file complaints; police not directly involved.",
    triedBy: "Any Magistrate",
  },

  // ─── EPF Act (lawId 703) ─────────────────────────────────────────────────
  "703|Section 6": NA,
  "703|Section 7A": CIVIL,
  "703|Section 14": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Default in EPF contribution (up to 1 year imprisonment) is bailable. EPFO Enforcement Officers file complaints before Magistrates.",
    triedBy: "Any Magistrate",
  },

  // ─── Maternity Benefit Act (lawId 704) ───────────────────────────────────
  "704|Section 5": CIVIL,
  "704|Section 5A": CIVIL,
  "704|Section 11": CIVIL,
  "704|Section 12": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Dismissing a woman during maternity absence (up to 1 year imprisonment) is bailable. Inspector files complaint; police not directly involved.",
    triedBy: "Any Magistrate",
  },

  // ─── Factories Act (lawId 705) ───────────────────────────────────────────
  "705|Section 11": CIVIL,
  "705|Section 22": CIVIL,
  "705|Section 51": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Violation of working hours (up to 2 years/3 years for repeat) is bailable. Factory Inspector files complaint; police not directly involved.",
    triedBy: "Any Magistrate",
  },
  "705|Section 54": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Violation of daily hours (up to 2 years imprisonment) is bailable — bail is available as of right.",
    triedBy: "Any Magistrate",
  },
  "705|Section 59": CIVIL,
  "705|Section 79": CIVIL,

  // ─── Code on Wages (lawId 706) ───────────────────────────────────────────
  "706|Section 2(y)": NA,
  "706|Section 43": NA,
  "706|Section 56": CIVIL,

  // ─── POSH Act (lawId 707) ────────────────────────────────────────────────
  "707|Section 2(n)": NA,
  "707|Section 4": NA,
  "707|Section 11": CIVIL,
  "707|Section 13": {
    status: "not-applicable",
    cognizable: null,
    conditions: "POSH Act proceedings are internal service/disciplinary matters. The penalty is service-related (warning, demotion, termination, fine). Separate criminal action under BNS Section 74 (outraging modesty) or other IPC/BNS sections may additionally be filed.",
  },

  // ─── Transfer of Property Act (lawId 801) — civil ────────────────────────
  "801|Section 5": CIVIL,
  "801|Section 6": CIVIL,
  "801|Section 17": CIVIL,
  "801|Section 54": CIVIL,
  "801|Section 58": CIVIL,
  "801|Section 105": CIVIL,
  "801|Section 108": CIVIL,
  "801|Section 118": CIVIL,
  "801|Section 122": CIVIL,
  "801|Section 123": CIVIL,
  "801|Section 130": CIVIL,

  // ─── Registration Act (lawId 802) — civil ────────────────────────────────
  "802|Section 17": CIVIL,
  "802|Section 18": CIVIL,
  "802|Section 49": CIVIL,

  // ─── RERA (lawId 803) ────────────────────────────────────────────────────
  "803|Section 3": CIVIL,
  "803|Section 4": CIVIL,
  "803|Section 11": CIVIL,
  "803|Section 13": CIVIL,
  "803|Section 18": CIVIL,
  "803|Section 19": CIVIL,
  "803|Section 31": CIVIL,
  "803|Section 35": CIVIL,
  "803|Section 61": {
    status: "non-bailable",
    cognizable: null,
    conditions: "Non-registration of a real estate project carries imprisonment up to 3 years (non-bailable if imprisonment is imposed). In practice, most builders face civil penalties (10% of project cost) first before criminal prosecution.",
    triedBy: "Magistrate of the first class",
  },

  // ─── Easements Act (lawId 804) — civil ───────────────────────────────────
  "804|Section 4": CIVIL,
  "804|Section 15": CIVIL,

  // ─── Contract Act (lawId 901) — civil ────────────────────────────────────
  "901|Section 2(a)": CIVIL,
  "901|Section 2(b)": CIVIL,
  "901|Section 2(d)": CIVIL,
  "901|Section 2(h)": CIVIL,
  "901|Section 10": CIVIL,
  "901|Section 11": CIVIL,
  "901|Section 13": CIVIL,
  "901|Section 14": CIVIL,
  "901|Section 15": CIVIL,
  "901|Section 16": CIVIL,
  "901|Section 17": CIVIL,
  "901|Section 23": CIVIL,
  "901|Section 25": CIVIL,
  "901|Section 27": CIVIL,
  "901|Section 37": CIVIL,
  "901|Section 51": CIVIL,
  "901|Section 56": CIVIL,
  "901|Section 62": CIVIL,
  "901|Section 73": CIVIL,
  "901|Section 74": CIVIL,
  "901|Section 124": CIVIL,
  "901|Section 126": CIVIL,
  "901|Section 148": CIVIL,
  "901|Section 182": CIVIL,

  // ─── Negotiable Instruments Act (lawId 902) ───────────────────────────────
  "902|Section 6": NA,
  "902|Section 13": NA,
  "902|Section 25": NA,
  "902|Section 31": CIVIL,
  "902|Section 118": NA,
  "902|Section 138": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Cheque bounce under Section 138 is a summons case — police cannot arrest without warrant. Bail is available as of right before the Magistrate. The accused must appear and may be tried summarily. Imprisonment up to 2 years and/or fine up to twice the cheque amount.",
    triedBy: "Judicial Magistrate of the first class",
  },
  "902|Section 141": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Company directors' liability for cheque bounce follows Section 138 — same bail rules apply. Directors must show they were not in-charge of the company at the relevant time to escape liability.",
    triedBy: "Judicial Magistrate of the first class",
  },
  "902|Section 142": NA,

  // ─── Arbitration Act (lawId 903) — civil ─────────────────────────────────
  "903|Section 7": CIVIL,
  "903|Section 8": CIVIL,
  "903|Section 11": CIVIL,
  "903|Section 16": CIVIL,
  "903|Section 34": CIVIL,
  "903|Section 36": CIVIL,

  // ─── IT Act 2000 (lawId 1001) ─────────────────────────────────────────────
  "1001|Section 2(1)(r)": NA,
  "1001|Section 4": NA,
  "1001|Section 5": NA,
  "1001|Section 43": CIVIL,
  "1001|Section 43A": CIVIL,
  "1001|Section 65": {
    status: "bailable",
    cognizable: true,
    conditions: "Cognizable but bailable. Tampering with computer source code (up to 3 years imprisonment) is bailable — bail is available from the Magistrate. Police can arrest without warrant.",
    triedBy: "Any Magistrate",
  },
  "1001|Section 66": {
    status: "bailable",
    cognizable: true,
    conditions: "Cognizable and bailable. Computer hacking under Section 66 (up to 3 years) is bailable — bail is available from the Magistrate. However, bail may be contested if the offence involved large-scale financial fraud.",
    triedBy: "Any Magistrate",
  },
  "1001|Section 66A": NA,
  "1001|Section 66C": {
    status: "bailable",
    cognizable: true,
    conditions: "Cognizable and bailable. Identity theft (up to 3 years) is bailable — bail is available from the Magistrate.",
    triedBy: "Any Magistrate",
  },
  "1001|Section 66D": {
    status: "bailable",
    cognizable: true,
    conditions: "Cognizable and bailable. Cheating by personation using computer (up to 3 years) is bailable — bail available from Magistrate.",
    triedBy: "Any Magistrate",
  },
  "1001|Section 66E": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Violation of privacy (up to 3 years) — police cannot arrest without warrant. Bail is available from the Magistrate.",
    triedBy: "Any Magistrate",
  },
  "1001|Section 66F": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Cyber terrorism (up to life imprisonment) is the most serious cyber offence. Only a Sessions Court or High Court can grant bail. Extremely rare in practice.",
    triedBy: "Court of Session",
  },
  "1001|Section 67": {
    status: "varies",
    cognizable: true,
    conditions: "Cognizable. First conviction (up to 3 years): Bailable. Second and subsequent conviction (up to 5 years): Non-bailable. Bail for repeat offence requires Sessions Court approval.",
    triedBy: "Any Magistrate (first offence) / Court of Session (repeat)",
  },
  "1001|Section 67A": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Publishing sexually explicit material online (up to 5 years first conviction, 7 years on repeat) is non-bailable. Bail may be considered by Sessions Court.",
    triedBy: "Court of Session",
  },
  "1001|Section 67B": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Publishing child pornography (up to 5 years, 7 years on repeat) is treated very seriously — bail is strongly resisted. Only Sessions Court or High Court can grant bail.",
    triedBy: "Court of Session",
  },
  "1001|Section 69": NA,
  "1001|Section 69A": NA,
  "1001|Section 72": {
    status: "bailable",
    cognizable: false,
    conditions: "Non-cognizable and bailable. Breach of confidentiality (up to 2 years) — police cannot arrest without warrant. Bail is available as of right from the Magistrate.",
    triedBy: "Any Magistrate",
  },
  "1001|Section 75": NA,

  // ─── DPDP Act 2023 (lawId 1002) — civil/administrative ───────────────────
  "1002|Section 2(t)": NA,
  "1002|Section 4": NA,
  "1002|Section 6": NA,
  "1002|Section 8": NA,
  "1002|Section 9": NA,
  "1002|Section 17": NA,
  "1002|Section 26": {
    status: "not-applicable",
    cognizable: null,
    conditions: "Penalties under DPDP Act are civil/administrative monetary fines (up to ₹250 crore) imposed by the Data Protection Board. No criminal imprisonment is prescribed under this Act.",
  },

  // ─── Patents Act (lawId 1101) ─────────────────────────────────────────────
  "1101|Section 2(1)(j)": NA,
  "1101|Section 2(1)(l)": NA,
  "1101|Section 3": NA,
  "1101|Section 3(d)": NA,
  "1101|Section 5": NA,
  "1101|Section 25": CIVIL,
  "1101|Section 47": CIVIL,
  "1101|Section 84": CIVIL,
  "1101|Section 104": CIVIL,

  // ─── Copyright Act (lawId 1102) ───────────────────────────────────────────
  "1102|Section 13": NA,
  "1102|Section 14": NA,
  "1102|Section 17": NA,
  "1102|Section 22": NA,
  "1102|Section 51": CIVIL,
  "1102|Section 52": NA,
  "1102|Section 63": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Copyright infringement (6 months to 3 years imprisonment) is non-bailable. Police can arrest without warrant. Bail may be considered by Magistrate. Repeat offence carries 1–3 years mandatory.",
    triedBy: "Any Magistrate",
  },

  // ─── Trademarks Act (lawId 1103) ─────────────────────────────────────────
  "1103|Section 2(1)(zb)": NA,
  "1103|Section 9": NA,
  "1103|Section 11": NA,
  "1103|Section 29": CIVIL,
  "1103|Section 103": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable. Applying false trade marks or selling counterfeit goods (6 months to 3 years imprisonment) is non-bailable. Police can arrest without warrant. Bail may be considered by Magistrate.",
    triedBy: "Any Magistrate",
  },

  // ─── Environment Protection Act (lawId 1201) ─────────────────────────────
  "1201|Section 2(a)": NA,
  "1201|Section 3": NA,
  "1201|Section 7": NA,
  "1201|Section 15": {
    status: "non-bailable",
    cognizable: false,
    conditions: "Non-cognizable but non-bailable. Environmental offences (up to 5 years imprisonment) require a court complaint — police cannot arrest without warrant. Bail requires Magistrate/Sessions Court approval.",
    triedBy: "Court of Session / Magistrate of first class",
  },

  // ─── Water Act (lawId 1202) ───────────────────────────────────────────────
  "1202|Section 25": CIVIL,
  "1202|Section 33A": CIVIL,
  "1202|Section 43": {
    status: "non-bailable",
    cognizable: false,
    conditions: "Non-cognizable but non-bailable. Water pollution offences (1.5–6 years) require court complaint — police cannot arrest. Bail requires Sessions Court approval.",
    triedBy: "Court of Session / Magistrate of first class",
  },

  // ─── Air Act (lawId 1203) ─────────────────────────────────────────────────
  "1203|Section 21": {
    status: "non-bailable",
    cognizable: false,
    conditions: "Non-cognizable but non-bailable. Operating industrial plant without air pollution consent (up to 6 years) requires court complaint — police cannot arrest. Bail requires Sessions Court.",
    triedBy: "Court of Session",
  },
  "1203|Section 37": {
    status: "non-bailable",
    cognizable: false,
    conditions: "Non-cognizable but non-bailable. Air pollution offences (1.5–6 years) are serious environmental violations. Court complaint required; no direct police arrest. Sessions Court may grant bail.",
    triedBy: "Court of Session",
  },

  // ─── Wildlife Protection Act (lawId 1204) ────────────────────────────────
  "1204|Section 2(16)": NA,
  "1204|Section 9": {
    status: "non-bailable",
    cognizable: true,
    conditions: "Cognizable and non-bailable for Schedule I species (tigers, leopards, elephants, etc.). Minimum 3 years imprisonment. Police can arrest without warrant. Bail strongly opposed in Schedule I cases.",
    triedBy: "Magistrate of the first class (Schedule II–IV) / Court of Session (Schedule I)",
  },
  "1204|Section 51": {
    status: "varies",
    cognizable: true,
    conditions: "Cognizable. Schedule I/Part II of Schedule II species: Non-bailable (minimum 3 years). Other schedules: Bailable (up to 3 years). Police can arrest without warrant for Schedule I offences.",
    triedBy: "Magistrate of the first class / Court of Session (Schedule I)",
  },

  // ─── NGT Act (lawId 1205) — tribunal ─────────────────────────────────────
  "1205|Section 14": CIVIL,
  "1205|Section 15": CIVIL,
  "1205|Section 20": CIVIL,

  // ─── BSA/Evidence Act (lawId 1301) — mostly procedural ───────────────────
  "1301|Section 2(1)(c)": NA,
  "1301|Section 2(1)(e)": NA,
  "1301|Section 3": NA,
  "1301|Section 9": NA,
  "1301|Section 16": NA,
  "1301|Section 22": NA,
  "1301|Section 25": NA,
  "1301|Section 26": NA,
  "1301|Section 30": NA,
  "1301|Section 57": NA,
  "1301|Section 63": NA,
  "1301|Section 65A": NA,
  "1301|Section 74": NA,
  "1301|Section 75": NA,
  "1301|Section 111": NA,
  "1301|Section 119": NA,
};

export function getBailInfo(lawId: number, sectionNo: string): BailInfo {
  const key = `${lawId}|${sectionNo}`;
  return BAIL_INFO[key] ?? NA;
}
