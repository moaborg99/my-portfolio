import type { TechStackGroup } from "@/types/tech-stack";
import { TechGroup } from "./TechGroup";

type TechStackProps = {
  groups: TechStackGroup[];
};

export function TechStack({ groups }: TechStackProps) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <TechGroup key={group.title} title={group.title} skills={group.skills} />
      ))}
    </div>
  );
}
