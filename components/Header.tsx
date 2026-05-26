import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="no-print sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <Link
          href="/scan"
          className="rounded-full bg-anthracite px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black"
        >
          Start de scan
        </Link>
      </div>
    </header>
  );
}
