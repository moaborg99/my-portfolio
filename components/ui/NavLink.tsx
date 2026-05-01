import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const navLinkClassName =
  "group inline-flex items-center gap-1.5 font-medium text-turquoise transition-colors hover:text-fg";

const arrowSharedClass = "shrink-0 transition-transform duration-200 ease-out size-4";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  withArrow?: boolean;
  leadingArrow?: boolean;
};

export function NavLink({
  children,
  className,
  withArrow = false,
  leadingArrow = false,
  ...props
}: NavLinkProps) {
  const showTrailing = withArrow && !leadingArrow;

  return (
    <Link {...props} className={[navLinkClassName, className].filter(Boolean).join(" ")}>
      {leadingArrow ? (
        <ArrowLeft
          aria-hidden="true"
          className={`${arrowSharedClass} group-hover:-translate-x-0.5`}
        />
      ) : null}
      {children}
      {showTrailing ? (
        <ArrowRight
          aria-hidden="true"
          className={`${arrowSharedClass} group-hover:translate-x-0.5`}
        />
      ) : null}
    </Link>
  );
}
