import type { TechStackSkill } from "@/types/tech-stack";
import { TechPill } from "./TechPill";

const groupTitleClassName = "text-xs font-semibold uppercase tracking-[0.2em] text-turquoise";

const listClassName = "mt-4 flex list-none flex-wrap gap-4 space-y-2 p-0";

type TechGroupProps = {
  title: string;
  skills: TechStackSkill[];
};

export function TechGroup({ title, skills }: TechGroupProps) {
  return (
    <div>
      <h3 className={groupTitleClassName}>{title}</h3>
      <ul className={listClassName}>
        {skills.map((skill) => (
          <li key={skill.slug}>
            <TechPill>{skill.name}</TechPill>
          </li>
        ))}
      </ul>
    </div>
  );
}
