import type { TechStackSkill } from "@/types/tech-stack";
import { getTechPillVariantByGroup } from "@/lib/tech-pill-variant";
import { TechPill } from "./TechPill";

const groupTitleClassName = "text-xs font-semibold uppercase tracking-[0.2em] text-turquoise";
const listClassName = "mt-4 flex list-none flex-wrap gap-4 space-y-2 p-0";

type TechGroupProps = {
  title: string;
  skills: TechStackSkill[];
};

export function TechGroup({ title, skills }: TechGroupProps) {
  const variant = getTechPillVariantByGroup(title);

  return (
    <div>
      <h3 className={groupTitleClassName}>{title}</h3>
      <ul className={listClassName}>
        {skills.map((skill) => (
          <li key={skill.slug}>
            <TechPill variant={variant}>{skill.name}</TechPill>
          </li>
        ))}
      </ul>
    </div>
  );
}
