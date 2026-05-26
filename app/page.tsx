import Link from "next/link";
import { Wallet, Unplug, TrendingUp, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import ShareButton from "@/components/ShareButton";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Drie rustige cards onder de hero */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          <InfoCard
            icon={Wallet}
            title="Grip op kosten"
            text="Minder gevoelig voor prijsschommelingen."
          />
          <InfoCard
            icon={Unplug}
            title="Minder afhankelijk"
            text="Meer controle over energie, leveranciers en externe markten."
          />
          <InfoCard
            icon={TrendingUp}
            title="Toekomstbestendig"
            text="Beter voorbereid op groei, regelgeving en klantvragen."
          />
        </div>
      </section>

      {/* Over deze scan / hoe werkt het */}
      <section id="hoe-werkt-het" className="bg-lightgreen">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-3xl font-black text-anthracite">
                Over deze scan
              </h2>
              <p className="mt-4 text-base leading-relaxed text-anthracite/75">
                Deze scan helpt je in een paar minuten inzicht te krijgen in hoe
                weerbaar je bedrijf is tegen energie-onzekerheid. Je beantwoordt
                12 korte meerkeuzevragen over kosten, afhankelijkheid,
                leveringszekerheid, flexibiliteit en toekomstbestendigheid.
              </p>
              <p className="mt-4 text-base leading-relaxed text-anthracite/75">
                Je krijgt een totaalscore, een risicoprofiel en drie concrete
                vervolgstappen. De uitkomst is{" "}
                <strong className="font-bold">indicatief</strong> en bedoeld als
                startpunt voor gesprek — geen exact financieel advies.
              </p>
              <p className="mt-4 text-base leading-relaxed text-anthracite/75">
                De scan laat ook zien wat scenario&apos;s zoals stijgende
                energieprijzen, netcongestie en internationale onrust voor je
                bedrijf kunnen betekenen.
              </p>
            </div>
            <ol className="space-y-4">
              {[
                "Beantwoord 12 korte meerkeuzevragen.",
                "Je antwoorden worden direct omgezet in scores op vijf thema's.",
                "Bekijk je totaalscore, profiel en drie logische vervolgstappen.",
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-card border border-black/5 bg-white p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-base font-medium text-anthracite">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-green-dark"
            >
              Start de scan
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <ShareButton />
          </div>
        </div>
      </section>
    </>
  );
}
