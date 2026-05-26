import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="no-print mt-16 bg-anthracite text-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-2xl font-black leading-tight md:text-3xl">
              EEN IMPULS VOOR...
              <br />
              <span className="text-yellow">EEN WEERBAAR BEDRIJF</span>
            </p>
          </div>
          <div className="md:text-right">
            <div className="mb-3 text-lg">
              <Logo light />
            </div>
            <p className="max-w-md text-sm text-white/70 md:ml-auto">
              Impuls Zeeland helpt ondernemers met innoveren, investeren en
              verduurzamen.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          De uitkomst van deze scan is indicatief en bedoeld als startpunt voor
          gesprek, niet als financieel advies.
        </div>
      </div>
    </footer>
  );
}
