import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";

const navLinkClassName =
  "group inline-flex items-center gap-1.5 font-medium text-turquoise transition-colors hover:text-fg";

const iconMotionClass = "shrink-0 transition-transform duration-200 ease-out";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  withArrow?: boolean;
  leadingArrow?: boolean;
  leadingPencil?: boolean;
  iconSizeClass?: string;
};

export function NavLink({
  children,
  className,
  withArrow = false,
  leadingArrow = false,
  leadingPencil = false,
  iconSizeClass = "size-4",
  ...props
}: NavLinkProps) {
  const showTrailing = withArrow && !leadingArrow && !leadingPencil;

  return (
    <Link {...props} className={[navLinkClassName, className].filter(Boolean).join(" ")}>
      {leadingArrow ? (
        <ArrowLeft
          aria-hidden="true"
          className={`${iconMotionClass} ${iconSizeClass} group-hover:-translate-x-0.5`}
        />
      ) : null}
      {leadingPencil ? (
        <Pencil
          aria-hidden="true"
          className={`${iconMotionClass} ${iconSizeClass} group-hover:-rotate-6`}
        />
      ) : null}
      {children}
      {showTrailing ? (
        <ArrowRight
          aria-hidden="true"
          className={`${iconMotionClass} ${iconSizeClass} group-hover:translate-x-0.5`}
        />
      ) : null}
    </Link>
  );
}
