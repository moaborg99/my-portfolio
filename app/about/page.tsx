export default function About() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">About Me</h1>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4">I am a frontend developer student</p>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4">
        This is a few of the technologies I have worked with:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li className="text-zinc-700 dark:text-zinc-300 mb-2">HTML</li>
        <li className="text-zinc-700 dark:text-zinc-300 mb-2">CSS</li>
        <li className="text-zinc-700 dark:text-zinc-300 mb-2">JavaScript</li>
        <li className="text-zinc-700 dark:text-zinc-300 mb-2">React</li>
        <li className="text-zinc-700 dark:text-zinc-300 mb-2">Next.js</li>
        <li className="text-zinc-700 dark:text-zinc-300 mb-2">Tailwind CSS</li>
      </ul>
    </section>
  );
}
