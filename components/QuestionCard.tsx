import { Info } from "lucide-react";
import { Question } from "@/types/scan";

interface QuestionCardProps {
  question: Question;
  selectedId?: string;
  onSelect: (optionId: string) => void;
}

export default function QuestionCard({
  question,
  selectedId,
  onSelect,
}: QuestionCardProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold leading-snug text-anthracite md:text-3xl">
        {question.text}
      </h2>

      {question.helper && (
        <p className="mt-3 flex items-start gap-2 rounded-xl bg-lightblue px-4 py-3 text-sm text-anthracite/70">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
          <span>{question.helper}</span>
        </p>
      )}

      <fieldset className="mt-6">
        <legend className="sr-only">{question.text}</legend>
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const checked = selectedId === option.id;
            return (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center gap-4 rounded-card border p-4 transition-colors ${
                  checked
                    ? "border-green bg-lightgreen"
                    : "border-black/10 bg-white hover:border-green/50 hover:bg-lightgreen/40"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={checked}
                  onChange={() => onSelect(option.id)}
                  className="sr-only"
                />
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    checked
                      ? "border-green bg-green text-white"
                      : "border-anthracite/30 text-anthracite/50"
                  }`}
                  aria-hidden="true"
                >
                  {option.id}
                </span>
                <span className="text-base font-medium text-anthracite">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
