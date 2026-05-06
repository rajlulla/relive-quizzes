import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = "", width = 180, height = 52 }: LogoProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Image
        src="/relive-logo.svg"
        alt="Relive Health"
        width={width}
        height={height}
        priority
        className="h-[52px] w-auto"
      />
    </div>
  );
}
