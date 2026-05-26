import { ThemeStatus } from "@/types/scan";

// Kleur per status. Bewust rustig en professioneel: geen hard rood.
export const STATUS_COLOR: Record<ThemeStatus, string> = {
  kwetsbaar: "#fbba00", // boei geel — duidelijk, maar niet alarmerend
  "aandacht nodig": "#fbba00",
  "redelijk weerbaar": "#a6d6cc", // mint
  "sterk weerbaar": "#46962b", // zeekraal groen
};

interface ScoreBarProps {
  score: number; // 0-100
  status: ThemeStatus;
}

export default function ScoreBar({ score, status }: ScoreBarProps) {
  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-black/5"
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${score}%`, backgroundColor: STATUS_COLOR[status] }}
      />
    </div>
  );
}
