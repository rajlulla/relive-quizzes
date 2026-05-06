import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { QuizRunner } from "@/components/QuizRunner";
import { ivDripQuiz } from "@/content/iv-drip";

export const metadata: Metadata = {
  title: ivDripQuiz.metaTitle,
  description: ivDripQuiz.metaDescription,
};

export default function IVDripPage() {
  return (
    <PageShell>
      <QuizRunner quiz={ivDripQuiz} />
    </PageShell>
  );
}
