"use client";

import { useActionState } from "react";

import { loginAction, type LoginState } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined as LoginState);

  return (
    <section className="mx-auto max-w-sm space-y-4">
      <h1 className="text-xl font-semibold">Logga in som admin</h1>
      <form action={formAction} className="space-y-3">
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-fg-muted">
            Lösenord
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded border border-white/15 bg-navy-light px-3 py-2 text-fg"
          />
        </div>
        {state?.error ? (
          <p className="text-sm text-red-400" role="alert">
            {state.error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-turquoise px-3 py-2 text-sm font-medium text-navy-dark disabled:opacity-50"
        >
          {pending ? "Loggar in …" : "Logga in"}
        </button>
      </form>
    </section>
  );
}
