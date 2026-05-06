import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

interface PageShellProps {
  /** When true (default), the logo links back to "/". */
  logoLink?: boolean;
  children: ReactNode;
}

export function PageShell({ logoLink = true, children }: PageShellProps) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12 sm:py-16">
      <div className="w-full max-w-[620px]">
        <div className="mb-7">
          {logoLink ? (
            <Link href="/" aria-label="Relive Health home">
              <Logo />
            </Link>
          ) : (
            <Logo />
          )}
        </div>
        {children}
      </div>
    </main>
  );
}
