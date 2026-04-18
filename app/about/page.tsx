import { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section>
      <h1>About Me</h1>
      <p className="mb-4">I am a frontend developer student</p>
      <p className="mb-4">This is a few of the technologies I have worked with:</p>
      <ul className="mb-4 list-inside list-disc">
        <li className="mb-2">HTML</li>
        <li className="mb-2">CSS</li>
        <li className="mb-2">JavaScript</li>
        <li className="mb-2">React</li>
        <li className="mb-2">Next.js</li>
        <li className="mb-2">Tailwind CSS</li>
      </ul>
    </section>
  );
}
