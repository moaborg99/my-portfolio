import { logout } from "@/app/admin/actions";

export default function AdminHomePage() {
  return (
    <section>
      <h1 className="text-xl font-semibold">Admin</h1>
      <p className="mt-2 text-fg-muted">You are signed in.</p>
      <form action={logout} className="mt-6">
        <button type="submit" className="rounded bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
          Sign out
        </button>
      </form>
    </section>
  );
}
