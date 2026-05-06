/**
 * Generic quiz schema. Powers all Relive quizzes via the same engine.
 * Add a new quiz by exporting a `Quiz` from `src/content/<slug>.ts`
 * and creating a route at `src/app/<slug>/page.tsx`.
 */

export interface Question {
  /** Plain text shown to the user. */
  text: string;
  /** Emoji shown above the question (or a short string). */
  emoji: string;
  /** Result keys that get +1 score when the user answers Yes. */
  tags: string[];
  /** Extra recommendation keys appended when the user answers Yes. */
  extras: string[];
}

export interface Vitamin {
  name: string;
  why: string;
}

export interface ResultProfile {
  /** Display name (e.g. "Energy"). */
  name: string;
  /** Emoji rendered as the hero icon on the result card. */
  emoji: string;
  /** Italic cyan one-liner under the name. */
  tagline: string;
  /** Long-form description paragraph. */
  desc: string;
  /** Bulleted "why these help" list. Optional — some result cards may omit. */
  vitamins?: Vitamin[];
  /** Optional badge text override. Defaults to "Your Recommendation". */
  badge?: string;
  /** Optional label above the vitamins list. Defaults to "Why These Help You". */
  vitaminsLabel?: string;
}

export interface ExtraRec {
  icon: string;
  title: string;
  text: string;
}

export interface Quiz {
  /** URL slug — must match the route folder name. */
  slug: string;
  /** Card title (HTML allowed via the `accent` field for the colored portion). */
  title: {
    /** Leading text in slate. */
    lead: string;
    /** Trailing italic + cyan accent (e.g. "IV Drip"). */
    accent: string;
  };
  /** One-liner displayed under the title on the intro card. */
  subtitle: string;
  /** Emoji icon at the top of the intro card. */
  introEmoji: string;
  /** Optional short copy for the landing page tile. */
  shortDescription: string;
  /** Tile emoji on the landing page. */
  landingEmoji: string;
  /** Browser tab title for the quiz route. */
  metaTitle: string;
  /** Meta description for the quiz route. */
  metaDescription: string;
  questions: Question[];
  /**
   * The map of result keys → result profiles. Tags from questions must
   * resolve to keys in this map. The first key in this object is used as
   * the "default fallback" when nobody answered Yes (mirrors the original
   * IV-quiz `Recovery` fallback behavior).
   */
  results: Record<string, ResultProfile>;
  /** Optional extras dictionary, keyed by extra string. */
  extras?: Record<string, ExtraRec>;
  /** Drip key returned when no questions are answered Yes. */
  fallbackResult: string;
}

export interface Answers {
  [questionIndex: number]: boolean;
}
