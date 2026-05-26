import { Answers } from "@/types/scan";

// Antwoorden worden tussen scan- en resultaatpagina bewaard in sessionStorage.
// Geen database in deze MVP — later eenvoudig te vervangen door Supabase of context.
const STORAGE_KEY = "weerbaarheidsscan-answers";

export function saveAnswers(answers: Answers): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function loadAnswers(): Answers | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Answers;
  } catch {
    return null;
  }
}

export function clearAnswers(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
