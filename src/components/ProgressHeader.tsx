interface ProgressHeaderProps {
  current: number;
  total: number;
}

export function ProgressHeader({ current, total }: ProgressHeaderProps) {
  const fraction = total > 0 ? current / total : 0;
  const percent = Math.round(fraction * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13px] font-medium text-brand-muted">
          Question {current + 1} of {total}
        </span>
        <span className="text-[13px] font-semibold text-brand-cyan">
          {percent}%
        </span>
      </div>
      <div className="h-[5px] w-full overflow-hidden rounded-full bg-brand-border">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-cyan-dark transition-[width] duration-[400ms] ease-in-out"
          style={{ width: `${percent}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
