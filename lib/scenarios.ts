import { SCENARIOS } from "@/data/scenarios";
import {
  Scenario,
  ScenarioImpact,
  ScenarioResult,
  Theme,
} from "@/types/scan";

// Impactlabels en -omschrijvingen. Bewust indicatief en activerend van toon.
const IMPACT_LABELS: Record<ScenarioImpact, string> = {
  limited: "Beperkte impact",
  attention: "Aandacht nodig",
  elevated: "Verhoogd risico",
  high: "Hoog risico",
};

const IMPACT_DESCRIPTIONS: Record<ScenarioImpact, string> = {
  limited: "Je bedrijf lijkt dit scenario relatief goed te kunnen opvangen.",
  attention:
    "Je bedrijf heeft een basis, maar verdere versterking is verstandig.",
  elevated:
    "Dit scenario kan merkbare invloed hebben op je kosten, continuïteit of positie.",
  high: "Dit scenario kan je bedrijf stevig raken. Gericht actie ondernemen is verstandig.",
};

// Gewogen gemiddelde van de relevante themascores, afgerond op een heel getal.
export function calculateScenarioScore(
  themeScores: Record<Theme, number>,
  weights: Partial<Record<Theme, number>>,
): number {
  let weightedSum = 0;
  let totalWeight = 0;
  for (const [theme, weight] of Object.entries(weights) as [
    Theme,
    number,
  ][]) {
    weightedSum += (themeScores[theme] ?? 0) * weight;
    totalWeight += weight;
  }
  if (totalWeight === 0) return 0;
  return Math.round(weightedSum / totalWeight);
}

// Vertaal een score (0-100) naar een indicatief impactniveau.
export function getScenarioImpact(score: number): ScenarioImpact {
  if (score >= 80) return "limited";
  if (score >= 60) return "attention";
  if (score >= 40) return "elevated";
  return "high";
}

export function getImpactLabel(impact: ScenarioImpact): string {
  return IMPACT_LABELS[impact];
}

export function getImpactDescription(impact: ScenarioImpact): string {
  return IMPACT_DESCRIPTIONS[impact];
}

// Bereken de impact voor alle scenario's op basis van de themascores.
// De stress-test (useTotalScore) gebruikt de totale weerbaarheidsscore.
export function calculateScenarioResults(
  themeScores: Record<Theme, number>,
  totalScore: number,
): ScenarioResult[] {
  return SCENARIOS.map((scenario: Scenario) => {
    const score = scenario.useTotalScore
      ? totalScore
      : calculateScenarioScore(themeScores, scenario.weights);
    const impact = getScenarioImpact(score);
    return {
      scenarioId: scenario.id,
      score,
      impact,
      impactLabel: getImpactLabel(impact),
    };
  });
}
