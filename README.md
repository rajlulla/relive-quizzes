# Relive Health Quizzes

Personalized recommendation quizzes for Relive Health — built on Next.js with the App Router, deployed on Vercel.

Live quizzes:

- **`/iv-drip`** — Find Your Perfect IV Drip (8 questions, 12 drip results)

## Tech stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 (CSS-variables-based theme tokens in `globals.css`)
- DM Sans + DM Serif Display via `next/font/google`
- Static, no backend, no analytics, no tracking

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Adding a new quiz

The whole site is a single quiz engine driven by typed content. To add a new quiz:

1. **Author the content.** Create `src/content/<slug>.ts` and export a `Quiz`:

   ```ts
   import type { Quiz } from "@/lib/quiz/types";

   export const myNewQuiz: Quiz = {
     slug: "my-new-quiz",
     title: { lead: "Discover Your", accent: "Match" },
     subtitle: "Answer a few quick questions and we'll personalize a recommendation.",
     introEmoji: "🌟",
     shortDescription: "One-line tile copy for the landing page.",
     landingEmoji: "🌟",
     metaTitle: "Discover Your Match | Relive Health",
     metaDescription: "...",
     fallbackResult: "Default Result Key",
     questions: [
       /* { text, emoji, tags: [resultKey, ...], extras: [extraKey, ...] } */
     ],
     results: {
       /* "Result Key": { name, emoji, tagline, desc, vitamins?: [...] } */
     },
     extras: {
       /* "extraKey": { icon, title, text } */
     },
   };
   ```

2. **Register it.** Add the import + entry in `src/content/registry.ts`:

   ```ts
   import { myNewQuiz } from "./my-new-quiz";
   export const quizzes: Quiz[] = [ivDripQuiz, myNewQuiz];
   ```

3. **Create the route.** `src/app/<slug>/page.tsx`:

   ```tsx
   import type { Metadata } from "next";
   import { PageShell } from "@/components/PageShell";
   import { QuizRunner } from "@/components/QuizRunner";
   import { myNewQuiz } from "@/content/my-new-quiz";

   export const metadata: Metadata = {
     title: myNewQuiz.metaTitle,
     description: myNewQuiz.metaDescription,
   };

   export default function Page() {
     return (
       <PageShell>
         <QuizRunner quiz={myNewQuiz} />
       </PageShell>
     );
   }
   ```

That's it — no engine code to touch.

## Scoring rules (preserved from the original IV-quiz reference)

- Each Yes answer adds +1 to every tag listed on that question.
- Highest-scoring tag wins. **Ties resolve by the order tags were first encountered** while walking Yes-answered questions in question order — same stable behavior as `Object.entries(...).sort(...)` in the source HTML.
- If no questions are answered Yes, `fallbackResult` is returned.
- Extras are deduplicated and listed in question order.

## Design system

Tokens live as CSS variables in `src/app/globals.css` and are surfaced to Tailwind via the `@theme` block, so utilities like `bg-brand-cyan` and `text-brand-slate` are available everywhere.

| Token | Hex |
|---|---|
| `brand-cyan` | `#00B5CC` |
| `brand-cyan-dark` | `#008FA8` |
| `brand-slate` | `#3D5A6E` |
| `brand-bg` | `#F0F5F8` |
| `brand-muted` | `#7A95A8` |
| `brand-border` | `#DDE8EF` |

## Deploying to Vercel

1. Push this repo to GitHub:

   ```bash
   git remote add origin git@github.com:<you>/relive-quizzes.git
   git push -u origin main
   ```

2. In Vercel: **Add New Project** → import the GitHub repo → accept defaults (framework auto-detected as Next.js, no env vars needed) → **Deploy**.

3. Optional: attach a custom domain (e.g. `quiz.relivehealth.com`) in the Vercel project's **Settings → Domains**.

No build-time configuration is required — `next build` works out of the box.
