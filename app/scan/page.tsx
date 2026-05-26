"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QUESTIONS } from "@/data/questions";
import { Answers } from "@/types/scan";
import { saveAnswers } from "@/lib/storage";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";

export default function ScanPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0-based index in QUESTIONS
  const [answers, setAnswers] = useState<Answers>({});

  const question = QUESTIONS[step];
  const total = QUESTIONS.length;
  const isLast = step === total - 1;
  const selectedId = answers[question.id];
  const canContinue = Boolean(selectedId);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleNext = () => {
    if (!canContinue) return;
    if (isLast) {
      saveAnswers(answers);
      router.push("/result");
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 md:py-14">
      <ProgressBar current={step + 1} total={total} />

      <div className="mt-8 rounded-card border border-black/5 bg-white p-6 shadow-sm md:p-8">
        <QuestionCard
          question={question}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      {!canContinue && (
        <p className="mt-3 text-sm text-anthracite/60" role="status">
          Kies een antwoord om verder te gaan.
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-full border-2 border-anthracite/20 bg-white px-5 py-3 text-base font-bold text-anthracite transition-colors hover:border-anthracite disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Vorige
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canContinue}
          className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-base font-bold text-white transition-colors hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast ? "Bekijk mijn resultaat" : "Volgende"}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-anthracite/55">
        Er zijn geen goede of foute antwoorden. Het gaat om inzicht.
      </p>
    </div>
  );
}
