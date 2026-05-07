"use client";

import { useMemo, useState } from "react";
import type {
  Answers,
  CountTierQuiz,
  Quiz,
  TopTagQuiz,
} from "@/lib/quiz/types";
import {
  evaluateCountTier,
  getExtraKeys,
  getRecommendationKey,
  summarizeResult,
} from "@/lib/quiz/scoring";
import { ProgressHeader } from "./ProgressHeader";
import { LeadCaptureCard } from "./LeadCaptureCard";
import { RestartLink } from "./RestartLink";

type Stage = "intro" | "quiz" | "leadCapture" | "result";

interface QuizRunnerProps {
  quiz: Quiz;
}

export function QuizRunner({ quiz }: QuizRunnerProps) {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const start = () => {
    setAnswers({});
    setCurrentIndex(0);
    setStage("quiz");
  };

  const restart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setStage("intro");
  };

  const submitAnswer = (yes: boolean) => {
    const next: Answers = { ...answers, [currentIndex]: yes };
    setAnswers(next);
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setStage(quiz.captureLead ? "leadCapture" : "result");
    }
  };

  const leadPayload = useMemo(() => {
    if (!quiz.captureLead) return null;
    const summary = summarizeResult(quiz, answers);
    return {
      quizSlug: quiz.slug,
      timestamp: new Date().toISOString(),
      answers,
      ...summary,
    };
  }, [quiz, answers]);

  return (
    <div key={stage} className="brand-fade-in">
      {stage === "intro" && <IntroCard quiz={quiz} onStart={start} />}
      {stage === "quiz" && (
        <QuizCard
          quiz={quiz}
          currentIndex={currentIndex}
          onAnswer={submitAnswer}
          onRestart={restart}
        />
      )}
      {stage === "leadCapture" && leadPayload && (
        <LeadCaptureCard
          payload={leadPayload}
          onSubmitted={() => setStage("result")}
          onRestart={restart}
        />
      )}
      {stage === "result" &&
        (quiz.scoring === "top-tag" ? (
          <TopTagResultCard
            quiz={quiz}
            answers={answers}
            onRestart={restart}
          />
        ) : (
          <CountTierResultCard
            quiz={quiz}
            answers={answers}
            onRestart={restart}
          />
        ))}
    </div>
  );
}

/* ─── Intro ───────────────────────────────────────────────────────────── */

