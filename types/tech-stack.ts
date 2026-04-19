export type TechStackSkill = {
  name: string;
  slug: string;
};

export type TechStackGroup = {
  title: string;
  skills: TechStackSkill[];
};
