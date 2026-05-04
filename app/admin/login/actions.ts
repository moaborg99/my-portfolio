"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import { ADMIN_SESSION_COOKIE, signAdminSession } from "@/lib/admin-session";

export type LoginState = { error?: string } | undefined;

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");
  if (typeof password !== "string" || password.length === 0) {
    return { error: "Lösenord krävs." };
  }

  const b64 = process.env.ADMIN_PASSWORD_HASH_B64?.trim();
  if (!b64) {
    return { error: "Servern är inte konfigurerad (saknar ADMIN_PASSWORD_HASH_B64)." };
  }

  let hash: string;
  try {
    hash = Buffer.from(b64, "base64").toString("utf8");
  } catch {
    return { error: "Servern är inte konfigurerad (ogiltig ADMIN_PASSWORD_HASH_B64)." };
  }

  if (hash.length !== 60 || !hash.startsWith("$2")) {
    return { error: "Servern är inte konfigurerad (ogiltig bcrypt-hash efter avkodning)." };
  }

  const ok = await bcrypt.compare(password, hash);
  if (!ok) {
    return { error: "Fel lösenord." };
  }

  const token = await signAdminSession();
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}
