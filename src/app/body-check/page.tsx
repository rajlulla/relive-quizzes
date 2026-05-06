import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { QuizRunner } from "@/components/QuizRunner";
import { bodyCheckQuiz } from "@/content/body-check";

export const metadata: Metadata = {
  title: bodyCheckQuiz.metaTitle,
  description: bodyCheckQuiz.metaDescription,
};

export default function BodyCheckPage() {
  return (
    <PageShell>
      <QuizRunner quiz={bodyCheckQuiz} />
    </PageShell>
  );
}
