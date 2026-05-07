import type { CountTierQuiz } from "@/lib/quiz/types";

/**
 * "Is your body trying to tell you something?" — bloodwork lead-gen quiz.
 *
 * The aim is to surface a tier (early signal vs likely imbalance vs real
 * answers needed) and a short, prioritized list of biomarkers worth
 * checking — then push the visitor to book bloodwork. The recommendation
 * always lands on bloodwork; the depth of the panel scales with the
 * sections that triggered.
 */
export const bodyCheckQuiz: CountTierQuiz = {
  scoring: "count-tier",
  slug: "body-check",
  captureLead: true,
  title: { lead: "Is your body trying", accent: "to tell you something?" },
  subtitle:
    "Answer yes or no honestly. There are no wrong answers — just information.",
  introEmoji: "🩺",
  shortDescription:
    "10 quick questions about how you actually feel — and the biomarkers worth checking.",
  landingEmoji: "🩺",
  metaTitle: "Is Your Body Trying to Tell You Something? | Relive Health",
  metaDescription:
    "10 quick questions about sleep, mood, weight, and energy — and the biomarkers worth checking. Personalized bloodwork recommendations from Relive Health.",
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
    },
    {
      section: "sleep_energy",
      text: "I feel exhausted all day but my sleep is restless or unrefreshing",
    },
    {
      section: "sleep_energy",
      text: "I am tired even on days when I do nothing",
      hint: "Fatigue that rest doesn't touch.",
    },
    {
      section: "mood_mind",
      text: "I feel anxious or irritable in ways that are new for me",
      hint: "Minor things set me off; on edge without a clear reason.",
    },
    {
      section: "mood_mind",
      text: "My focus and memory are not what they used to be",
      hint: "Brain fog, forgetting words, difficulty concentrating.",
    },
    {
      section: "weight_body",
      text: "My weight keeps going up even though I'm eating less and moving more",
    },
    {
      section: "weight_body",
      text: "I'm gaining weight around my middle that wasn't there before",
    },
    {
      section: "weight_body",
      text: "What used to work — diet, exercise, habits — simply doesn't anymore",
    },
    {
      section: "doctor",
      text: "I've been told my labs are normal — but I don't feel normal",
    },
    {
      section: "doctor",
      text: "I feel like a different version of myself and I don't know why",
      hint: "The person I used to be has become harder to access.",
    },
  ],
  tiers: [
    {
      minYes: 0,
      label: "Baseline Check-In",
      headline: "You're listening to your body — let's get a baseline.",
      description:
        "Even when nothing feels off, a foundational panel tells you where you stand and gives us numbers to compare against later. Knowing your baseline is one of the best long-term investments in your health.",
      emoji: "🌿",
    },
    {
      minYes: 1,
      label: "1–3 · Early Signals",
      headline: "Early signals worth addressing now.",
      description:
        "What you're noticing usually shows up in your bloodwork before it becomes a bigger pattern. A targeted panel can catch this early — when small adjustments do the most work.",
      emoji: "🔍",
    },
    {
      minYes: 4,
      label: "4–6 · Imbalance Likely",
      headline: "A hormonal or metabolic imbalance is likely.",
      description:
        "When this many signals stack up across sleep, mood, and weight, it usually isn't willpower — it's biology. The good news: most of what's driving this is measurable, and once we see the numbers, we know exactly what to address.",
      emoji: "⚖️",
    },
    {
      minYes: 7,
      label: "7+ · Real Answers Needed",
      headline: "Your body is asking for real answers.",
      description:
        "This many signals together is your body waving a flag. A comprehensive bloodwork panel — read by a clinician who's looking at the full picture — is the fastest way to stop guessing and start feeling like yourself again.",
      emoji: "🚨",
    },
  ],
  biomarkers: {
    thyroid_basic: {
      name: "Comprehensive Thyroid Panel",
      why: "TSH alone misses a lot. A full panel (Free T3, Free T4, Reverse T3, antibodies) reveals fatigue, weight, and brain-fog drivers a standard screen can't see.",
    },
    thyroid_full: {
      name: "Full Thyroid + Antibodies",
      why: "Adds Reverse T3 and TPO/TG antibodies — catches autoimmune thyroid patterns and conversion issues behind unexplained fatigue and weight gain.",
    },
    cortisol: {
      name: "AM/PM Cortisol Rhythm",
      why: "Your stress hormone has a daily rhythm. When it flips, you wake at 3 AM, crash mid-afternoon, and feel wired-but-tired. A diurnal cortisol panel shows the pattern.",
    },
    vitd: {
      name: "Vitamin D (25-OH)",
      why: "One of the most common deficiencies behind fatigue, low mood, and immune issues. Easy to fix once you know your level.",
    },
    ferritin: {
      name: "Iron + Ferritin",
      why: "Low iron stores cause fatigue, restless sleep, and brain fog long before standard hemoglobin flags it as anemia.",
    },
    b12_folate: {
      name: "B12 + Folate (with MMA)",
      why: "Drives energy, mood, and methylation. Low-normal B12 still causes brain fog — methylmalonic acid catches what serum B12 alone misses.",
    },
    insulin_a1c: {
      name: "Fasting Insulin + HbA1c",
      why: "Insulin resistance often shows up years before glucose does. These two together are the earliest warning that metabolism is shifting.",
    },
    sex_hormones: {
      name: "Estradiol, Progesterone, Testosterone",
      why: "The hormonal trio behind sleep changes, mood swings, midsection weight gain, and 'I don't feel like myself.' Worth measuring at the right cycle day.",
    },
    dhea: {
      name: "DHEA-S",
      why: "Your master adrenal hormone. Often suppressed under chronic stress — drives drive, libido, and recovery.",
    },
    crp: {
      name: "hs-CRP (Inflammation)",
      why: "A simple marker of systemic inflammation. Elevated when immune, metabolic, or hormonal systems are under strain.",
    },
    omega3: {
      name: "Omega-3 Index",
      why: "Brain function, mood stability, and inflammation control all hinge on having enough EPA/DHA. Most people are below the protective range.",
    },
    metabolic_full: {
      name: "Comprehensive Metabolic Panel",
      why: "Liver, kidney, and electrolyte function — the foundation that everything else builds on. Standard labs miss subtle patterns; we read them in context.",
    },
  },
  biomarkersBySection: {
    sleep_energy: ["thyroid_full", "cortisol", "ferritin", "vitd", "b12_folate"],
    mood_mind: ["cortisol", "vitd", "b12_folate", "omega3", "sex_hormones"],
    weight_body: [
      "insulin_a1c",
      "thyroid_full",
      "sex_hormones",
      "cortisol",
      "dhea",
    ],
    doctor: [
      "thyroid_full",
      "sex_hormones",
      "cortisol",
      "crp",
      "metabolic_full",
    ],
  },
  defaultBiomarkers: ["thyroid_basic", "vitd", "metabolic_full"],
  maxBiomarkers: 5,
  biomarkersLabel: "Biomarkers Worth Checking",
  cta: {
    title: "Get a personalized bloodwork plan.",
    body: "Bring this list — or skip it and let Heather pull together a panel built around what you're actually experiencing. We'll review the results with you and turn numbers into a plan.",
    providerName: "Heather Robbie",
    providerCredential: "NP-C, Relive Health",
    providerPhone: "(973) 490-4541",
    providerAddress: "187 Columbia Turnpike, Florham Park NJ",
    buttonLabel: "Book Bloodwork With Heather",
  },
};
