import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";

const navLinkClassName =
  "group inline-flex items-center gap-1.5 font-medium text-turquoise transition-colors hover:text-fg";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  withArrow?: boolean;
};

export function NavLink({ children, className, withArrow = false, ...props }: NavLinkProps) {
  return (
    <Link {...props} className={[navLinkClassName, className].filter(Boolean).join(" ")}>
      {children}
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          size={16}
          className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      ) : null}
    </Link>
  );
}
