import { View } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, url, github, summary, location } = profile;
  const contactEntries = [
    ["email", email],
    ["location", location],
    ["url", url],
    ["github", github],
  ] as const;

  const renderContactItem = (key: IconType | "url" | "github", value: string) => {
    let iconType = key as IconType;
    if (key === "url" || key === "github") {
      if (value.includes("github")) {
        iconType = "url_github";
      } else if (value.includes("linkedin")) {
        iconType = "url_linkedin";
      }
    }

    const shouldUseLinkWrapper = ["email", "url", "github", "phone"].includes(key);
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      if (!shouldUseLinkWrapper) return <>{children}</>;

      let src = "";
      switch (key) {
        case "email": {
          src = `mailto:${value}`;
          break;
        }
        case "phone": {
          src = `tel:${value.replace(/[^\d+]/g, "")}`;
          break;
        }
        default: {
          src = value.startsWith("http") ? value : `https://${value}`;
        }
      }

      return (
        <ResumePDFLink src={src} isPDF={isPDF}>
          {children}
        </ResumePDFLink>
      );
    };

    return (
      <View key={key} style={styles.profileContactItem}>
        <ResumePDFIcon type={iconType} isPDF={isPDF} />
        <Wrapper>
          <ResumePDFText>{value}</ResumePDFText>
        </Wrapper>
      </View>
    );
  };

  return (
    <ResumePDFSection style={{ marginTop: spacing["4"], gap: spacing["0"] }}>
      <View
        style={{
          ...styles.profileHeader,
          borderTopColor: themeColor,
        }}
      >
        <View style={styles.profileNameBlock}>
          <ResumePDFText
            bold={true}
            themeColor={themeColor}
            style={{ fontSize: "24pt", lineHeight: "1.05" }}
          >
            {name}
          </ResumePDFText>
        </View>
        {summary && (
          <View style={styles.profileSummaryBlock}>
            <ResumePDFText style={styles.profileSummary}>{summary}</ResumePDFText>
          </View>
        )}
        <View style={styles.profileContactRow}>
          {contactEntries.map(([key, value]) =>
            value ? renderContactItem(key, value) : null
          )}
        </View>
      </View>
    </ResumePDFSection>
  );
};
