"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Answers, ScanResult, Theme } from "@/types/scan";
import { calculateResult, isComplete } from "@/lib/scoring";
import { loadAnswers, clearAnswers } from "@/lib/storage";
import ResultSummary from "@/components/ResultSummary";
import ThemeScoreCard from "@/components/ThemeScoreCard";
import RecommendationCard from "@/components/RecommendationCard";
import ScenarioSection from "@/components/ScenarioSection";
import CTASection from "@/components/CTASection";
import ShareButton from "@/components/ShareButton";

type State =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "ready"; result: ScanResult };

export default function ResultPage() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    // sessionStorage is alleen client-side beschikbaar; we synchroniseren de
    // opgeslagen antwoorden na mount. setState hier is hier juist bedoeld.
    const answers: Answers | null = loadAnswers();
    /* eslint-disable react-hooks/set-state-in-effect */
    if (!answers || !isComplete(answers)) {
      setState({ status: "empty" });
      return;
    }
    setState({ status: "ready", result: calculateResult(answers) });
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  if (state.status === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center text-anthracite/60">
        Je resultaat wordt geladen…
      </div>
    );
  }

  if (state.status === "empty") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="text-2xl font-black text-anthracite">
          Nog geen resultaat
        </h1>
        <p className="mt-3 text-base text-anthracite/70">
          Doe eerst de scan om je weerbaarheidsprofiel te zien.
        </p>
        <Link
          href="/scan"
          className="mt-6 inline-flex rounded-full bg-green px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-green-dark"
        >
          Start de scan
        </Link>
      </div>
    );
  }

  const { result } = state;

  // De scenario-helpers werken op een thema -> score map.
  const themeScoreMap = Object.fromEntries(
    result.themeScores.map((t) => [t.theme, t.score]),
  ) as Record<Theme, number>;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:py-14">
      <div id="overzicht" className="scroll-mt-24">
        <ResultSummary total={result.total} profile={result.profile} />
      </div>

      {/* Ankernavigatie */}
      <nav
        aria-label="Onderdelen van je resultaat"
        className="no-print mt-6 flex flex-wrap gap-2 border-y border-black/5 py-3 text-sm font-bold"
      >
        {[
          { href: "#overzicht", label: "Overzicht" },
          { href: "#themas", label: "Thema's" },
          { href: "#scenarios", label: "Scenario's" },
          { href: "#vervolgstappen", label: "Vervolgstappen" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-1.5 text-anthracite/70 transition-colors hover:bg-lightblue hover:text-anthracite"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Thema-scores */}
      <section id="themas" className="mt-10 scroll-mt-24">
        <h2 className="text-2xl font-black text-anthracite">
          Je scores per thema
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.themeScores.map((ts) => (
            <ThemeScoreCard key={ts.theme} themeScore={ts} />
          ))}
        </div>
      </section>

      {/* Wat betekent dit? */}
      <section className="mt-10 rounded-card bg-lightblue p-6 md:p-8">
        <h2 className="text-2xl font-black text-anthracite">Wat betekent dit?</h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-anthracite/75">
          Je totaalscore van <strong>{result.total}/100</strong> geeft een
          indicatie van hoe weerbaar je bedrijf op dit moment is tegen
          energie-onzekerheid. De themascores laten zien waar je al sterk staat
          en waar nog kansen liggen. Een lagere score is geen oordeel, maar een
          startpunt: kleine stappen kunnen al helpen om je bedrijf weerbaarder
          te maken.
        </p>
      </section>

      {/* Overgangstekst naar de scenario's */}
      <p className="mt-10 max-w-3xl text-base leading-relaxed text-anthracite/75">
        Je score is een momentopname. De scenario&apos;s hieronder laten zien
        waar je bedrijf mogelijk sterker of juist kwetsbaarder wordt wanneer
        omstandigheden veranderen.
      </p>

      {/* Scenario's */}
      <ScenarioSection themeScores={themeScoreMap} total={result.total} />

      {/* Drie logische vervolgstappen */}
      <section id="vervolgstappen" className="mt-10 scroll-mt-24">
        <h2 className="text-2xl font-black text-anthracite">
          Drie logische vervolgstappen
        </h2>
        <p className="mt-2 text-base text-anthracite/70">
          Op basis van je laagst scorende thema&apos;s.
        </p>
        <div className="mt-5 grid gap-4">
          {result.recommendations.map((rec, i) => (
            <RecommendationCard key={rec.theme} recommendation={rec} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12">
        <CTASection result={result} />
      </div>

      {/* Acties */}
      <div className="no-print mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/scan"
          onClick={() => clearAnswers()}
          className="inline-flex items-center gap-2 text-base font-bold text-anthracite underline-offset-4 hover:underline"
        >
          <RotateCcw className="h-5 w-5" aria-hidden="true" />
          Scan opnieuw doen
        </Link>
        <ShareButton label="Deel deze scan" />
      </div>

      <p className="mt-10 text-center text-xs text-anthracite/50">
        De uitkomst van deze scan is indicatief en bedoeld als startpunt voor
        gesprek, niet als financieel advies.
      </p>
    </div>
  );
}
