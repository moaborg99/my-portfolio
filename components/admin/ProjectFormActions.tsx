"use client";

import Link from "next/link";

import { buttonClassName } from "@/components/ui/Button";

type ProjectFormActionsProps = {
  pending: boolean;
  submitLabel: string;
  pendingLabel: string;
};

export function ProjectFormActions({ pending, submitLabel, pendingLabel }: ProjectFormActionsProps) {
  return (
    <div className="flex flex-wrap justify-end gap-3">
      <Link href="/admin" className={buttonClassName("secondary")}>
        Avbryt
      </Link>
      <button
        type="submit"
        disabled={pending}
        className={[buttonClassName("primary"), pending ? "opacity-50" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </div>
  );
}
