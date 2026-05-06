import type {
  Answers,
  Biomarker,
  CountTierQuiz,
  Tier,
  TopTagQuiz,
} from "./types";

/* ─── top-tag scoring ──────────────────────────────────────────────────── */

/**
 * Returns the result key with the highest score. On ties, the first tag
 * encountered (insertion order while walking Yes-answered questions) wins —
 * matches the original HTML reference's stable-sort behavior on
 * `Object.entries`.
 */
export function getRecommendationKey(
  quiz: TopTagQuiz,
  answers: Answers,
): string {
  const scores: Record<string, number> = {};
  const insertionOrder: string[] = [];

  quiz.questions.forEach((q, i) => {
    if (answers[i] !== true) return;
    for (const tag of q.tags ?? []) {
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

/** Returns the user's extra recommendations in question order, deduplicated. */
export function getExtraKeys(quiz: TopTagQuiz, answers: Answers): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  quiz.questions.forEach((q, i) => {
    if (answers[i] !== true) return;
    for (const key of q.extras ?? []) {
      if (seen.has(key)) continue;
      seen.add(key);
      ordered.push(key);
    }
  });
  return ordered;
}

/* ─── count-tier scoring ───────────────────────────────────────────────── */

export interface CountTierResult {
  yesCount: number;
  tier: Tier;
  biomarkers: Biomarker[];
}

export function evaluateCountTier(
  quiz: CountTierQuiz,
  answers: Answers,
): CountTierResult {
  // 1) Yes count
  let yesCount = 0;
  for (let i = 0; i < quiz.questions.length; i++) {
    if (answers[i] === true) yesCount++;
  }

  // 2) Pick tier — find highest minYes that yesCount >= minYes.
  const sorted = [...quiz.tiers].sort((a, b) => a.minYes - b.minYes);
  let tier = sorted[0];
  for (const t of sorted) {
    if (yesCount >= t.minYes) tier = t;
  }

  // 3) Collect biomarkers — union across sections that had any Yes,
  //    in the order their first triggering question appears.
  const sectionTriggered: string[] = [];
  const seenSections = new Set<string>();
  quiz.questions.forEach((q, i) => {
    if (answers[i] !== true || !q.section) return;
    if (seenSections.has(q.section)) return;
    seenSections.add(q.section);
    sectionTriggered.push(q.section);
  });

  const biomarkerKeys: string[] = [];
  const seenKeys = new Set<string>();
  const pushKey = (key: string) => {
    if (seenKeys.has(key)) return;
    seenKeys.add(key);
    biomarkerKeys.push(key);
  };

  if (sectionTriggered.length === 0) {
    quiz.defaultBiomarkers.forEach(pushKey);
  } else {
    for (const section of sectionTriggered) {
      const list = quiz.biomarkersBySection[section] ?? [];
      list.forEach(pushKey);
    }
  }

  const biomarkers = biomarkerKeys
    .slice(0, quiz.maxBiomarkers)
    .map((k) => quiz.biomarkers[k])
    .filter((b): b is Biomarker => Boolean(b));

  return { yesCount, tier, biomarkers };
}
