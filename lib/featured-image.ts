import { put } from "@vercel/blob";

/** ~4.5 MB — aligns with Vercel Blob server upload limits (featured hero) */
const FEATURED_MAX_BYTES = Math.floor(4.5 * 1024 * 1024);

/** Smaller cap for gallery slots so multi-image submits stay under Server Actions body limits. */
export const GALLERY_MAX_BYTES = 2 * 1024 * 1024;

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function sanitizeFilenameBaseForPath(original: string): string {
  const base = original.replace(/^.*[/\\]/, "").replace(/\.[^.]+$/u, "") || "image";
  const ascii = base
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return ascii || "image";
}

export async function uploadProjectImageToBlob(
  file: File,
  options: { maxBytes: number; sizeLabel: string }
): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return {
      ok: false,
      message: "Saknar BLOB_READ_WRITE_TOKEN. Lägg till den i miljön (t.ex. .env).",
    };
  }

  if (file.size === 0) {
    return { ok: false, message: "Den uppladdade filen är tom." };
  }
  if (file.size > options.maxBytes) {
    return {
      ok: false,
      message: `Image must be at most ${options.sizeLabel} for this upload.`,
    };
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return { ok: false, message: "Använd JPEG, PNG, WebP eller GIF." };
  }

  const safeName = sanitizeFilenameBaseForPath(file.name);
  const pathname = `projects/${crypto.randomUUID()}-${safeName}`;

  try {
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { ok: true, url: blob.url };
  } catch {
    return {
      ok: false,
      message: "Uppladdning misslyckades. Kontrollera BLOB_READ_WRITE_TOKEN och försök igen.",
    };
  }
}

export async function uploadFeaturedImageToBlob(
  file: File
): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  return uploadProjectImageToBlob(file, { maxBytes: FEATURED_MAX_BYTES, sizeLabel: "4.5 MB" });
}

export async function uploadGalleryImageToBlob(
  file: File
): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  return uploadProjectImageToBlob(file, {
    maxBytes: GALLERY_MAX_BYTES,
    sizeLabel: "2 MB",
  });
}
