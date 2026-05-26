import { Theme } from "@/types/scan";
import { SCENARIOS } from "@/data/scenarios";
import { calculateScenarioResults } from "@/lib/scenarios";
import ScenarioCard from "./ScenarioCard";
import StressTestCard from "./StressTestCard";

export default function ScenarioSection({
  themeScores,
  total,
}: {
  themeScores: Record<Theme, number>;
  total: number;
}) {
  const results = calculateScenarioResults(themeScores, total);
  const resultById = new Map(results.map((r) => [r.scenarioId, r]));

  // De eerste vier scenario's zijn losse cards; de stress-test staat apart.
  const cards = SCENARIOS.filter((s) => !s.useTotalScore);
  const stressTest = SCENARIOS.find((s) => s.useTotalScore);
  const stressTestResult = stressTest
    ? resultById.get(stressTest.id)
    : undefined;

  return (
    <section id="scenarios" className="mt-12 scroll-mt-24">
      <h2 className="text-2xl font-black text-anthracite">
        Wat gebeurt er als de omstandigheden veranderen?
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-anthracite/75">
        Je score laat zien hoe weerbaar je bedrijf nu lijkt. Maar externe
        ontwikkelingen kunnen snel veranderen. Bekijk hieronder wat verschillende
        scenario&apos;s kunnen betekenen voor je kosten, continuïteit en
        afhankelijkheid.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {cards.map((scenario) => {
          const result = resultById.get(scenario.id);
          if (!result) return null;
          return (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              result={result}
            />
          );
        })}
      </div>

      {stressTest && stressTestResult && (
        <div className="mt-4">
          <StressTestCard
            scenario={stressTest}
            result={stressTestResult}
          />
        </div>
      )}

      <p className="mt-6 text-xs leading-relaxed text-anthracite/50">
        Deze scenario&apos;s zijn indicatief. Ze helpen om risico&apos;s en
        kansen bespreekbaar te maken, maar vervangen geen energieadvies of
        financiële analyse.
      </p>
    </section>
  );
}
