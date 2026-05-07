"use client";

import { useEffect, useRef, useState } from "react";
import { formatPhone, isValidPhone, normalizePhone } from "@/lib/phone";
import { RestartLink } from "./RestartLink";

interface LeadCaptureCardProps {
  /** Called once the user submits a valid phone (after the API call resolves,
   *  even if the API call failed — we never block result reveal). */
  onSubmitted: (normalizedPhone: string) => void;
  /** Mid-flow restart — clears answers + sends user back to intro. */
  onRestart: () => void;
  /** POSTed alongside the phone number for storage. */
  payload: Record<string, unknown>;
}

export function LeadCaptureCard({
  onSubmitted,
  onRestart,
  payload,
}: LeadCaptureCardProps) {
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatted = formatPhone(raw);
  const valid = isValidPhone(formatted);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaw(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);

    const normalized = normalizePhone(formatted);

    try {
      // Best-effort POST. If the sink is unreachable we still proceed —
      // the user shouldn't pay for our outage. The result remains visible.
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, phone: normalized }),
      }).catch(() => null);
    } finally {
      onSubmitted(normalized);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="brand-card px-8 py-10 sm:px-12 sm:py-12"
      noValidate
    >
      <div className="mb-4 text-center text-[52px] leading-none">📱</div>
      <h2 className="mb-3 text-center font-serif text-[30px] leading-[1.2] text-brand-slate sm:text-[34px]">
        Almost done — what&rsquo;s your{" "}
        <span className="italic text-brand-cyan">phone number?</span>
      </h2>
      <p className="mx-auto mb-8 max-w-[38ch] text-center text-[15px] leading-[1.6] text-brand-muted">
        We&rsquo;ll show your results on the next screen.
      </p>

      <label htmlFor="phone" className="block">
        <span className="section-label mb-2 block">Phone number</span>
        <input
          ref={inputRef}
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(973) 555-1234"
          value={formatted}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "phone-error" : undefined}
          className="w-full rounded-2xl border border-brand-border bg-white px-5 py-4 text-[20px] font-medium text-brand-slate placeholder:text-brand-muted/60 outline-none transition-colors focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/15"
        />
        {error && (
          <span
            id="phone-error"
            role="alert"
            className="mt-2 block text-[13px] font-medium text-red-600"
          >
            {error}
          </span>
        )}
      </label>

      <button
        type="submit"
        disabled={!valid || submitting}
        className="brand-cta-pill mt-6 w-full"
      >
        {submitting ? "Showing your results…" : "See My Results →"}
      </button>

      <RestartLink onClick={onRestart} />

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
            background 0.18s ease, opacity 0.18s ease;
        }
        .brand-cta-pill:hover:not(:disabled) {
          background: var(--brand-cyan-deep);
          transform: translateY(-2px);
          box-shadow: var(--brand-cta-shadow-hover);
        }
        .brand-cta-pill:active:not(:disabled) {
          transform: translateY(0);
        }
        .brand-cta-pill:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
}
