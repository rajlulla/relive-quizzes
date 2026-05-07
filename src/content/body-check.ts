import type { TopTagQuiz } from "@/lib/quiz/types";

/**
 * "Is your body trying to tell you something?" — wellness lead-gen quiz.
 *
 * Maps each Yes answer to one of two protocol axes:
 *   - HRT (hormone therapy): Q1, Q2, Q4, Q5, Q9, Q10
 *   - GLP (metabolic / GLP-1): Q6, Q7, Q8
 *   - Q3 ("tired even when I do nothing") signals BOTH — fatigue rest
 *     doesn't touch is non-specific between hormonal + metabolic.
 *
 * Result selection (top-tag scoring + mixedRule override):
 *   - If HRT >= 2 AND GLP >= 2 → "Mixed" (both systems need attention)
 *   - Else the higher-scoring axis wins
 *   - If nobody answered Yes → "Mixed" (most general blurb)
 *
 * The phone is captured before the result reveal; staff follows up.
 */
export const bodyCheckQuiz: TopTagQuiz = {
  scoring: "top-tag",
  slug: "body-check",
  captureLead: true,
  title: { lead: "Is your body trying", accent: "to tell you something?" },
  subtitle:
    "Answer yes or no honestly. There are no wrong answers — just information.",
  introEmoji: "🩺",
  shortDescription:
    "10 quick questions about how you actually feel — and what your body might be asking for.",
  landingEmoji: "🩺",
  metaTitle: "Is Your Body Trying to Tell You Something? | Relive Health",
  metaDescription:
    "10 quick questions about sleep, mood, weight, and energy — and a personalized recommendation from Relive Health.",
  fallbackResult: "Mixed",
  nextStepsNote:
    "Heather will reach out using the number you provided to schedule next steps.",
  sections: [
    { key: "sleep_energy", label: "Sleep & Energy" },
    { key: "mood_mind", label: "Mood & Mind" },
    { key: "weight_body", label: "Weight & Body" },
    { key: "doctor", label: "What Your Doctor Said" },
  ],
  questions: [
    {
      section: "sleep_energy",
      text: "I wake up during the night and struggle to fall back asleep",
      tags: ["HRT"],
    },
    {
      section: "sleep_energy",
      text: "I feel exhausted all day but my sleep is restless or unrefreshing",
      tags: ["HRT"],
    },
    {
      section: "sleep_energy",
      text: "I am tired even on days when I do nothing",
      hint: "Fatigue that rest doesn't touch.",
      // Non-specific signal — points to either or both. Counted on
      // both axes so the mixedRule can detect "you have both" cases.
      tags: ["HRT", "GLP"],
    },
    {
      section: "mood_mind",
      text: "I feel anxious or irritable in ways that are new for me",
      hint: "Minor things set me off; on edge without a clear reason.",
      tags: ["HRT"],
    },
    {
      section: "mood_mind",
      text: "My focus and memory are not what they used to be",
      hint: "Brain fog, forgetting words, difficulty concentrating.",
      tags: ["HRT"],
    },
    {
      section: "weight_body",
      text: "My weight keeps going up even though I'm eating less and moving more",
      tags: ["GLP"],
    },
    {
      section: "weight_body",
      text: "I'm gaining weight around my middle that wasn't there before",
      tags: ["GLP"],
    },
    {
      section: "weight_body",
      text: "What used to work — diet, exercise, habits — simply doesn't anymore",
      tags: ["GLP"],
    },
    {
      section: "doctor",
      text: "I've been told my labs are normal — but I don't feel normal",
      tags: ["HRT"],
    },
    {
      section: "doctor",
      text: "I feel like a different version of myself and I don't know why",
      hint: "The person I used to be has become harder to access.",
      tags: ["HRT"],
    },
  ],
  mixedRule: {
    primary: "HRT",
    secondary: "GLP",
    mixedKey: "Mixed",
    threshold: 2,
  },
  results: {
    HRT: {
      name: "Hormone Therapy",
      emoji: "⚖️",
      tagline: "Get back to yourself",
      desc: "Your results suggest your hormones may be at the root of what you're feeling. Shifts in estrogen, progesterone, and testosterone affect sleep, mood, focus, and how you feel in your own skin — and standard lab panels often miss it entirely. The good news: these are addressable. A comprehensive hormone workup can identify exactly what's out of balance and give us a roadmap to get you back to yourself.",
    },
    GLP: {
      name: "Metabolic Reset",
      emoji: "🔥",
      tagline: "Your biology, recalibrated",
      desc: "Your results suggest a metabolic shift may be working against you. When the body's insulin response, hunger signals, and fat storage patterns change — and they do change with age — doing more of what used to work stops working. This isn't a willpower problem. It's a biology problem. And biology can be addressed with the right clinical support, nutrition strategy, and coaching.",
    },
    Mixed: {
      name: "Comprehensive Workup",
      emoji: "🎯",
      tagline: "Find your biggest roadblock first",
      desc: "Your results suggest more than one system may need attention. Hormonal imbalance and metabolic resistance often show up together — each one making the other harder to manage. The most effective approach starts with a comprehensive workup to identify your biggest roadblock first, then build a personalized plan around it. This is exactly what we do.",
    },
  },
};
