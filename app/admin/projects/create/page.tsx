import Link from "next/link";

import { CreateProjectForm } from "@/components/admin/CreateProjectForm";

export default function AdminCreateProjectPage() {
  return (
    <section className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-turquoise hover:underline">
          ← Back to admin
        </Link>
        <h1 className="mt-4 text-xl font-semibold">Create project</h1>
        <p className="mt-1 text-sm text-fg-muted">
          Adds a core project row. Gallery and skills stay for later steps.
        </p>
      </div>
      <CreateProjectForm />
    </section>
  );
}
