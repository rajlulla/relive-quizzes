import type { Quiz } from "@/lib/quiz/types";

export const ivDripQuiz: Quiz = {
  slug: "iv-drip",
  title: { lead: "Find Your Perfect", accent: "IV Drip" },
  subtitle:
    "Answer 8 quick questions and we'll recommend the IV drip best suited to what your body needs right now.",
  introEmoji: "💧",
  shortDescription:
    "Our 8-question wellness check pairs you with the IV drip your body is asking for — energy, recovery, immune support, glow, and more.",
  landingEmoji: "💧",
  metaTitle: "Find Your Perfect IV Drip | Relive Health",
  metaDescription:
    "Answer 8 quick questions and we'll recommend the IV drip best suited to what your body needs right now.",
  fallbackResult: "Recovery",
  questions: [
    {
      text: "Do you often feel tired or low on energy?",
      emoji: "😴",
      tags: ["Energy", "NAD"],
      extras: ["bloodwork"],
    },
    {
      text: "Do you get sick frequently or feel like your immune system needs a boost?",
      emoji: "🤒",
      tags: ["Immune"],
      extras: [],
    },
    {
      text: "Are you dealing with stress, anxiety, or trouble relaxing?",
      emoji: "😰",
      tags: ["Stress", "Recovery"],
      extras: ["supplements"],
    },
    {
      text: "Are you concerned about your skin, hair, or nail health?",
      emoji: "🌟",
      tags: ["Glow Up"],
      extras: ["aesthetic"],
    },
    {
      text: "Do you experience bloating, digestive issues, or gut discomfort?",
      emoji: "🫃",
      tags: ["Gut Health"],
      extras: [],
    },
    {
      text: "Do you experience muscle soreness, joint pain, or inflammation?",
      emoji: "🦴",
      tags: ["Pain & Inflammation", "Recovery"],
      extras: ["peptides"],
    },
    {
      text: "Do you struggle with brain fog, poor focus, or mental clarity?",
      emoji: "🧠",
      tags: ["Brain", "NAD", "Methylene Blue"],
      extras: [],
    },
    {
      text: "Are you focused on weight loss or boosting your metabolism?",
      emoji: "⚖️",
      tags: ["Weight Loss"],
      extras: ["glp1"],
    },
  ],
  results: {
    Immune: {
      name: "Immune",
      emoji: "🛡️",
      tagline: "Fortify your defenses",
      desc: "Your answers suggest your immune system could use reinforcement. This drip is packed with high-dose Vitamin C and essential minerals to help your body fight off illness and stay resilient.",
      vitamins: [
        {
          name: "Vitamin C (Ascorbic Acid)",
          why: "A powerful antioxidant that supports immune cell function and helps your body combat infections and free radicals.",
        },
        {
          name: "Vita-Complex",
          why: "A blend of B vitamins that support energy production and help maintain a healthy immune response.",
        },
        {
          name: "Mineral Blend",
          why: "Essential trace minerals that support hundreds of enzymatic reactions, including those involved in immune defense.",
        },
      ],
    },
    Energy: {
      name: "Energy",
      emoji: "⚡",
      tagline: "Reignite your spark",
      desc: "Your body is telling you it needs fuel. This drip combines B12, Vitamin C, and key minerals to restore cellular energy and help you feel like yourself again.",
      vitamins: [
        {
          name: "Hydroxocobalamin (B12)",
          why: "Critical for red blood cell production and neurological function — low B12 is one of the most common causes of fatigue.",
        },
        {
          name: "Vitamin C",
          why: "Supports adrenal function and helps your body manage the physical effects of exhaustion.",
        },
        {
          name: "Vita-Complex",
          why: "B vitamins are the backbone of energy metabolism — they help convert food into usable fuel at the cellular level.",
        },
        {
          name: "Mineral Blend",
          why: "Replenishes electrolytes and trace minerals lost through stress and daily activity.",
        },
      ],
    },
    "Glow Up": {
      name: "Glow Up",
      emoji: "✨",
      tagline: "Radiate from within",
      desc: "True skin health starts from the inside. This drip is loaded with biotin, amino acids, and B12 to nourish your skin, strengthen your hair, and support healthy nail growth.",
      vitamins: [
        {
          name: "Biotin",
          why: "Known as the 'beauty vitamin' — essential for keratin production which makes up your hair, skin, and nails.",
        },
        {
          name: "Amino Blend",
          why: "The building blocks of collagen and elastin, which keep skin firm, plump, and youthful.",
        },
        {
          name: "Glycine",
          why: "A key component of collagen synthesis — helps maintain skin elasticity and supports tissue repair.",
        },
        {
          name: "Hydroxocobalamin (B12)",
          why: "Supports cell reproduction and renewal, which is essential for healthy, glowing skin.",
        },
      ],
    },
    "Weight Loss": {
      name: "Weight Loss",
      emoji: "🔥",
      tagline: "Ignite your metabolism",
      desc: "This drip is designed to support your body's fat-burning processes, boost energy for workouts, and help you make the most of your weight loss efforts.",
      vitamins: [
        {
          name: "Carnitine",
          why: "Plays a direct role in transporting fatty acids into your cells to be burned as energy.",
        },
        {
          name: "Arginine",
          why: "Supports circulation and helps the body produce nitric oxide, improving workout performance.",
        },
        {
          name: "Lipo+ (IM Injection)",
          why: "A lipotropic blend that supports liver function and promotes the breakdown of fat.",
        },
        {
          name: "Hydroxocobalamin (B12)",
          why: "Boosts energy levels and supports a healthy metabolism.",
        },
      ],
    },
    Recovery: {
      name: "Recovery",
      emoji: "💪",
      tagline: "Bounce back faster",
      desc: "Also known as the Myers Cocktail — the gold standard recovery drip. Whether you're dealing with stress, soreness, or feeling run down, this classic formula helps restore balance.",
      vitamins: [
        {
          name: "Vitamin C",
          why: "Reduces oxidative stress from intense activity and supports tissue repair.",
        },
        {
          name: "Hydroxocobalamin (B12)",
          why: "Restores energy levels and supports neurological recovery.",
        },
        {
          name: "Vita-Complex",
          why: "B vitamins support muscle repair and nervous system recovery.",
        },
        {
          name: "Mineral Blend",
          why: "Replenishes electrolytes and minerals depleted by stress, exercise, and illness.",
        },
      ],
    },
    "Gut Health": {
      name: "Gut Health",
      emoji: "🌿",
      tagline: "Heal from the inside out",
      desc: "Your gut is your second brain. This drip combines amino acids, lysine, and key vitamins to reduce inflammation, support gut lining repair, and restore digestive balance.",
      vitamins: [
        {
          name: "Lysine",
          why: "An essential amino acid that supports tissue repair and helps maintain the integrity of the gut lining.",
        },
        {
          name: "Amino Blend",
          why: "Provides the building blocks for gut tissue repair and supports healthy digestive function.",
        },
        {
          name: "Magnesium Chloride",
          why: "Helps relax intestinal muscles, reduce cramping, and support regular bowel function.",
        },
        {
          name: "Vitamin C",
          why: "Reduces gut inflammation and supports immune cells in the digestive tract.",
        },
      ],
    },
    "Pain & Inflammation": {
      name: "Pain & Inflammation",
      emoji: "🩹",
      tagline: "Cool the fire within",
      desc: "Chronic pain and inflammation drain your body. This powerful drip uses EDTA, ALA, and Magnesium to target inflammation at the cellular level and provide real relief.",
      vitamins: [
        {
          name: "EDTA",
          why: "A chelating agent that binds to heavy metals and inflammatory compounds, helping remove them from the body.",
        },
        {
          name: "Alpha Lipoic Acid (ALA)",
          why: "A potent antioxidant that neutralizes free radicals and reduces nerve and joint inflammation.",
        },
        {
          name: "Magnesium Chloride",
          why: "Helps relax muscles, reduce nerve sensitivity, and lower systemic inflammation.",
        },
      ],
    },
    Stress: {
      name: "Stress",
      emoji: "🧘",
      tagline: "Find your calm",
      desc: "When stress takes over, your magnesium levels plummet. This focused drip delivers high-dose magnesium to calm your nervous system, relax your muscles, and restore your sense of balance.",
      vitamins: [
        {
          name: "Magnesium Chloride (high dose)",
          why: "Magnesium is nature's relaxant — it regulates neurotransmitters, calms the nervous system, and supports deep, restorative sleep. Most stressed people are severely deficient.",
        },
      ],
    },
    Detox: {
      name: "Detox",
      emoji: "🌊",
      tagline: "Cleanse and reset",
      desc: "In a world full of toxins, your body needs help clearing them out. This drip uses EDTA to chelate heavy metals, followed by a Glutathione push — the master antioxidant — to neutralize what's left.",
      vitamins: [
        {
          name: "EDTA",
          why: "Binds to heavy metals and toxins in the bloodstream so they can be safely eliminated.",
        },
        {
          name: "Hydroxocobalamin (B12)",
          why: "Supports cellular repair and protects nerves from toxin-related damage.",
        },
        {
          name: "Glutathione Push (post)",
          why: "The body's master antioxidant — neutralizes free radicals and supports liver detoxification.",
        },
      ],
    },
    NAD: {
      name: "NAD",
      emoji: "🔬",
      tagline: "Turn back the clock",
      desc: "NAD+ is the molecule of longevity. Your answers suggest your body needs deep cellular repair and energy restoration. NAD+ supports mitochondrial function, DNA repair, and cognitive clarity.",
      vitamins: [
        {
          name: "NAD+ (250–750mg)",
          why: "Fuels over 500 enzymatic reactions in the body. Declines with age — replenishing it supports energy, brain function, cellular repair, and longevity.",
        },
      ],
    },
    Brain: {
      name: "Brain",
      emoji: "🧠",
      tagline: "Unlock mental clarity",
      desc: "If your brain feels foggy, slow, or scattered, this drip may be exactly what you need. Phosphatidylcholine is a key component of cell membranes and plays a critical role in cognitive function and memory.",
      vitamins: [
        {
          name: "Phosphatidylcholine (PC)",
          why: "A major building block of brain cell membranes. Supports memory, focus, and neurological repair. Essential for acetylcholine production — your brain's primary learning neurotransmitter.",
        },
      ],
    },
    "Methylene Blue": {
      name: "Methylene Blue",
      emoji: "💙",
      tagline: "Power your mitochondria",
      desc: "Methylene Blue is one of the most cutting-edge tools in cognitive and energy optimization. It works directly at the mitochondrial level to enhance energy production and protect brain cells.",
      vitamins: [
        {
          name: "Methylene Blue (10–20mg)",
          why: "Acts as an electron carrier in the mitochondrial energy chain, enhancing ATP production. Also has neuroprotective properties and may improve memory and mental performance.",
        },
      ],
    },
  },
  extras: {
    bloodwork: {
      icon: "🩸",
      title: "Check Your Hormone Levels",
      text: "Fatigue is often a sign of hormonal imbalance. We recommend getting bloodwork done to check your hormone levels. Ask a staff member today.",
    },
    supplements: {
      icon: "💊",
      title: "Consider These Supplements",
      text: "Ashwagandha and Calm (magnesium supplement) are both well-researched for stress and anxiety relief. Ask a staff member for more details.",
    },
    aesthetic: {
      icon: "💆",
      title: "Book an Aesthetic Consult",
      text: "Katie and Anastasia are our aesthetic specialists. Schedule a complimentary consultation to learn about our facials, microneedling, and more.",
    },
    peptides: {
      icon: "🧬",
      title: "Explore Peptide Therapy",
      text: "Peptides can significantly accelerate recovery and reduce inflammation. Ask a staff member today to learn if peptide therapy is right for you.",
    },
    glp1: {
      icon: "⚖️",
      title: "Ask About GLP-1s",
      text: "GLP-1 medications can be a powerful tool for sustainable weight loss. Ask for Heather today to learn more about our GLP-1 program.",
    },
  },
};
