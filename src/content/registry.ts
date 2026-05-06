import type { Quiz } from "@/lib/quiz/types";
import { ivDripQuiz } from "./iv-drip";

/**
 * Registry of every published Relive quiz. The landing page reads this
 * directly. Add a new quiz by:
 *   1. Creating `src/content/<slug>.ts` exporting a `Quiz`.
 *   2. Creating `src/app/<slug>/page.tsx` that imports it and renders
 *      `<QuizRunner quiz={...} />`.
 *   3. Pushing the quiz into this array.
 */
export const quizzes: Quiz[] = [ivDripQuiz];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}
