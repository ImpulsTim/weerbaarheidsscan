import { ThemeScore } from "@/types/scan";
import { THEME_EXPLANATIONS } from "@/data/questions";
import ScoreBar, { STATUS_COLOR } from "./ScoreBar";

export default function ThemeScoreCard({ themeScore }: { themeScore: ThemeScore }) {
  const { label, score, status, theme } = themeScore;
  return (
    <div className="rounded-card border border-black/5 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-anthracite">{label}</h3>
        <span className="shrink-0 text-xl font-black text-anthracite">{score}</span>
      </div>
      <div className="mt-3">
        <ScoreBar score={score} status={status} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: STATUS_COLOR[status] }}
          aria-hidden="true"
        />
        <span className="text-sm font-semibold capitalize text-anthracite/70">
          {status}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-anthracite/60">
        {THEME_EXPLANATIONS[theme]}
      </p>
    </div>
  );
}
