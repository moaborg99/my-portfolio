/** Max gallery rows in admin form (create + edit) to limit payload abuse. */
export const MAX_PROJECT_GALLERY_ROWS = 10;

function getTrimmed(formData: FormData, key: string): string {
  const v = formData.get(key);
  if (v === null || typeof v !== "string") return "";
  return v.trim();
}

export type ParsedGalleryRow =
  | { index: number; kind: "new"; alt: string; file: File }
  | { index: number; kind: "keep"; imageId: number; alt: string }
  | { index: number; kind: "replace"; imageId: number; alt: string; file: File };

export type ParsedGalleryFromForm =
  | { ok: true; rows: ParsedGalleryRow[] }
  | { ok: false; fieldErrors: Record<string, string[]> };

/**
 * Reads indexed gallery fields `gi_{i}_present`, `gi_{i}_file`, `gi_{i}_alt`,
 * and for edit `gi_{i}_imageId`, `gi_{i}_existingSrc`.
 */
export function parseProjectGalleryFromForm(
  formData: FormData,
  mode: "create" | "edit"
): ParsedGalleryFromForm {
  const fieldErrors: Record<string, string[]> = {};
  const rows: ParsedGalleryRow[] = [];

  for (let i = 0; i < MAX_PROJECT_GALLERY_ROWS; i++) {
    const present = formData.get(`gi_${i}_present`);
    if (present !== "1") continue;

    const alt = getTrimmed(formData, `gi_${i}_alt`);
    const fileField = formData.get(`gi_${i}_file`);
    const fileOk = fileField instanceof File && fileField.size > 0;

    const imageIdStr = getTrimmed(formData, `gi_${i}_imageId`);
    const existingSrc = getTrimmed(formData, `gi_${i}_existingSrc`);

    const hasExisting = imageIdStr !== "" && existingSrc !== "";

    if (mode === "edit" && hasExisting) {
      const imageId = Number.parseInt(imageIdStr, 10);
      if (!Number.isFinite(imageId) || imageId <= 0) {
        fieldErrors[`gi_${i}_imageId`] = ["Ogiltig bildreferens."];
        continue;
      }
      if (fileOk) {
        rows.push({ index: i, kind: "replace", imageId, alt, file: fileField });
      } else {
        rows.push({ index: i, kind: "keep", imageId, alt });
      }
      continue;
    }

    // New slot (create, or new row on edit)
    if (!fileOk) {
      if (alt !== "") {
        fieldErrors[`gi_${i}_file`] = ["Välj en bildfil när alt-text är ifylld."];
      }
      continue;
    }
    rows.push({ index: i, kind: "new", alt, file: fileField });
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }
  return { ok: true, rows };
}
