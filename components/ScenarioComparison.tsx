// Visueel onderscheid tussen een kwetsbaarder en een weerbaarder bedrijf.
// Links lichtblauw (kwetsbaarder), rechts lichtgroen (weerbaarder).
export default function ScenarioComparison({
  vulnerableText,
  resilientText,
}: {
  vulnerableText: string;
  resilientText: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-card bg-lightblue p-4">
        <h4 className="text-sm font-bold text-anthracite">Kwetsbaarder</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-anthracite/70">
          {vulnerableText}
        </p>
      </div>
      <div className="rounded-card bg-lightgreen p-4">
        <h4 className="text-sm font-bold text-green">Weerbaarder</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-anthracite/70">
          {resilientText}
        </p>
      </div>
    </div>
  );
}
