import { Profile, Recommendation, Theme } from "@/types/scan";

// Eén aanbeveling per thema. Op de resultaatpagina tonen we de aanbevelingen
// voor de drie laagst scorende thema's.
export const RECOMMENDATIONS: Record<Theme, Recommendation> = {
  costResilience: {
    theme: "costResilience",
    title: "Krijg meer grip op je energiekosten",
    text: "Breng je verbruik, pieken en contractvorm in kaart. Daarmee zie je waar kostenrisico's zitten en welke maatregelen het meeste effect hebben.",
  },
  dependency: {
    theme: "dependency",
    title: "Verlaag je afhankelijkheid van externe markten",
    text: "Onderzoek eigen opwek, elektrificatie en alternatieven voor fossiele energie. Zo verklein je de invloed van externe prijsschokken.",
  },
  supplySecurity: {
    theme: "supplySecurity",
    title: "Versterk je continuïteit",
    text: "Kijk naar risico's rond netcapaciteit, levering en cruciale processen. Een plan voor energiezekerheid helpt om verstoringen beter op te vangen.",
  },
  flexibility: {
    theme: "flexibility",
    title: "Maak je energieverbruik slimmer en flexibeler",
    text: "Onderzoek of processen verschoven, gestuurd of gecombineerd kunnen worden met opslag. Flexibiliteit wordt steeds belangrijker bij netcongestie en prijsverschillen.",
  },
  futureReadiness: {
    theme: "futureReadiness",
    title: "Maak verduurzaming onderdeel van je bedrijfsstrategie",
    text: "Leg doelen, maatregelen en investeringen vast. Dat helpt bij klantvragen, financiering en toekomstige regelgeving.",
  },
};

// Totaalprofielen op basis van de totaalscore (0 - 100).
export const PROFILES: { min: number; max: number; profile: Profile }[] = [
  {
    min: 0,
    max: 39,
    profile: {
      title: "Zeer kwetsbaar",
      text: "Je bedrijf lijkt sterk gevoelig voor externe energieontwikkelingen. Meer inzicht, eigen regie en een concreet plan kunnen helpen om risico's te verkleinen.",
    },
  },
  {
    min: 40,
    max: 59,
    profile: {
      title: "Kwetsbaar",
      text: "Je bedrijf heeft al enkele aanknopingspunten, maar blijft gevoelig voor prijsstijgingen, afhankelijkheid of verstoringen. Gerichte stappen kunnen je weerbaarheid vergroten.",
    },
  },
  {
    min: 60,
    max: 79,
    profile: {
      title: "Redelijk weerbaar",
      text: "Je bedrijf heeft al een basis gelegd. Door verder te sturen op flexibiliteit, eigen opwek en toekomstbestendigheid kun je sterker komen te staan.",
    },
  },
  {
    min: 80,
    max: 100,
    profile: {
      title: "Sterk weerbaar",
      text: "Je bedrijf lijkt goed voorbereid op externe ontwikkelingen. Blijf monitoren, optimaliseren en benut kansen voor samenwerking en verdere verduurzaming.",
    },
  },
];
