import { Euro, Cable, Globe2, BadgeCheck, ShieldAlert } from "lucide-react";
import { Scenario } from "@/types/scan";

// Scenario-data, los van componentlogica. De impactstatus wordt op basis van
// deze gewichten en de bestaande themascores berekend in lib/scenarios.ts.
// Toon bewust indicatief: bewustwording en gesprek, geen financieel advies.
export const SCENARIOS: Scenario[] = [
  {
    id: "energy-prices",
    title: "Energieprijzen stijgen opnieuw",
    shortDescription:
      "Stijgende energieprijzen kunnen direct invloed hebben op je marge, zeker wanneer energie een grote kostenpost is en je weinig grip hebt op verbruik of opwek.",
    icon: Euro,
    weights: {
      costResilience: 0.5,
      dependency: 0.3,
      flexibility: 0.2,
    },
    vulnerableText:
      "Een bedrijf met weinig inzicht in verbruik, beperkte eigen opwek en weinig flexibiliteit is gevoeliger voor prijsstijgingen. Hogere energiekosten kunnen dan sneller drukken op marge en investeringsruimte.",
    resilientText:
      "Een bedrijf met inzicht, eigen opwek en sturing kan prijsstijgingen beter opvangen. Het bedrijf heeft meer grip op kosten en kan sneller bijsturen.",
    actionAdvice:
      "Breng je energieverbruik, pieken en contractvorm in kaart. Onderzoek daarna welke maatregelen helpen om kostenrisico's te verlagen, zoals monitoring, eigen opwek of slimme sturing.",
    impulsHelp:
      "Impuls Zeeland denkt vrijblijvend met je mee over meer grip op je energiekosten. Via ons Expertplatform en een breed netwerk van partijen helpen we je op weg met inzicht in verbruik, monitoring en mogelijkheden voor eigen opwek of financiering.",
  },
  {
    id: "grid-capacity",
    title: "Netcapaciteit blijft beperkt",
    shortDescription:
      "Netcongestie kan groei, elektrificatie en verduurzaming vertragen. Bedrijven die flexibel met energie omgaan, staan sterker.",
    icon: Cable,
    weights: {
      supplySecurity: 0.45,
      flexibility: 0.35,
      futureReadiness: 0.2,
    },
    vulnerableText:
      "Een bedrijf zonder flexibiliteit, opslag of plan voor netcapaciteit loopt meer risico dat uitbreiding, elektrificatie of productieplannen vastlopen.",
    resilientText:
      "Een bedrijf dat stuurt op flexibiliteit, samenwerking en slimme planning kan beter omgaan met beperkte netcapaciteit. Daardoor blijven groei en verduurzaming eerder mogelijk.",
    actionAdvice:
      "Onderzoek welke processen flexibel zijn, waar pieken ontstaan en of samenwerking met andere bedrijven op het bedrijventerrein mogelijk is, bijvoorbeeld via collectieve oplossingen of een Energy Hub.",
    impulsHelp:
      "Impuls Zeeland denkt vrijblijvend met je mee over netcapaciteit en flexibiliteit. We verbinden je met ons netwerk rond netoplossingen, Energy Hubs en samenwerking op bedrijventerreinen, en wijzen je de weg met hulpmiddelen zoals het Energiekompas.",
  },
  {
    id: "international-markets",
    title: "Internationale markten worden onrustiger",
    shortDescription:
      "Geopolitieke spanningen en verstoringen in internationale markten kunnen invloed hebben op energieprijzen, grondstoffen, transport en leveringszekerheid.",
    icon: Globe2,
    weights: {
      dependency: 0.45,
      supplySecurity: 0.35,
      costResilience: 0.2,
    },
    vulnerableText:
      "Een bedrijf dat sterk afhankelijk is van externe markten, fossiele energie of kwetsbare leveranciers kan harder geraakt worden door internationale onrust.",
    resilientText:
      "Een bedrijf dat afhankelijkheden verlaagt en alternatieven onderzoekt, heeft meer controle. Lokale opwek, elektrificatie, samenwerking en inzicht in kritieke processen maken het bedrijf stabieler.",
    actionAdvice:
      "Maak zichtbaar waar je afhankelijkheden zitten. Kijk naar energie, leveranciers, transport en kritieke processen. Bepaal welke afhankelijkheden je kunt verkleinen of beter kunt spreiden.",
    impulsHelp:
      "Impuls Zeeland denkt vrijblijvend met je mee over het verkleinen van afhankelijkheden. Via ons brede netwerk verbinden we je met partijen die kunnen helpen bij eigen opwek, elektrificatie en alternatieven, zodat je minder gevoelig wordt voor externe schokken.",
  },
  {
    id: "customer-demands",
    title: "Klanten stellen hogere duurzaamheidseisen",
    shortDescription:
      "Steeds meer klanten, opdrachtgevers en ketenpartners vragen om inzicht in duurzaamheid, energiegebruik en CO₂-reductie. Dit kan invloed hebben op je concurrentiepositie.",
    icon: BadgeCheck,
    weights: {
      futureReadiness: 0.6,
      dependency: 0.2,
      costResilience: 0.2,
    },
    vulnerableText:
      "Een bedrijf zonder verduurzamingsplan of inzicht in energieprestaties kan minder aantrekkelijk worden voor klanten, opdrachtgevers of ketenpartners.",
    resilientText:
      "Een bedrijf met duidelijke doelen, maatregelen en resultaten kan duurzaamheid inzetten als kracht. Dat helpt bij klantvragen, aanbestedingen, samenwerking en positionering.",
    actionAdvice:
      "Maak verduurzaming onderdeel van je bedrijfsstrategie. Leg vast welke stappen je zet, welke resultaten je boekt en hoe je hierover communiceert richting klanten en partners.",
    impulsHelp:
      "Impuls Zeeland denkt vrijblijvend met je mee over verduurzaming als kans. We helpen je op weg met een verduurzamingsplan, mogelijke financiering of subsidies, en brengen je in contact met partijen die je hierbij kunnen ondersteunen.",
  },
  {
    id: "combined-stress-test",
    title: "Meerdere ontwikkelingen tegelijk",
    shortDescription:
      "In de praktijk komen ontwikkelingen vaak samen. Denk aan hogere energieprijzen, beperkte netcapaciteit, geopolitieke spanningen en strengere klantvragen. Juist dan wordt weerbaarheid belangrijk.",
    icon: ShieldAlert,
    weights: {},
    useTotalScore: true,
    vulnerableText:
      "Wanneer meerdere externe factoren tegelijk spelen, kan een kwetsbaar bedrijf sneller te maken krijgen met hogere kosten, vertraging in groei, onzekerheid in levering en druk vanuit klanten.",
    resilientText:
      "Een weerbaarder bedrijf heeft meer opties. Door inzicht, eigen regie, flexibiliteit en een concreet plan kan het bedrijf sneller reageren en beter blijven functioneren.",
    actionAdvice:
      "Begin met de drie laagst scorende thema's uit je resultaat. Daar zitten waarschijnlijk de grootste kansen om je bedrijf sterker en minder afhankelijk te maken.",
    impulsHelp:
      "Impuls Zeeland denkt graag vrijblijvend met je mee over de stappen die voor jouw bedrijf logisch zijn. Met een breed netwerk van partijen en hulpmiddelen zoals het Energiekompas helpen we je om gericht aan de slag te gaan met je grootste kansen.",
  },
];
