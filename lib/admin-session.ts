import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_COOKIE = "admin_session";

const SESSION_DURATION = "7d";

function getSigningKey(): Uint8Array | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    return null;
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminSession(): Promise<string> {
  const key = getSigningKey();
  if (!key) {
    throw new Error("ADMIN_SESSION_SECRET must be set in .env and be at least 32 characters long.");
  }

  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(key);
}

export async function verifyAdminSession(token: string): Promise<boolean> {
  const key = getSigningKey();
  if (!key) {
    return false;
  }

  try {
    await jwtVerify(token, key);
    return true;
  } catch {
    return false;
  }
}
