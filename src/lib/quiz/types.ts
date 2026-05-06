/**
 * Generic quiz schema. Powers all Relive quizzes via the same engine.
 * Add a new quiz by exporting a `Quiz` from `src/content/<slug>.ts`,
 * registering it in `registry.ts`, and creating a route.
 *
 * Two scoring modes are supported:
 *   - "top-tag":      result keyed by the top-scoring tag (e.g. IV Drip).
 *   - "count-tier":   result is a tier picked by Yes-count, plus a list of
 *                     section-driven biomarker / item recommendations.
 */

export interface Question {
  /** Plain text shown to the user. */
  text: string;
  /** Emoji shown above the question. Optional for sectioned quizzes. */
  emoji?: string;
  /** Sub-text shown under the question (smaller, muted). */
  hint?: string;
  /** Section key — render a section eyebrow + group biomarkers. */
  section?: string;
  /** For top-tag scoring: result keys that get +1 score on Yes. */
  tags?: string[];
  /** Extras to append on Yes. */
  extras?: string[];
}

export interface Vitamin {
  name: string;
  why: string;
}

export interface ResultProfile {
  name: string;
  emoji: string;
  tagline: string;
  desc: string;
  vitamins?: Vitamin[];
  badge?: string;
  vitaminsLabel?: string;
}

export interface ExtraRec {
  icon: string;
  title: string;
  text: string;
}

export interface Biomarker {
  /** Display name, e.g. "Comprehensive Thyroid Panel". */
  name: string;
  /** Short explanation of why it matters. */
  why: string;
  /** Optional inline icon/emoji. */
  icon?: string;
}

export interface Tier {
  /** Inclusive minimum Yes count to enter this tier. */
  minYes: number;
  /** Eyebrow text (e.g. "1–3", "4–6", "7+"). */
  label: string;
  /** Headline shown big on the result. */
  headline: string;
  /** Body copy below the headline. */
  description: string;
  /** Decorative emoji. */
  emoji: string;
}

export interface CTAConfig {
  title: string;
  body: string;
  providerName: string;
  providerCredential?: string;
  providerPhone: string;
  providerAddress?: string;
  /** Optional `tel:`/`https:` link target. Defaults to the phone number. */
  href?: string;
  /** Button text. Defaults to "Book Bloodwork". */
  buttonLabel?: string;
}

export interface QuizSection {
  /** Internal key, used to map Yes answers to recommendations. */
  key: string;
  /** Display label, rendered uppercase. */
  label: string;
}

interface BaseQuiz {
  /** URL slug — must match the route folder name. */
  slug: string;
  title: { lead: string; accent: string };
  subtitle: string;
  introEmoji: string;
  shortDescription: string;
  landingEmoji: string;
  metaTitle: string;
  metaDescription: string;
  questions: Question[];
}

export interface TopTagQuiz extends BaseQuiz {
  scoring: "top-tag";
  results: Record<string, ResultProfile>;
  fallbackResult: string;
  extras?: Record<string, ExtraRec>;
}

export interface CountTierQuiz extends BaseQuiz {
  scoring: "count-tier";
  /** Optional section list (rendered as eyebrows above grouped questions). */
  sections?: QuizSection[];
  /** Tier definitions. Sorted ascending by `minYes` at evaluation time. */
  tiers: Tier[];
  /** All biomarkers, keyed by id. */
  biomarkers: Record<string, Biomarker>;
  /** Section key → ordered biomarker ids triggered by ANY Yes in that section. */
  biomarkersBySection: Record<string, string[]>;
  /** Biomarkers shown when no questions are answered Yes. */
  defaultBiomarkers: string[];
  /** Maximum biomarkers surfaced on the result. */
  maxBiomarkers: number;
  /** Eyebrow text above the biomarker list. */
  biomarkersLabel?: string;
  cta: CTAConfig;
}

export type Quiz = TopTagQuiz | CountTierQuiz;

export interface Answers {
  [questionIndex: number]: boolean;
}
