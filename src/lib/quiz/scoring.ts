import type { Answers, Quiz } from "./types";

/**
 * Returns the result key with the highest score. On ties, the first tag
 * encountered (insertion order while walking Yes-answered questions) wins —
 * matches the original HTML reference's stable-sort behavior on
 * `Object.entries`.
 */
export function getRecommendationKey(quiz: Quiz, answers: Answers): string {
  const scores: Record<string, number> = {};
  const insertionOrder: string[] = [];

  quiz.questions.forEach((q, i) => {
    if (answers[i] !== true) return;
    for (const tag of q.tags) {
      if (scores[tag] === undefined) insertionOrder.push(tag);
      scores[tag] = (scores[tag] ?? 0) + 1;
    }
  });

  if (insertionOrder.length === 0) return quiz.fallbackResult;

  let bestKey = insertionOrder[0];
  let bestScore = scores[bestKey];
  for (let i = 1; i < insertionOrder.length; i++) {
    const key = insertionOrder[i];
    if (scores[key] > bestScore) {
      bestKey = key;
      bestScore = scores[key];
    }
  }
  return bestKey;
}

/**
 * Returns the user's extra recommendations in question order, deduplicated.
 */
export function getExtraKeys(quiz: Quiz, answers: Answers): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  quiz.questions.forEach((q, i) => {
    if (answers[i] !== true) return;
    for (const key of q.extras) {
      if (seen.has(key)) continue;
      seen.add(key);
      ordered.push(key);
    }
  });
  return ordered;
}