function IntroCard({ quiz, onStart }: { quiz: Quiz; onStart: () => void }) {
  return (
    <div className="brand-card px-8 py-10 sm:px-12 sm:py-12">
      <div className="mb-4 text-center text-[52px] leading-none">
        {quiz.introEmoji}
      </div>
      <h1 className="mb-3 text-center font-serif text-[34px] leading-[1.15] text-brand-slate sm:text-[40px]">
        {quiz.title.lead}
        <br />
        <span className="italic text-brand-cyan">{quiz.title.accent}</span>
      </h1>
      <p className="mx-auto mb-9 max-w-[40ch] text-center text-[16px] leading-[1.6] text-brand-muted">
        {quiz.subtitle}
      </p>
      <button type="button" onClick={onStart} className="brand-cta-pill w-full">
        Let&rsquo;s Get Started →
      </button>
      <style jsx>{`
        .brand-cta-pill {
          background: var(--brand-cyan);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 18px 52px;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 0.3px;
          font-family: inherit;
          cursor: pointer;
          box-shadow: var(--brand-cta-shadow-lg);
          transition: transform 0.18s ease, box-shadow 0.18s ease,
            background 0.18s ease;
        }
        .brand-cta-pill:hover {
          background: var(--brand-cyan-deep);
          transform: translateY(-2px);
          box-shadow: var(--brand-cta-shadow-hover);
        }
        .brand-cta-pill:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

/* ─── Quiz ────────────────────────────────────────────────────────────── */

function QuizCard({
  quiz,
  currentIndex,
  onAnswer,
  onRestart,
}: {
  quiz: Quiz;
  currentIndex: number;
  onAnswer: (yes: boolean) => void;
  onRestart: () => void;
}) {
  const q = quiz.questions[currentIndex];
  const sectionLabel =
    q.section &&
    quiz.scoring === "count-tier" &&
    quiz.sections?.find((s) => s.key === q.section)?.label;

  return (
    <div className="brand-card px-8 py-10 sm:px-12 sm:py-12">
      <ProgressHeader current={currentIndex} total={quiz.questions.length} />
      <div key={currentIndex} className="brand-fade-in">
        {sectionLabel && (
          <div className="section-label mb-3 text-center text-brand-cyan">
            {sectionLabel}
          </div>
        )}
        {q.emoji && (
          <div className="mb-5 text-center text-[42px] leading-none">
            {q.emoji}
          </div>
        )}
        <p className="mx-auto mb-2 max-w-[36ch] text-center font-serif text-[24px] leading-[1.4] text-brand-slate">
          {q.text}
        </p>
        {q.hint && (
          <p className="mx-auto mb-8 max-w-[40ch] text-center text-[14px] italic leading-[1.5] text-brand-muted">
            {q.hint}
          </p>
        )}
        {!q.hint && <div className="mb-9" />}
      </div>
      <div className="flex gap-3.5">
        <button
          type="button"
          onClick={() => onAnswer(true)}
          className="answer-btn answer-yes"
        >
          ✓ Yes
        </button>
        <button
          type="button"
          onClick={() => onAnswer(false)}
          className="answer-btn answer-no"
        >
          ✗ No
        </button>
      </div>
      <RestartLink onClick={onRestart} />

      <style jsx>{`
        .answer-btn {
          flex: 1;
          padding: 18px;
          border-radius: 14px;
          font-family: inherit;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.18s ease;
        }
        .answer-yes {
          background: var(--brand-cyan);
          color: white;
          border-color: var(--brand-cyan);
          box-shadow: var(--brand-cta-shadow);
        }
        .answer-yes:hover {
          background: var(--brand-cyan-deep);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 181, 204, 0.4);
        }
        .answer-no {
          background: white;
          color: var(--brand-slate);
          border-color: var(--brand-border);
        }
        .answer-no:hover {
          border-color: var(--brand-slate-light);
          background: var(--brand-extra-hover);
          transform: translateY(-2px);
        }
        .answer-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

/* ─── Result: top-tag (IV Drip) ──────────────────────────────────────── */

function TopTagResultCard({
  quiz,
  answers,
  onRestart,
}: {
  quiz: TopTagQuiz;
  answers: Answers;
  onRestart: () => void;
}) {
  const resultKey = useMemo(
    () => getRecommendationKey(quiz, answers),
    [quiz, answers],
  );
  const result = quiz.results[resultKey] ?? quiz.results[quiz.fallbackResult];
  const extraKeys = useMemo(() => getExtraKeys(quiz, answers), [quiz, answers]);
  const extras = extraKeys
    .map((k) => quiz.extras?.[k])
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <div className="brand-card px-8 py-9 sm:px-12 sm:py-10">
      <header className="mb-7 text-center">
        <span className="pill-badge mb-4">
          {result.badge ?? "Your Recommendation"}
        </span>
        <div className="mb-2.5 text-[52px] leading-none">{result.emoji}</div>
        <h2 className="mb-1.5 font-serif text-[34px] leading-tight text-brand-slate">
          {result.name}
        </h2>
        <p className="mb-3.5 text-[15px] font-medium italic text-brand-cyan">
          {result.tagline}
        </p>
        <p className="mx-auto max-w-[44ch] text-[15px] leading-[1.7] text-brand-result-desc">
          {result.desc}
        </p>
      </header>

      {result.vitamins && result.vitamins.length > 0 && (
        <>
          <div className="my-6 h-px bg-brand-border" />
          <div className="section-label mb-4">
            {result.vitaminsLabel ?? "Why These Help You"}
          </div>
          <ul className="space-y-3.5">
            {result.vitamins.map((v) => (
              <li key={v.name} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-cyan"
                />
                <div>
                  <div className="text-[14px] font-semibold text-brand-slate">
                    {v.name}
                  </div>
                  <div className="text-[13px] leading-[1.6] text-brand-muted">
                    {v.why}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {extras.length > 0 && (
        <>
          <div className="my-6 h-px bg-brand-border" />
          <div className="section-label mb-4">Also Recommended For You</div>
          <div className="space-y-2.5">
            {extras.map((e) => (
              <div
                key={e.title}
                className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-bg px-4 py-3.5"
              >
                <span aria-hidden className="mt-0.5 text-[20px] leading-none">
                  {e.icon}
                </span>
                <div>
                  <div className="text-[14px] font-semibold text-brand-slate">
                    {e.title}
                  </div>
                  <div className="text-[13px] leading-[1.55] text-brand-muted">
                    {e.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <RestartButton onClick={onRestart} />
    </div>
  );
}

/* ─── Result: count-tier (bloodwork) ─────────────────────────────────── */

function CountTierResultCard({
  quiz,
  answers,
  onRestart,
}: {
  quiz: CountTierQuiz;
  answers: Answers;
  onRestart: () => void;
}) {
  const { yesCount, tier, biomarkers } = useMemo(
    () => evaluateCountTier(quiz, answers),
    [quiz, answers],
  );
  const cta = quiz.cta;
  const phoneHref = `tel:${cta.providerPhone.replace(/[^0-9+]/g, "")}`;
  const ctaHref = cta.href ?? phoneHref;

  return (
    <div className="brand-card px-8 py-9 sm:px-12 sm:py-10">
      <header className="mb-7 text-center">
        <span className="pill-badge mb-4">{tier.label}</span>
        <div className="mb-2.5 text-[52px] leading-none">{tier.emoji}</div>
        <h2 className="mb-2 font-serif text-[30px] leading-tight text-brand-slate sm:text-[34px]">
          {tier.headline}
        </h2>
        <p className="mb-3 text-[14px] font-medium italic text-brand-cyan">
          {yesCount} of {quiz.questions.length} signals noted
        </p>
        <p className="mx-auto max-w-[44ch] text-[15px] leading-[1.7] text-brand-result-desc">
          {tier.description}
        </p>
      </header>

      {biomarkers.length > 0 && (
        <>
          <div className="my-6 h-px bg-brand-border" />
          <div className="section-label mb-4">
            {quiz.biomarkersLabel ?? "Biomarkers Worth Checking"}
          </div>
          <ul className="space-y-3.5">
            {biomarkers.map((b) => (
              <li key={b.name} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-cyan"
                />
                <div>
                  <div className="text-[14px] font-semibold text-brand-slate">
                    {b.name}
                  </div>
                  <div className="text-[13px] leading-[1.6] text-brand-muted">
                    {b.why}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="my-6 h-px bg-brand-border" />

      <div className="rounded-2xl border border-brand-border bg-brand-bg p-5 sm:p-6">
        <h3 className="mb-2 font-serif text-[22px] leading-tight text-brand-slate">
          {cta.title}
        </h3>
        <p className="mb-4 text-[14px] leading-[1.6] text-brand-result-desc">
          {cta.body}
        </p>
        <a
          href={ctaHref}
          className="brand-cta-block block w-full text-center"
        >
          {cta.buttonLabel ?? "Book Bloodwork"} →
        </a>
        <div className="mt-4 text-[13px] leading-[1.5] text-brand-muted">
          <div className="font-semibold text-brand-slate">
            {cta.providerName}
            {cta.providerCredential && (
              <span className="font-normal text-brand-muted">
                {" "}
                · {cta.providerCredential}
              </span>
            )}
          </div>
          <a
            href={phoneHref}
            className="text-brand-cyan hover:underline"
          >
            {cta.providerPhone}
          </a>
          {cta.providerAddress && (
            <div className="text-brand-muted">{cta.providerAddress}</div>
          )}
        </div>
      </div>

      <RestartButton onClick={onRestart} />

      <style jsx>{`
        .brand-cta-block {
          background: var(--brand-cyan);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px 22px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer;
          text-decoration: none;
          box-shadow: var(--brand-cta-shadow);
          transition: transform 0.18s ease, box-shadow 0.18s ease,
            background 0.18s ease;
        }
        .brand-cta-block:hover {
          background: var(--brand-cyan-deep);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 181, 204, 0.4);
        }
        .brand-cta-block:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

/* ─── Shared ──────────────────────────────────────────────────────────── */

/**
 * Full-width muted button. Used at the bottom of the result card as the
 * primary "I'm done" affordance.
 */
function RestartButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <button type="button" onClick={onClick} className="restart-btn mt-7 w-full">
        Start Over
      </button>
      <style jsx>{`
        .restart-btn {
          background: white;
          color: var(--brand-muted);
          border: 1px solid var(--brand-border);
          border-radius: 12px;
          padding: 17px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .restart-btn:hover {
          border-color: var(--brand-slate-light);
          color: var(--brand-slate);
        }
      `}</style>
    </>
  );
}

