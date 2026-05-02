"use client";

import { motion } from "motion/react";

import { SECTION_OVERLINE_NO_RULE } from "@/lib/section-label";
import type { DetailItem as ProjectTechUsageItem } from "@/types/project-detail";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

type ProjectTechUsageListProps = {
  items: ProjectTechUsageItem[];
};

/** Bordered blocks for how each technology was used (same layout as generic detail lists). */
export function ProjectTechUsageList({ items }: ProjectTechUsageListProps) {
  return (
    <ul className="m-0 list-none space-y-10 p-0 md:space-y-11">
      {items.map((item, i) => (
        <motion.li
          key={`${item.name}-${i}`}
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.04 * Math.min(i, 8) }}
          className="border-l border-turquoise/60 pl-6 md:pl-9"
        >
          <h3 className={`${SECTION_OVERLINE_NO_RULE} mt-0 max-w-none`}>{item.name}</h3>
          <p className="mt-3 max-w-[65ch] text-pretty leading-[var(--leading-relaxed)] text-fg-muted">
            {item.usage}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}
