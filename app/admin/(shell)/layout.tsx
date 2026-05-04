import { logout } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { buttonClassName } from "@/components/ui/Button";

export default function AdminShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <AdminNav
        trailing={
          <form action={logout}>
            <button type="submit" className={buttonClassName("secondary")}>
              Logga ut
            </button>
          </form>
        }
      />
      {children}
    </div>
  );
}
