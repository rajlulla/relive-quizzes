/**
 * Subtle inline link rendered mid-flow (under quiz answer buttons,
 * under the phone-capture input). Visually de-emphasized so it doesn't
 * compete with the primary action; centered to feel like a footer.
 */
export function RestartLink({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-5 text-center">
      <button
        type="button"
        onClick={onClick}
        className="text-[13px] font-medium text-brand-muted underline-offset-4 transition-colors hover:text-brand-slate hover:underline"
      >
        Start Over
      </button>
    </div>
  );
}
