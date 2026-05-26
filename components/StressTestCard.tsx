"use client";

import { useId, useState } from "react";
import { ChevronDown, Gauge, Lightbulb } from "lucide-react";
import { Scenario, ScenarioResult } from "@/types/scan";
import { getImpactDescription } from "@/lib/scenarios";
import ScenarioImpactBadge from "./ScenarioImpactBadge";
import ScenarioComparison from "./ScenarioComparison";
import ImpulsHelpBlock from "./ImpulsHelpBlock";

// Samenvattende stress-test (scenario 5). Opvallender dan de losse cards via
// een mint-accent, maar binnen dezelfde rustige huisstijl.
export default function StressTestCard({
  scenario,
  result,
}: {
  scenario: Scenario;
  result: ScenarioResult;
}) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    <div className="rounded-card border border-mint bg-lightblue p-6 shadow-sm md:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-anthracite text-yellow">
          <Gauge className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-green">
                Stress-test
              </span>
              <h3 className="mt-0.5 text-xl font-black text-anthracite">
                {scenario.title}
              </h3>
            </div>
            <ScenarioImpactBadge impact={result.impact} />
          </div>
          <p className="mt-1 text-sm font-medium text-anthracite/60">
            {getImpactDescription(result.impact)}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-anthracite/75">
            {scenario.shortDescription}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={detailsId}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-green underline-offset-4 hover:underline"
      >
        {open ? "Verberg toelichting" : "Bekijk toelichting"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={detailsId} className="mt-4 space-y-4">
          <ScenarioComparison
            vulnerableText={scenario.vulnerableText}
            resilientText={scenario.resilientText}
          />
          <div className="flex gap-3 rounded-card bg-white p-4">
            <Lightbulb
              className="h-5 w-5 shrink-0 text-green"
              aria-hidden="true"
            />
            <div>
              <h4 className="text-sm font-bold text-anthracite">
                Wat kun je doen?
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-anthracite/75">
                {scenario.actionAdvice}
              </p>
            </div>
          </div>
          <ImpulsHelpBlock text={scenario.impulsHelp} />
        </div>
      )}
    </div>
  );
}
