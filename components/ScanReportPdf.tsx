import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { ScanResult, ScenarioImpact, ScenarioResult } from "@/types/scan";
import { SCENARIOS } from "@/data/scenarios";
import { THEME_LABELS, THEME_EXPLANATIONS } from "@/data/questions";
import { getImpactLabel } from "@/lib/scenarios";

// Huisstijl-kleuren (gelijk aan app/globals.css).
const COLORS = {
  green: "#46962b",
  anthracite: "#242b38",
  yellow: "#fbba00",
  mint: "#a6d6cc",
  lightblue: "#f2f8fa",
  lightgreen: "#edf5ea",
  border: "#e6e8ec",
  muted: "#5b626f",
};

// Accentkleur van de totaalscore — zelfde drempels als ResultSummary.ringColor.
function scoreColor(total: number): string {
  if (total < 60) return COLORS.yellow;
  if (total < 80) return COLORS.mint;
  return COLORS.green;
}

// Balkkleur per themastatus — zelfde mapping als ScoreBar.STATUS_COLOR.
function statusColor(status: string): string {
  if (status === "sterk weerbaar") return COLORS.green;
  if (status === "redelijk weerbaar") return COLORS.mint;
  return COLORS.yellow;
}

// Badge-stijl per impactniveau (geen fel rood; hoog = antraciet + geel).
function impactStyle(impact: ScenarioImpact): { bg: string; color: string } {
  switch (impact) {
    case "limited":
      return { bg: COLORS.lightgreen, color: COLORS.green };
    case "attention":
      return { bg: "#fdf1cf", color: COLORS.anthracite };
    case "elevated":
      return { bg: COLORS.yellow, color: COLORS.anthracite };
    case "high":
      return { bg: COLORS.anthracite, color: COLORS.yellow };
  }
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.anthracite,
    lineHeight: 1.45,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.green,
  },
  logo: { height: 26 },
  brandText: { fontFamily: "Helvetica-Bold", fontSize: 14, color: COLORS.anthracite },
  headerRight: { fontSize: 9, color: COLORS.muted, textAlign: "right" },
  headerTitle: { fontFamily: "Helvetica-Bold", fontSize: 10, color: COLORS.green },

  // Score-blok
  scoreBox: {
    flexDirection: "row",
    backgroundColor: COLORS.anthracite,
    borderRadius: 10,
    padding: 18,
    color: "#ffffff",
    marginBottom: 20,
  },
  scoreCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  scoreNumber: { fontFamily: "Helvetica-Bold", fontSize: 26, color: "#ffffff" },
  scoreOf: { fontSize: 8, color: "#c7cad0" },
  profileKicker: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: COLORS.yellow,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  profileTitle: { fontFamily: "Helvetica-Bold", fontSize: 18, color: "#ffffff", marginTop: 2 },
  profileText: { fontSize: 10, color: "#d9dbe0", marginTop: 6, maxWidth: 340 },

  sectionTitle: { fontFamily: "Helvetica-Bold", fontSize: 14, color: COLORS.anthracite, marginBottom: 10, marginTop: 6 },
  intro: { fontSize: 10, color: COLORS.muted, marginBottom: 12, marginTop: -4 },

  // Thema-rij
  themeRow: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  themeTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  themeLabel: { fontFamily: "Helvetica-Bold", fontSize: 11 },
  themeScore: { fontFamily: "Helvetica-Bold", fontSize: 13 },
  barTrack: { height: 6, backgroundColor: "#eef0f3", borderRadius: 3, marginTop: 6, marginBottom: 5 },
  barFill: { height: 6, borderRadius: 3 },
  themeStatus: { fontSize: 8, color: COLORS.muted, textTransform: "capitalize" },
  themeExpl: { fontSize: 9, color: COLORS.muted, marginTop: 4 },

  // Scenario-blok
  scenario: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  scenarioTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  scenarioTitle: { fontFamily: "Helvetica-Bold", fontSize: 12, maxWidth: 360 },
  badge: { borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8, fontFamily: "Helvetica-Bold", fontSize: 8 },
  scenarioDesc: { fontSize: 9.5, color: COLORS.muted, marginTop: 6 },
  compareRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  compareCol: { flex: 1, borderRadius: 6, padding: 8 },
  compareHead: { fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 3 },
  compareText: { fontSize: 8.5, color: COLORS.muted },
  actionBox: { backgroundColor: COLORS.lightgreen, borderRadius: 6, padding: 8, marginTop: 8 },
  impulsBox: { borderWidth: 1, borderColor: COLORS.mint, backgroundColor: "#f0f7f5", borderRadius: 6, padding: 8, marginTop: 8 },
  miniHead: { fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 2 },
  miniText: { fontSize: 8.5, color: COLORS.muted },

  // Vervolgstappen
  stepRow: { flexDirection: "row", marginBottom: 8 },
  stepNum: {
    width: 18, height: 18, borderRadius: 9, backgroundColor: COLORS.yellow,
    color: COLORS.anthracite, fontFamily: "Helvetica-Bold", fontSize: 9,
    textAlign: "center", paddingTop: 4, marginRight: 8,
  },
  stepTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  stepText: { fontSize: 9, color: COLORS.muted, marginTop: 1 },

  // Voettekst
  contactBox: { backgroundColor: COLORS.lightblue, borderRadius: 8, padding: 12, marginTop: 6 },
  contactTitle: { fontFamily: "Helvetica-Bold", fontSize: 11, marginBottom: 3 },
  contactText: { fontSize: 9, color: COLORS.muted },
  disclaimer: { fontSize: 7.5, color: COLORS.muted, marginTop: 14, textAlign: "center" },
  pageNumber: {
    position: "absolute", bottom: 22, right: 40, fontSize: 8, color: COLORS.muted,
  },
});

