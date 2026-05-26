import { ScenarioImpact } from "@/types/scan";
import { getImpactLabel } from "@/lib/scenarios";

// Rustige, professionele badges. Geen fel rood: bij hoge impact gebruiken we
// een antraciet vlak met gele rand zodat het opvalt zonder te alarmeren.
const BADGE_STYLES: Record<ScenarioImpact, string> = {
  limited: "bg-lightgreen text-green border border-green/30",
  attention: "bg-yellow/15 text-anthracite border border-yellow",
  elevated: "bg-yellow text-anthracite border border-yellow",
  high: "bg-anthracite text-yellow border-2 border-yellow",
};

export default function ScenarioImpactBadge({
  impact,
}: {
  impact: ScenarioImpact;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-bold ${BADGE_STYLES[impact]}`}
    >
      {getImpactLabel(impact)}
    </span>
  );
}
