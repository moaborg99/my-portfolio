import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Contact Me</h1>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4">
        You can contact me by email at{" "}
        <a href="mailto:borg.moa@hotmail.com">borg.moa@hotmail.com</a>
      </p>
    </section>
  );
}
