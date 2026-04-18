import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section>
      <h1>Contact Me</h1>
      <p className="mb-4">
        You can contact me by email at{" "}
        <a
          href="mailto:borg.moa@hotmail.com"
          className="text-turquoise underline decoration-turquoise/50 underline-offset-2 transition-colors hover:text-fg"
        >
          borg.moa@hotmail.com
        </a>
      </p>
    </section>
  );
}
