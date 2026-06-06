import { Platform } from "react-native";

const PRODUCTION_API = "https://law-lexicon--159srijitadeysa.replit.app/api";

export const API_BASE =
  Platform.OS === "web" ? "/api" : PRODUCTION_API;
