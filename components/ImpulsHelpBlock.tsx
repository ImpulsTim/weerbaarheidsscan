import { Handshake, Mail, Phone } from "lucide-react";

// Bruggetje naar de dienstverlening van Impuls Zeeland binnen een scenario.
// Mint-accent zodat het zich onderscheidt van het groene actie-blok.
// Centraal teamcontact met algemeen e-mail/telefoon als achtervang.
export default function ImpulsHelpBlock({ text }: { text: string }) {
  return (
    <div className="rounded-card border border-mint bg-mint/15 p-4">
      <div className="flex gap-3">
        <Handshake className="h-5 w-5 shrink-0 text-anthracite" aria-hidden="true" />
        <div>
          <h4 className="text-sm font-bold text-anthracite">
            Hoe Impuls Zeeland kan helpen
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-anthracite/75">
            {text}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 pl-8 text-sm font-semibold text-anthracite">
        <span className="text-anthracite/60">
          Sparren met het team energietransitie?
        </span>
        <a
          href="mailto:info@impulszeeland.nl"
          className="inline-flex items-center gap-1.5 text-green underline-offset-4 hover:underline"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          info@impulszeeland.nl
        </a>
        <a
          href="tel:+31118724900"
          className="inline-flex items-center gap-1.5 text-green underline-offset-4 hover:underline"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          +31 (0)118 72 49 00
        </a>
      </div>
    </div>
  );
}
