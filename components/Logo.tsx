import Link from "next/link";
import Image from "next/image";

// Officieel Impuls Zeeland-logo (/public/logo.svg). Op donkere achtergrond
// tonen we het als wit silhouet, omdat de wordmark zelf antraciet is.
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center"
      aria-label="Impuls Zeeland — naar startpagina"
    >
      <Image
        src="/logo.svg"
        alt="Impuls Zeeland"
        width={150}
        height={48}
        priority
        className={`h-9 w-auto md:h-10 ${light ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}
