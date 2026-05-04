/** Max rows per repeater (tech / learnings) to avoid abusive payloads. */
export const MAX_PROJECT_DETAIL_REPEATER_ROWS = 6;

function getTrimmed(formData: FormData, key: string): string {
  const v = formData.get(key);
  if (v === null || typeof v !== "string") return "";
  return v.trim();
}

export type ParsedRepeaterPairs =
  | {
      ok: true;
      techUsageItems: { techName: string; usage: string }[];
      learningItems: { title: string; description: string }[];
    }
  | { ok: false; fieldErrors: Record<string, string[]> };

export function parseProjectDetailRepeaterFields(formData: FormData): ParsedRepeaterPairs {
  const fieldErrors: Record<string, string[]> = {};
  const techUsageItems: { techName: string; usage: string }[] = [];
  const learningItems: { title: string; description: string }[] = [];

  let ti = 0;
  while (formData.has(`tu_${ti}_techName`) || formData.has(`tu_${ti}_usage`)) {
    if (ti >= MAX_PROJECT_DETAIL_REPEATER_ROWS) {
      fieldErrors["_techRepeater"] = [
        `At most ${MAX_PROJECT_DETAIL_REPEATER_ROWS} technology rows allowed.`,
      ];
      break;
    }
    const tn = `tu_${ti}_techName`;
    const tu = `tu_${ti}_usage`;
    const techName = getTrimmed(formData, tn);
    const usage = getTrimmed(formData, tu);

    if (techName === "" && usage === "") {
      ti += 1;
      continue;
    }
    if (techName === "" || usage === "") {
      if (techName === "") fieldErrors[tn] = ["Technology name required when usage is filled."];
      if (usage === "")
        fieldErrors[tu] = ["Usage description required when technology name is filled."];
      ti += 1;
      continue;
    }
    techUsageItems.push({ techName, usage });
    ti += 1;
  }

  let li = 0;
  while (formData.has(`lr_${li}_title`) || formData.has(`lr_${li}_description`)) {
    if (li >= MAX_PROJECT_DETAIL_REPEATER_ROWS) {
      fieldErrors["_learnRepeater"] = [
        `At most ${MAX_PROJECT_DETAIL_REPEATER_ROWS} learning rows allowed.`,
      ];
      break;
    }
    const ttl = `lr_${li}_title`;
    const dsc = `lr_${li}_description`;
    const title = getTrimmed(formData, ttl);
    const description = getTrimmed(formData, dsc);

    if (title === "" && description === "") {
      li += 1;
      continue;
    }
    if (title === "" || description === "") {
      if (title === "") fieldErrors[ttl] = ["Title required when description is filled."];
      if (description === "") fieldErrors[dsc] = ["Description required when title is filled."];
      li += 1;
      continue;
    }
    learningItems.push({ title, description });
    li += 1;
  }

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };
  return { ok: true, techUsageItems, learningItems };
}
