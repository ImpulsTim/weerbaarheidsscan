import { QUESTIONS, THEME_LABELS } from "@/data/questions";
import { PROFILES, RECOMMENDATIONS } from "@/data/recommendations";
import {
  Answers,
  Profile,
  Recommendation,
  ScanResult,
  Theme,
  ThemeScore,
  ThemeStatus,
} from "@/types/scan";

const THEMES: Theme[] = [
  "costResilience",
  "dependency",
  "supplySecurity",
  "flexibility",
  "futureReadiness",
];

// Maximaal haalbare punten per thema: voor elke vraag waarin het thema
// voorkomt tellen we de hoogste optie-score voor dat thema mee.
function maxPointsPerTheme(): Record<Theme, number> {
  const max = {
    costResilience: 0,
    dependency: 0,
    supplySecurity: 0,
    flexibility: 0,
    futureReadiness: 0,
  } as Record<Theme, number>;

  for (const question of QUESTIONS) {
    for (const theme of THEMES) {
      const best = Math.max(
        ...question.options.map((opt) => opt.scores[theme] ?? 0),
      );
      if (best > 0) {
        max[theme] += best;
      }
    }
  }
  return max;
}

function statusFor(score: number): ThemeStatus {
  if (score < 40) return "kwetsbaar";
  if (score < 60) return "aandacht nodig";
  if (score < 80) return "redelijk weerbaar";
  return "sterk weerbaar";
}

function profileFor(total: number): Profile {
  const match = PROFILES.find((p) => total >= p.min && total <= p.max);
  // Fallback is theoretisch onnodig omdat de ranges 0-100 dekken.
  return match ? match.profile : PROFILES[0].profile;
}

export function calculateResult(answers: Answers): ScanResult {
  const maxPoints = maxPointsPerTheme();
  const earned = {
    costResilience: 0,
    dependency: 0,
    supplySecurity: 0,
    flexibility: 0,
    futureReadiness: 0,
  } as Record<Theme, number>;

  // Tel de punten van de gekozen antwoorden op per thema.
  for (const question of QUESTIONS) {
    const chosenId = answers[question.id];
    if (!chosenId) continue;
    const option = question.options.find((o) => o.id === chosenId);
    if (!option) continue;
    for (const theme of THEMES) {
      earned[theme] += option.scores[theme] ?? 0;
    }
  }

  const themeScores: ThemeScore[] = THEMES.map((theme) => {
    const max = maxPoints[theme];
    const score = max > 0 ? Math.round((earned[theme] / max) * 100) : 0;
    return {
      theme,
      label: THEME_LABELS[theme],
      score,
      status: statusFor(score),
    };
  });

  const total = Math.round(
    themeScores.reduce((sum, t) => sum + t.score, 0) / themeScores.length,
  );

  // Aanbevelingen voor de drie laagst scorende thema's.
  const recommendations: Recommendation[] = [...themeScores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((t) => RECOMMENDATIONS[t.theme]);

  return {
    total,
    profile: profileFor(total),
    themeScores,
    recommendations,
  };
}

// Validatie: alle vragen beantwoord?
export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => Boolean(answers[q.id]));
}
