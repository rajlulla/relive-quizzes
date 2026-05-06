import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { quizzes } from "@/content/registry";

export default function HomePage() {
  return (
    <PageShell logoLink={false}>
      <div className="brand-card px-8 py-10 sm:px-12 sm:py-12">
        <div className="mb-4 text-center text-[52px] leading-none">✨</div>
        <h1 className="mb-3 text-center font-serif text-[34px] leading-[1.15] text-brand-slate sm:text-[40px]">
          Find What Your{" "}
          <span className="italic text-brand-cyan">Body Needs</span>
        </h1>
        <p className="mx-auto mb-9 max-w-[36ch] text-center text-[16px] leading-[1.6] text-brand-muted">
          Quick, personalized recommendations from Relive Health. Pick a quiz
          below and we&rsquo;ll point you to what fits.
        </p>
        <ul className="space-y-3">
          {quizzes.map((q) => (
            <li key={q.slug}>
              <Link
                href={`/${q.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-bg px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-slate-light hover:bg-white hover:shadow-[0_8px_24px_rgba(0,181,204,0.15)]"
              >
                <span aria-hidden className="text-[32px] leading-none">
                  {q.landingEmoji}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-[22px] text-brand-slate">
                      {q.title.lead}{" "}
                      <span className="italic text-brand-cyan">
                        {q.title.accent}
                      </span>
                    </span>
                  </div>
                  <p className="mt-1 text-[14px] leading-[1.5] text-brand-muted">
                    {q.shortDescription}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="self-center text-brand-cyan transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
          {quizzes.length === 0 && (
            <li className="text-center text-brand-muted">
              No quizzes yet. Check back soon.
            </li>
          )}
        </ul>
      </div>
    </PageShell>
  );
}
