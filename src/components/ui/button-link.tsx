import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "default" | "large";
  icon?: ReactNode;
};

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  size = "default",
  icon,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`.trim()}
      {...props}
    >
      <span>{children}</span>
      {icon ? <span className="ui-button__icon" aria-hidden="true">{icon}</span> : null}
    </a>
  );
}