function Header({ logoSrc, date }: { logoSrc?: string; date: string }) {
  return (
    <View style={styles.header} fixed>
      {logoSrc ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image style={styles.logo} src={logoSrc} />
      ) : (
        <Text style={styles.brandText}>Impuls Zeeland</Text>
      )}
      <View>
        <Text style={styles.headerTitle}>Energie Weerbaarheidsscan</Text>
        <Text style={styles.headerRight}>Resultaat · {date}</Text>
      </View>
    </View>
  );
}

export default function ScanReportPdf({
  result,
  scenarioResults,
  logoSrc,
}: {
  result: ScanResult;
  scenarioResults: ScenarioResult[];
  logoSrc?: string;
}) {
  const date = new Date().toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const resultById = new Map(scenarioResults.map((r) => [r.scenarioId, r]));
  // Vooraf filteren: react-pdf accepteert geen null-children in een map.
  const scenarioRows = SCENARIOS.map((scenario) => ({
    scenario,
    res: resultById.get(scenario.id),
  })).filter((row): row is { scenario: (typeof SCENARIOS)[number]; res: ScenarioResult } =>
    Boolean(row.res),
  );

  return (
    <Document
      title="Energie Weerbaarheidsscan — resultaat"
      author="Impuls Zeeland"
    >
      <Page size="A4" style={styles.page}>
        <Header logoSrc={logoSrc} date={date} />

        {/* Score + profiel */}
        <View style={styles.scoreBox}>
          <View
            style={[styles.scoreCircle, { borderColor: scoreColor(result.total) }]}
          >
            <Text style={styles.scoreNumber}>{result.total}</Text>
            <Text style={styles.scoreOf}>van 100</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.profileKicker}>Jouw risicoprofiel</Text>
            <Text style={styles.profileTitle}>{result.profile.title}</Text>
            <Text style={styles.profileText}>{result.profile.text}</Text>
          </View>
        </View>

        {/* Themascores */}
        <Text style={styles.sectionTitle}>Je scores per thema</Text>
        {result.themeScores.map((ts) => (
          <View key={ts.theme} style={styles.themeRow} wrap={false}>
            <View style={styles.themeTop}>
              <Text style={styles.themeLabel}>{THEME_LABELS[ts.theme]}</Text>
              <Text style={styles.themeScore}>{ts.score}</Text>
            </View>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${ts.score}%`, backgroundColor: statusColor(ts.status) },
                ]}
              />
            </View>
            <Text style={styles.themeStatus}>{ts.status}</Text>
            <Text style={styles.themeExpl}>{THEME_EXPLANATIONS[ts.theme]}</Text>
          </View>
        ))}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>

      {/* Scenario's */}
      <Page size="A4" style={styles.page}>
        <Header logoSrc={logoSrc} date={date} />
        <Text style={styles.sectionTitle}>
          Wat gebeurt er als de omstandigheden veranderen?
        </Text>
        <Text style={styles.intro}>
          Deze scenario&apos;s zijn indicatief en laten zien waar je bedrijf
          sterker of kwetsbaarder wordt wanneer omstandigheden veranderen.
        </Text>
        {scenarioRows.map(({ scenario, res }) => {
          const badge = impactStyle(res.impact);
          return (
            <View key={scenario.id} style={styles.scenario} wrap={false}>
              <View style={styles.scenarioTop}>
                <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                <Text style={[styles.badge, { backgroundColor: badge.bg, color: badge.color }]}>
                  {getImpactLabel(res.impact)}
                </Text>
              </View>
              <Text style={styles.scenarioDesc}>{scenario.shortDescription}</Text>
              <View style={styles.compareRow}>
                <View style={[styles.compareCol, { backgroundColor: COLORS.lightblue }]}>
                  <Text style={styles.compareHead}>Kwetsbaarder</Text>
                  <Text style={styles.compareText}>{scenario.vulnerableText}</Text>
                </View>
                <View style={[styles.compareCol, { backgroundColor: COLORS.lightgreen }]}>
                  <Text style={[styles.compareHead, { color: COLORS.green }]}>Weerbaarder</Text>
                  <Text style={styles.compareText}>{scenario.resilientText}</Text>
                </View>
              </View>
              <View style={styles.actionBox}>
                <Text style={styles.miniHead}>Wat kun je doen?</Text>
                <Text style={styles.miniText}>{scenario.actionAdvice}</Text>
              </View>
              <View style={styles.impulsBox}>
                <Text style={styles.miniHead}>Hoe Impuls Zeeland kan helpen</Text>
                <Text style={styles.miniText}>{scenario.impulsHelp}</Text>
              </View>
            </View>
          );
        })}

        {/* Vervolgstappen */}
        <Text style={styles.sectionTitle}>Drie logische vervolgstappen</Text>
        {result.recommendations.map((rec, i) => (
          <View key={rec.theme} style={styles.stepRow} wrap={false}>
            <Text style={styles.stepNum}>{i + 1}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>{rec.title}</Text>
              <Text style={styles.stepText}>{rec.text}</Text>
            </View>
          </View>
        ))}

        {/* Contact + disclaimer */}
        <View style={styles.contactBox} wrap={false}>
          <Text style={styles.contactTitle}>Verder praten met Impuls Zeeland?</Text>
          <Text style={styles.contactText}>
            Impuls Zeeland denkt vrijblijvend met je mee over verduurzaming,
            financiering en samenwerking, en heeft een breed netwerk van partijen
            die kunnen ondersteunen.
          </Text>
          <Text style={[styles.contactText, { marginTop: 4 }]}>
            info@impulszeeland.nl · +31 (0)118 72 49 00 · impulszeeland.nl
          </Text>
        </View>
        <Text style={styles.disclaimer}>
          De uitkomst van deze scan en de scenario&apos;s zijn indicatief en
          bedoeld als startpunt voor gesprek, niet als financieel of energieadvies.
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
