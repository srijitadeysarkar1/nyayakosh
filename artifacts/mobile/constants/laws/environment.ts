import { Law } from "../types";

export const environmentLaws: Law[] = [
  {
    id: 1201,
    category: "environment",
    title: "Environment (Protection) Act 1986",
    subtitle: "Framework legislation for environmental protection",
    sections: [
      { no: "Section 2(a)", title: "Definition of Environment", keywords: ["environment", "water", "air", "land", "living organisms", "property"], summary: "'Environment' includes water, air and land and the inter-relationship which exists among and between water, air and land, and human beings, other living creatures, plants, micro-organism and property." },
      { no: "Section 3", title: "Power of Central Government to Take Measures to Protect and Improve Environment", keywords: ["central government", "power", "environment", "protect", "improve", "pollution"], summary: "The Central Government shall have the power to take all such measures as it deems necessary or expedient for the purpose of protecting and improving the quality of the environment and preventing, controlling and abating environmental pollution. This includes laying down standards for water quality, air quality and noise; restricting areas in which industries shall not carry on operations; carrying out and sponsoring investigations and research relating to problems of environmental pollution." },
      { no: "Section 7", title: "Persons Carrying on Industry Not to Allow Discharge in Excess of Standards", keywords: ["discharge", "standard", "effluent", "emission", "pollution", "industry"], summary: "No person carrying on any industry, operation or process shall discharge or emit or permit to be discharged or emitted any environmental pollutant in excess of such standards as may be prescribed." },
      { no: "Section 15", title: "Penalty for Contravention of Provisions of the Act", keywords: ["penalty", "pollution", "imprisonment", "five years", "fine", "environmental"], summary: "Whoever fails to comply with or contravenes any of the provisions of this Act, or the rules made or orders or directions issued thereunder shall, in respect of each such failure or contravention, be punishable with imprisonment for a term which may extend to five years with fine which may extend to one lakh rupees, or with both, and in case the failure or contravention continues, with an additional fine which may extend to five thousand rupees for every day during which such failure or contravention continues after the conviction for the first such failure or contravention." },
    ],
  },
  {
    id: 1202,
    category: "environment",
    title: "Water (Prevention and Control of Pollution) Act 1974",
    subtitle: "Prevents and controls water pollution in India",
    sections: [
      { no: "Section 25", title: "Restrictions on New Outlets and New Discharges — Consent Required", keywords: ["consent", "pollution control board", "outlet", "discharge", "water pollution", "NOC"], summary: "Subject to the provisions of this section, no person shall, without the previous consent of the State Board: establish or take any steps to establish any industry, operation or process, or any treatment and disposal system or an extension or addition thereto, which is likely to discharge sewage or trade effluent into a stream or well or sewer or on land; or bring into use any new or altered outlet for the discharge of sewage." },
      { no: "Section 33A", title: "Power to Give Directions to Industries — Closure", keywords: ["closure", "direction", "state board", "pollution", "industry", "stop"], summary: "Notwithstanding anything contained in any other law, but subject to the provisions of this Act and to any directions that the Central Government may give in this behalf, the State Board may issue directions to persons concerned, including directions for the closure of any industry, operation or process." },
      { no: "Section 43", title: "Penalty for Contravention of Section 25 or 26 — Consent Requirements", keywords: ["penalty", "imprisonment", "consent", "water pollution", "effluent", "criminal"], summary: "Whoever contravenes the provisions of section 25 or section 26 shall be punishable with imprisonment for a term which shall not be less than one year and six months but which may extend to six years and with fine, and in case the failure or contravention continues, with an additional fine which may extend to five thousand rupees for every day during which such failure or contravention continues after the conviction for the first such failure or contravention." },
    ],
  },
  {
    id: 1203,
    category: "environment",
    title: "Air (Prevention and Control of Pollution) Act 1981",
    subtitle: "Controls and prevents air pollution in India",
    sections: [
      { no: "Section 21", title: "Restrictions on Use of Certain Industrial Plant — Consent to Operate", keywords: ["consent", "air pollution", "industrial plant", "emission", "state board", "NOC"], summary: "Subject to the provisions of this section, no person shall, without the previous consent of the State Board, establish or operate any industrial plant in an air pollution control area. Any person who establishes or operates any industrial plant without the consent of the State Board shall be punishable with imprisonment for a term which may extend to six years and with fine." },
      { no: "Section 37", title: "Penalties for Contravention of Section 21 or 22", keywords: ["penalty", "air pollution", "imprisonment", "consent", "emission", "six years"], summary: "Whoever fails to comply with or contravenes any of the provisions of section 21 or section 22, or any direction issued under sub-section (2) of section 31A shall, in respect of each such failure or contravention, be punishable with imprisonment for a term which shall not be less than one year and six months but which may extend to six years and with fine." },
    ],
  },
  {
    id: 1204,
    category: "environment",
    title: "Wildlife Protection Act 1972",
    subtitle: "Protects wildlife and national parks in India",
    sections: [
      { no: "Section 2(16)", title: "Definition of Wild Animal", keywords: ["wild animal", "definition", "schedule", "protected species", "wildlife"], summary: "'Wild animal' means any animal specified in Schedules I to IV and found wild in nature. Schedule I provides the highest level of protection and includes species like tigers, lions, elephants, rhinoceroses, crocodiles, and other endangered species." },
      { no: "Section 9", title: "Prohibition of Hunting", keywords: ["hunting", "prohibition", "wild animal", "schedule I", "protected", "penalty"], summary: "No person shall hunt any wild animal specified in Schedule I or Part II of Schedule II except as provided under section 11 and section 12." },
      { no: "Section 51", title: "Penalties for Wildlife Offences — Hunting Schedule I Species", keywords: ["penalty", "hunting", "Schedule I", "wildlife", "imprisonment", "three years", "tiger", "elephant"], summary: "Any person who contravenes any provision of this Act or any rule or order made thereunder shall, if no penalty is elsewhere provided for such contravention, be guilty of an offence against this Act, and shall on conviction, be punishable with imprisonment for a term which may extend to three years or with fine which may extend to twenty-five thousand rupees or with both. For Schedule I species (like tigers), the minimum punishment is 3 years." },
    ],
  },
  {
    id: 1205,
    category: "environment",
    title: "National Green Tribunal Act 2010",
    subtitle: "Establishes the National Green Tribunal for environmental disputes",
    sections: [
      { no: "Section 14", title: "Tribunal to Settle Disputes — Jurisdiction", keywords: ["NGT", "National Green Tribunal", "jurisdiction", "environmental dispute", "substantial question"], summary: "The Tribunal shall have the jurisdiction over all civil cases where a substantial question relating to environment (including enforcement of any legal right relating to environment), is involved and such question arises out of the implementation of the enactments specified in Schedule I. Schedule I includes Environment Protection Act, Forest Conservation Act, Water Act, Air Act, Wildlife Protection Act, Biological Diversity Act." },
      { no: "Section 15", title: "Relief, Compensation and Restitution — Polluter Pays", keywords: ["compensation", "relief", "restitution", "polluter pays", "environment", "damage"], summary: "The Tribunal may by an order provide for the relief and compensation to the victims of pollution and other environmental damage including accident occurring while handling any hazardous substance; for the restitution of the environment; and for the restitution of property damaged." },
      { no: "Section 20", title: "Application of Precautionary Principle and Sustainable Development", keywords: ["precautionary principle", "sustainable development", "polluter pays", "environment", "NGT"], summary: "The Tribunal shall, while passing any order or decision or award, apply the principles of sustainable development, the precautionary principle and the polluter pays principle. These are fundamental principles of international environmental law adopted by India." },
    ],
  },
];
