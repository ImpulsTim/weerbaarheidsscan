import { Lightbulb } from "lucide-react";
import { Recommendation } from "@/types/scan";

export default function RecommendationCard({
  recommendation,
  index,
}: {
  recommendation: Recommendation;
  index: number;
}) {
  return (
    <div className="flex gap-4 rounded-card border border-black/5 bg-lightgreen p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow text-anthracite">
        <Lightbulb className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <span className="text-xs font-bold uppercase tracking-wide text-green">
          Stap {index + 1}
        </span>
        <h3 className="mt-0.5 text-lg font-bold text-anthracite">
          {recommendation.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-anthracite/70">
          {recommendation.text}
        </p>
      </div>
    </div>
  );
}
