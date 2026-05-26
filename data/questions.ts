import { Question, Theme } from "@/types/scan";

// Leesbare labels per thema (gebruikt op de resultaatpagina).
export const THEME_LABELS: Record<Theme, string> = {
  costResilience: "Kostenweerbaarheid",
  dependency: "Afhankelijkheid",
  supplySecurity: "Leveringszekerheid",
  flexibility: "Flexibiliteit",
  futureReadiness: "Toekomstbestendigheid",
};

// Korte toelichting per thema voor de sectie "Wat betekent dit?".
export const THEME_EXPLANATIONS: Record<Theme, string> = {
  costResilience:
    "In hoeverre je grip hebt op je energiekosten en bestand bent tegen prijsschommelingen.",
  dependency:
    "Hoe afhankelijk je bent van externe energie, fossiele brandstoffen en marktontwikkelingen.",
  supplySecurity:
    "Hoe goed je continuïteit gewaarborgd is bij netcongestie of verstoringen in levering.",
  flexibility:
    "In welke mate je je energieverbruik kunt sturen, verschuiven of combineren met opslag.",
  futureReadiness:
    "Hoe goed je voorbereid bent op regelgeving, klantvragen en verdere verduurzaming.",
};

// De volledige vragenlijst. Elke antwoordoptie kent punten toe aan thema's.
export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Hoe groot is het aandeel van energie in je totale bedrijfskosten?",
    options: [
      { id: "A", label: "Laag: energie is geen grote kostenpost.", scores: { costResilience: 8 } },
      { id: "B", label: "Gemiddeld: energie is merkbaar, maar niet bepalend.", scores: { costResilience: 5 } },
      { id: "C", label: "Hoog: energie is een belangrijke kostenpost.", scores: { costResilience: 2 } },
      { id: "D", label: "Zeer hoog: stijgende energieprijzen raken direct onze marge.", scores: { costResilience: 0 } },
    ],
  },
  {
    id: 2,
    text: "Hoe goed heb je inzicht in je energieverbruik?",
    options: [
      { id: "A", label: "We monitoren actief en kennen pieken, patronen en grootverbruikers.", scores: { costResilience: 8, flexibility: 6 } },
      { id: "B", label: "We hebben periodiek inzicht via facturen of rapportages.", scores: { costResilience: 5, flexibility: 3 } },
      { id: "C", label: "We hebben beperkt inzicht.", scores: { costResilience: 2, flexibility: 1 } },
      { id: "D", label: "We hebben nauwelijks inzicht.", scores: { costResilience: 0, flexibility: 0 } },
    ],
  },
  {
    id: 3,
    text: "Heeft je bedrijf eigen duurzame opwek, zoals zonnepanelen?",
    helper:
      "Eigen opwek betekent dat je zelf energie produceert, bijvoorbeeld met zonnepanelen of een windturbine.",
    options: [
      { id: "A", label: "Ja, en dit dekt een groot deel van ons verbruik.", scores: { dependency: 8, costResilience: 7, futureReadiness: 6 } },
      { id: "B", label: "Ja, maar het dekt een beperkt deel.", scores: { dependency: 5, costResilience: 5, futureReadiness: 4 } },
      { id: "C", label: "Nog niet, maar we onderzoeken het.", scores: { dependency: 3, costResilience: 3, futureReadiness: 3 } },
      { id: "D", label: "Nee, en er zijn nog geen plannen.", scores: { dependency: 0, costResilience: 0, futureReadiness: 0 } },
    ],
  },
  {
    id: 4,
    text: "Hoe afhankelijk is je bedrijf van gas of fossiele energie?",
    options: [
      { id: "A", label: "Nauwelijks afhankelijk.", scores: { dependency: 8, futureReadiness: 7 } },
      { id: "B", label: "Deels afhankelijk, maar alternatieven zijn in beeld.", scores: { dependency: 5, futureReadiness: 5 } },
      { id: "C", label: "Sterk afhankelijk.", scores: { dependency: 2, futureReadiness: 2 } },
      { id: "D", label: "Zeer sterk afhankelijk en moeilijk te vervangen.", scores: { dependency: 0, futureReadiness: 0 } },
    ],
  },
  {
    id: 5,
    text: "Kun je energieverbruik verschuiven naar andere momenten?",
    helper:
      "Bijvoorbeeld machines of processen draaien op momenten dat stroom goedkoper of ruimer beschikbaar is.",
    options: [
      { id: "A", label: "Ja, we kunnen processen actief sturen.", scores: { flexibility: 8, supplySecurity: 5 } },
      { id: "B", label: "Beperkt, voor enkele processen.", scores: { flexibility: 5, supplySecurity: 3 } },
      { id: "C", label: "Nauwelijks.", scores: { flexibility: 2, supplySecurity: 1 } },
      { id: "D", label: "Nee, ons verbruik ligt volledig vast.", scores: { flexibility: 0, supplySecurity: 0 } },
    ],
  },
  {
    id: 6,
    text: "Heb je te maken met netcongestie of beperkingen in transportcapaciteit?",
    helper:
      "Netcongestie betekent dat het elektriciteitsnet vol zit, waardoor je niet altijd meer stroom kunt afnemen of terugleveren.",
    options: [
      { id: "A", label: "Nee, en we hebben voldoende ruimte voor groei.", scores: { supplySecurity: 8, futureReadiness: 6 } },
      { id: "B", label: "Nog niet, maar het kan wel invloed krijgen.", scores: { supplySecurity: 5, futureReadiness: 4 } },
      { id: "C", label: "Ja, het beperkt plannen of investeringen.", scores: { supplySecurity: 2, futureReadiness: 2 } },
      { id: "D", label: "Ja, het vormt een groot risico voor groei of verduurzaming.", scores: { supplySecurity: 0, futureReadiness: 0 } },
    ],
  },
  {
    id: 7,
    text: "Heeft je bedrijf plannen voor opslag, energiesturing of flexibiliteit?",
    options: [
      { id: "A", label: "Ja, dit is al ingericht of in uitvoering.", scores: { flexibility: 8, supplySecurity: 7, futureReadiness: 6 } },
      { id: "B", label: "We onderzoeken de mogelijkheden.", scores: { flexibility: 5, supplySecurity: 5, futureReadiness: 4 } },
      { id: "C", label: "Het staat op de lange termijn op de agenda.", scores: { flexibility: 2, supplySecurity: 2, futureReadiness: 2 } },
      { id: "D", label: "Nee, nog niet.", scores: { flexibility: 0, supplySecurity: 0, futureReadiness: 0 } },
    ],
  },
  {
    id: 8,
    text: "Hoe gevoelig is je bedrijf voor verstoringen in levering, transport of internationale markten?",
    options: [
      { id: "A", label: "Beperkt gevoelig.", scores: { dependency: 8, supplySecurity: 7 } },
      { id: "B", label: "Enigszins gevoelig.", scores: { dependency: 5, supplySecurity: 5 } },
      { id: "C", label: "Behoorlijk gevoelig.", scores: { dependency: 2, supplySecurity: 2 } },
      { id: "D", label: "Zeer gevoelig.", scores: { dependency: 0, supplySecurity: 0 } },
    ],
  },
  {
    id: 9,
    text: "Vragen klanten, opdrachtgevers of ketenpartners om duurzame prestaties?",
    options: [
      { id: "A", label: "Ja, dit speelt al duidelijk mee in opdrachten of samenwerking.", scores: { futureReadiness: 8 } },
      { id: "B", label: "Soms, maar nog niet structureel.", scores: { futureReadiness: 5 } },
      { id: "C", label: "Nog weinig, maar we verwachten dat dit toeneemt.", scores: { futureReadiness: 3 } },
      { id: "D", label: "Nee, dit speelt niet.", scores: { futureReadiness: 1 } },
    ],
  },
  {
    id: 10,
    text: "Heeft je bedrijf een concreet verduurzamingsplan?",
    options: [
      { id: "A", label: "Ja, met doelen, maatregelen en planning.", scores: { futureReadiness: 8, costResilience: 5 } },
      { id: "B", label: "Ja, maar nog globaal.", scores: { futureReadiness: 5, costResilience: 3 } },
      { id: "C", label: "We hebben losse ideeën.", scores: { futureReadiness: 2, costResilience: 1 } },
      { id: "D", label: "Nee, nog niet.", scores: { futureReadiness: 0, costResilience: 0 } },
    ],
  },
  {
    id: 11,
    text: "Hoe voorbereid is je bedrijf op opnieuw stijgende energieprijzen?",
    options: [
      { id: "A", label: "Goed voorbereid; we hebben maatregelen genomen.", scores: { costResilience: 8, dependency: 5 } },
      { id: "B", label: "Redelijk voorbereid.", scores: { costResilience: 5, dependency: 3 } },
      { id: "C", label: "Beperkt voorbereid.", scores: { costResilience: 2, dependency: 1 } },
      { id: "D", label: "Niet voorbereid.", scores: { costResilience: 0, dependency: 0 } },
    ],
  },
  {
    id: 12,
    text: "Werk je samen met andere bedrijven aan energie, bijvoorbeeld op een bedrijventerrein of via een Energy Hub?",
    helper:
      "Een Energy Hub is een lokaal samenwerkingsverband waarin bedrijven energie delen, opslaan of slim afstemmen.",
    options: [
      { id: "A", label: "Ja, we doen actief mee.", scores: { flexibility: 8, supplySecurity: 6, futureReadiness: 6 } },
      { id: "B", label: "We verkennen samenwerking.", scores: { flexibility: 5, supplySecurity: 4, futureReadiness: 4 } },
      { id: "C", label: "We kennen de mogelijkheden, maar doen nog niet mee.", scores: { flexibility: 2, supplySecurity: 2, futureReadiness: 2 } },
      { id: "D", label: "Nee, dit speelt nog niet.", scores: { flexibility: 0, supplySecurity: 0, futureReadiness: 0 } },
    ],
  },
];
