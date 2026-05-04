import Link from "next/link";
import { SocialLinks } from "@/components/social/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="container px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <Link href="/" className="text-xl font-semibold text-fg">
              Moa Borg
            </Link>
            <p className="text-base text-fg-muted">Mjukvaruutvecklare</p>
          </div>

          <SocialLinks className="flex w-full flex-wrap items-center justify-start gap-5 md:w-auto md:self-center" />
        </div>
      </div>
    </footer>
  );
}
