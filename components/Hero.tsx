import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Swoosh from "./Swoosh";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-lightblue">
      <Swoosh className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] text-mint" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-green">
            Energie Weerbaarheidsscan
          </span>
          <h1 className="text-4xl font-black leading-tight text-anthracite md:text-5xl">
            Hoe weerbaar is jouw bedrijf tegen energie-onzekerheid?
          </h1>
          <p className="mt-5 text-lg font-medium text-anthracite/80">
            Verduurzaming gaat niet alleen over CO₂-reductie. Het gaat ook over
            grip op kosten, minder afhankelijkheid en meer continuïteit in een
            onzekere wereld.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-anthracite/70">
            Energieprijzen, geopolitieke spanningen, netcongestie en
            veranderende keteneisen kunnen grote invloed hebben op je bedrijf.
            Deze scan geeft in enkele minuten inzicht in hoe kwetsbaar jouw
            bedrijf is — en welke stappen kunnen helpen om sterker te staan.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-green-dark"
            >
              Start de scan
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a
              href="#hoe-werkt-het"
              className="text-base font-bold text-anthracite underline-offset-4 hover:underline"
            >
              Lees hoe de scan werkt
            </a>
          </div>
          <p className="mt-5 text-sm text-anthracite/60">
            Deze scan duurt ongeveer 3 minuten. Er zijn geen goede of foute
            antwoorden — het gaat om inzicht.
          </p>
        </div>
      </div>
    </section>
  );
}
