import type { HTMLAttributes, ReactNode } from "react";

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "article" | "div" | "section";
  accent?: boolean;
  interactive?: boolean;
};

export function Surface({
  children,
  as = "article",
  accent = false,
  interactive = false,
  className = "",
  ...props
}: SurfaceProps) {
  const Component = as;

  return (
    <Component
      className={`ui-surface${accent ? " ui-surface--accent" : ""}${interactive ? " ui-surface--interactive" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
