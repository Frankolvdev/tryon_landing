import Link from "next/link";

type BrandProps = {
  compact?: boolean;
  className?: string;
};

export function Brand({ compact = false, className = "" }: BrandProps) {
  return (
    <Link
      className={`brand ${compact ? "brand--compact" : ""} ${className}`.trim()}
      href="/#top"
      aria-label="TRYON, ir al inicio"
    >
      <span>TRY</span>
      <strong>ON</strong>
      <small>AI VIRTUAL TRY-ON</small>
    </Link>
  );
}
