import { put } from "@vercel/blob";

/** ~4.5 MB — aligns with Vercel Blob server upload limits */
const MAX_BYTES = Math.floor(4.5 * 1024 * 1024);

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

export async function uploadFeaturedImageToBlob(
  file: File
): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return {
      ok: false,
      message: "Missing BLOB_READ_WRITE_TOKEN. Add it to your environment (e.g. .env).",
    };
  }

  if (file.size === 0) {
    return { ok: false, message: "The uploaded file is empty." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, message: "Image must be at most 4.5 MB for server uploads." };
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return { ok: false, message: "Use a JPEG, PNG, WebP, or GIF." };
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
    return { ok: false, message: "Upload failed. Check BLOB_READ_WRITE_TOKEN and try again." };
  }
}
