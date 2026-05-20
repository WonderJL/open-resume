import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumeFeaturedSkill,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeSkills } from "lib/redux/types";

export const ResumePDFSkills = ({
  heading,
  skills,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  skills: ResumeSkills;
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  const { descriptions, featuredSkills } = skills;
  const featuredSkillsWithText = featuredSkills.filter((item) => item.skill);
  const shouldUseFeaturedSkillGrid =
    featuredSkillsWithText.length > 0 &&
    featuredSkillsWithText.length <= 4 &&
    featuredSkillsWithText.every((item) => item.skill.length <= 24);
  const featuredSkillsPair = [
    [featuredSkillsWithText[0], featuredSkillsWithText[3]],
    [featuredSkillsWithText[1], featuredSkillsWithText[4]],
    [featuredSkillsWithText[2], featuredSkillsWithText[5]],
  ];
  const mergedDescriptions = shouldUseFeaturedSkillGrid
    ? descriptions
    : [
        ...featuredSkillsWithText.map((item) => item.skill),
        ...descriptions,
      ];

  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {shouldUseFeaturedSkillGrid && (
        <View
          {...({ testID: "resume-featured-skills-widget" } as Record<
            string,
            string
          >)}
          style={{ ...styles.flexRowBetween, marginTop: spacing["0.5"] }}
        >
          {featuredSkillsPair.map((pair, idx) => (
            <View
              key={idx}
              style={{
                ...styles.flexCol,
              }}
            >
              {pair.map((featuredSkill, idx) => {
                if (!featuredSkill) return null;
                return (
                  <ResumeFeaturedSkill
                    key={idx}
                    skill={featuredSkill.skill}
                    rating={featuredSkill.rating}
                    themeColor={themeColor}
                    testID="resume-featured-skill"
                    style={{
                      justifyContent: "flex-end",
                    }}
                  />
                );
              })}
            </View>
          ))}
        </View>
      )}
      <View style={{ ...styles.flexCol }}>
        <ResumePDFBulletList
          items={mergedDescriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFSection>
  );
};
