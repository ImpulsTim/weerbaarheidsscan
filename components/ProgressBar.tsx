interface ProgressBarProps {
  current: number; // 1-based huidige vraag
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-anthracite/70">
        <span>
          Vraag {current} van {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-lightgreen"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Vraag ${current} van ${total}`}
      >
        <div
          className="h-full rounded-full bg-green transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
