import Link from "next/link";

export default function Home() {
  return (
    <section> 
      <h1 >Hi, I am Moa Borg</h1>
      <p>I am a frontend developer student</p>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
    </section>
  );
}
