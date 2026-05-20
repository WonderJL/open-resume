import { Text, View, Link } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";

export const ResumePDFSection = ({
  themeColor,
  heading,
  style = {},
  children,
}: {
  themeColor?: string;
  heading?: string;
  style?: Style;
  children: React.ReactNode;
}) => (
  <View
    style={{
      ...styles.flexCol,
      ...styles.section,
      ...style,
    }}
  >
    {heading && (
      <View style={styles.sectionHeading}>
        {themeColor && (
          <View
            style={{
              height: "3.75pt",
              width: "30pt",
              backgroundColor: themeColor,
              marginRight: spacing["3.5"],
            }}
            debug={DEBUG_RESUME_PDF_FLAG}
          />
        )}
        <Text
          style={{
            fontWeight: "bold",
            letterSpacing: "0.3pt", // tracking-wide -> 0.025em * 12 pt = 0.3pt
          }}
          debug={DEBUG_RESUME_PDF_FLAG}
        >
          {heading}
        </Text>
      </View>
    )}
    {children}
  </View>
);

export const ResumePDFText = ({
  bold = false,
  themeColor,
  style = {},
  children,
}: {
  bold?: boolean;
  themeColor?: string;
  style?: Style;
  children: React.ReactNode;
}) => {
  return (
    <Text
      style={{
        color: themeColor || DEFAULT_FONT_COLOR,
        fontWeight: bold ? "bold" : "normal",
        ...style,
      }}
      debug={DEBUG_RESUME_PDF_FLAG}
    >
      {children}
    </Text>
  );
};

const INLINE_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

const renderInline = (
  text: string,
  isPDF: boolean,
  themeColor?: string
): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyIdx = 0;
  let match: RegExpExecArray | null;
  INLINE_LINK_PATTERN.lastIndex = 0;
  while ((match = INLINE_LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    nodes.push(
      <Link
        key={`link-${keyIdx++}`}
        src={href}
        style={{
          color: themeColor || DEFAULT_FONT_COLOR,
          textDecoration: "underline",
        }}
      >
        {label}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes.length > 0 ? nodes : [text];
};

export const ResumePDFBulletList = ({
  items,
  showBulletPoints = true,
  isPDF = false,
  themeColor,
}: {
  items: string[];
  showBulletPoints?: boolean;
  isPDF?: boolean;
  themeColor?: string;
}) => {
  return (
    <>
      {items.map((item, idx) => (
        <View
          style={{
            ...styles.bulletRow,
            marginTop: idx === 0 ? 0 : spacing["1"],
          }}
          key={idx}
          wrap={false}
        >
          {showBulletPoints && (
            <ResumePDFText
              style={{
                paddingLeft: spacing["2"],
                paddingRight: spacing["1.5"],
                lineHeight: "1.35",
              }}
              bold={true}
            >
              {"•"}
            </ResumePDFText>
          )}
          {/* A breaking change was introduced causing text layout to be wider than node's width
              https://github.com/diegomura/react-pdf/issues/2182. flexGrow & flexBasis fixes it */}
          <ResumePDFText
            style={{ lineHeight: "1.35", flexGrow: 1, flexBasis: 0 }}
          >
            {renderInline(item, isPDF, themeColor)}
          </ResumePDFText>
        </View>
      ))}
    </>
  );
};

export const ResumePDFLink = ({
  src,
  isPDF,
  children,
}: {
  src: string;
  isPDF: boolean;
  children: React.ReactNode;
}) => {
  if (isPDF) {
    return (
      <Link src={src} style={{ textDecoration: "none" }}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={src}
      style={{ textDecoration: "none" }}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export const ResumeFeaturedSkill = ({
  skill,
  rating,
  themeColor,
  style = {},
  testID,
}: {
  skill: string;
  rating: number;
  themeColor: string;
  style?: Style;
  testID?: string;
}) => {
  const numCircles = 5;

  return (
    <View
      {...(testID ? ({ testID } as Record<string, string>) : {})}
      style={{ ...styles.flexRow, alignItems: "center", ...style }}
    >
      <ResumePDFText style={{ marginRight: spacing[0.5] }}>
        {skill}
      </ResumePDFText>
      {[...Array(numCircles)].map((_, idx) => (
        <View
          key={idx}
          style={{
            height: "9pt",
            width: "9pt",
            marginLeft: "2.25pt",
            backgroundColor: rating > idx ? themeColor : "#d9d9d9",
            borderRadius: "100%",
          }}
        />
      ))}
    </View>
  );
};
