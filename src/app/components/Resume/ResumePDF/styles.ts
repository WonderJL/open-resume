import { StyleSheet } from "@react-pdf/renderer";

// Tailwindcss Spacing Design System: https://tailwindcss.com/docs/theme#spacing
// It is converted from rem to pt (1rem = 12pt) since https://react-pdf.org/styling only accepts pt unit
export const spacing = {
  0: "0",
  0.5: "1.5pt",
  1: "3pt",
  1.5: "4.5pt",
  2: "6pt",
  2.5: "7.5pt",
  3: "9pt",
  3.5: "10.5pt",
  4: "12pt",
  5: "15pt",
  6: "18pt",
  7: "21pt",
  8: "24pt",
  9: "27pt",
  10: "30pt",
  11: "33pt",
  12: "36pt",
  14: "42pt",
  16: "48pt",
  20: "60pt",
  24: "72pt",
  28: "84pt",
  32: "96pt",
  36: "108pt",
  40: "120pt",
  44: "132pt",
  48: "144pt",
  52: "156pt",
  56: "168pt",
  60: "180pt",
  64: "192pt",
  72: "216pt",
  80: "240pt",
  96: "288pt",
  full: "100%",
} as const;

export const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexRowBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  profileHeader: {
    borderTopWidth: "4.5pt",
    paddingTop: spacing["6"],
  },
  profileNameBlock: {
    display: "flex",
    width: "100%",
  },
  profileSummaryBlock: {
    display: "flex",
    width: "100%",
  },
  profileSummary: {
    marginTop: spacing["1.5"],
    lineHeight: "1.35",
  },
  profileContactRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing["2.5"],
    marginTop: spacing["3"],
  },
  profileContactItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["1"],
  },
  section: {
    gap: spacing["2.5"],
    marginTop: spacing["6"],
  },
  sectionHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bulletRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  icon: {
    width: "13pt",
    height: "13pt",
    fill: "#525252", // text-neutral-600
  },
});
