"use client";

import { useState } from "react";
import { Mail, Download, Loader2 } from "lucide-react";
import { ScanResult, Theme } from "@/types/scan";
import { calculateScenarioResults } from "@/lib/scenarios";

// Rasteriseer het SVG-logo naar een PNG dataURL zodat react-pdf het kan tonen.
// Lukt het niet, dan valt het rapport terug op een typografische merknaam.
async function loadLogoDataUrl(): Promise<string | undefined> {
  try {
    const res = await fetch("/logo.svg");
    const svg = await res.text();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new window.Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
    const scale = 3;
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth * scale;
    canvas.height = img.naturalHeight * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    return canvas.toDataURL("image/png");
  } catch {
    return undefined;
  }
}

export default function CTASection({ result }: { result: ScanResult }) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      const themeScoreMap = Object.fromEntries(
        result.themeScores.map((t) => [t.theme, t.score]),
      ) as Record<Theme, number>;
      const scenarioResults = calculateScenarioResults(
        themeScoreMap,
        result.total,
      );

      // Client-only: dynamisch laden voorkomt evaluatie tijdens SSR/build.
      const [{ pdf }, { default: ScanReportPdf }, logoSrc] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ScanReportPdf"),
        loadLogoDataUrl(),
      ]);

      const blob = await pdf(
        <ScanReportPdf
          result={result}
          scenarioResults={scenarioResults}
          logoSrc={logoSrc}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Energie-Weerbaarheidsscan-resultaat.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="rounded-card border border-black/5 bg-lightblue p-8 md:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-black text-anthracite md:text-3xl">
          Wil je weten welke stappen logisch zijn voor jouw bedrijf?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-anthracite/70">
          Impuls Zeeland denkt graag met je mee over verduurzaming, innovatie,
          financiering en samenwerking. Samen kijken we waar de grootste kansen
          en risico&apos;s zitten.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://impulszeeland.nl/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-green-dark sm:w-auto"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            Neem contact op
          </a>
          <button
            type="button"
            onClick={handleDownload}
            disabled={generating}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-anthracite bg-white px-7 py-3.5 text-base font-bold text-anthracite transition-colors hover:bg-anthracite hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {generating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                PDF wordt gemaakt…
              </>
            ) : (
              <>
                <Download className="h-5 w-5" aria-hidden="true" />
                Download als PDF
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
