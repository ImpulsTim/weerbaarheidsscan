import { Profile } from "@/types/scan";
import Swoosh from "./Swoosh";

interface ResultSummaryProps {
  total: number;
  profile: Profile;
}

// Bepaalt de accentkleur van de scorering, oplopend met de score.
function ringColor(total: number): string {
  if (total < 40) return "#fbba00";
  if (total < 60) return "#fbba00";
  if (total < 80) return "#a6d6cc";
  return "#46962b";
}

export default function ResultSummary({ total, profile }: ResultSummaryProps) {
  const color = ringColor(total);
  // Gauge op basis van score (omtrek van de cirkel).
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const dash = (total / 100) * circumference;

  return (
    <section className="relative overflow-hidden rounded-card bg-anthracite p-8 text-white md:p-10">
      <Swoosh className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 text-white/10" />
      <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
        <div className="mx-auto md:mx-0">
          <svg width="200" height="200" viewBox="0 0 200 200" role="img" aria-label={`Jouw score: ${total} van 100`}>
            <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="14" />
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              transform="rotate(-90 100 100)"
            />
            <text x="100" y="92" textAnchor="middle" className="fill-white" fontSize="46" fontWeight="900">
              {total}
            </text>
            <text x="100" y="122" textAnchor="middle" className="fill-white/60" fontSize="16" fontWeight="600">
              van 100
            </text>
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-yellow">
            Jouw risicoprofiel
          </p>
          <h1 className="mt-1 text-3xl font-black md:text-4xl">{profile.title}</h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80">
            {profile.text}
          </p>
        </div>
      </div>
    </section>
  );
}
