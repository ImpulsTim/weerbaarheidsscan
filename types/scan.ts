// Centrale typedefinities voor de Energie Weerbaarheidsscan.

import type { LucideIcon } from "lucide-react";

export type Theme =
  | "costResilience"
  | "dependency"
  | "supplySecurity"
  | "flexibility"
  | "futureReadiness";

// Per thema kunnen punten worden toegekend aan een antwoordoptie.
export type ThemeScores = Partial<Record<Theme, number>>;

export interface AnswerOption {
  id: string; // bijv. "A", "B", "C", "D"
  label: string;
  scores: ThemeScores;
}

export interface Question {
  id: number;
  text: string;
  helper?: string; // korte uitleg bij lastige termen
  options: AnswerOption[];
}

// Antwoorden zoals opgeslagen in state: vraag-id -> gekozen optie-id.
export type Answers = Record<number, string>;

export type ThemeStatus =
  | "kwetsbaar"
  | "aandacht nodig"
  | "redelijk weerbaar"
  | "sterk weerbaar";

export interface ThemeScore {
  theme: Theme;
  label: string;
  score: number; // 0 - 100
  status: ThemeStatus;
}

export interface Profile {
  title: string;
  text: string;
}

export interface Recommendation {
  theme: Theme;
  title: string;
  text: string;
}

export interface ScanResult {
  total: number; // 0 - 100
  profile: Profile;
  themeScores: ThemeScore[];
  recommendations: Recommendation[];
}

// --- Scenario-module ---------------------------------------------------------

// Alias voor de bestaande Theme-keys; gebruikt door de scenario-logica.
export type ThemeKey = Theme;

// Indicatief impactniveau van een scenario op het bedrijf.
export type ScenarioImpact = "limited" | "attention" | "elevated" | "high";

export interface Scenario {
  id: string;
  title: string;
  shortDescription: string;
  icon: LucideIcon;
  // Gewichten per thema (sommeren tot 1). Leeg wanneer useTotalScore aanstaat.
  weights: Partial<Record<Theme, number>>;
  vulnerableText: string;
  resilientText: string;
  actionAdvice: string;
  // Bruggetje naar de dienstverlening van Impuls Zeeland voor dit scenario.
  impulsHelp: string;
  // Stress-test: gebruik de totale weerbaarheidsscore i.p.v. gewogen thema's.
  useTotalScore?: boolean;
}

export interface ScenarioResult {
  scenarioId: string;
  score: number; // 0 - 100
  impact: ScenarioImpact;
  impactLabel: string;
}
