const React = require("react");
const { render, screen } = require("@testing-library/react");

jest.mock(
  "../../../react/jsx-runtime",
  () => require("react/jsx-runtime"),
  { virtual: true }
);

jest.mock(
  "../../../../react/jsx-runtime",
  () => require("react/jsx-runtime"),
  { virtual: true }
);

const reactPdfRendererMock = () => {
  const ReactModule = require("react");

  return {
    StyleSheet: {
      create: (styles) => styles,
    },
    View: ({ children, style, testID }) =>
      ReactModule.createElement(
        "div",
        { "data-testid": testID, style },
        children
      ),
    Text: ({ children, style, testID }) =>
      ReactModule.createElement(
        "span",
        { "data-testid": testID, style },
        children
      ),
    Link: ({ children, style, testID, src }) =>
      ReactModule.createElement(
        "a",
        { "data-testid": testID, href: src, style },
        children
      ),
  };
};

jest.mock("@react-pdf/renderer", () => {
  return reactPdfRendererMock();
});

jest.mock("../../../@react-pdf/renderer", () => reactPdfRendererMock(), {
  virtual: true,
});

jest.mock("../../../../@react-pdf/renderer", () => reactPdfRendererMock(), {
  virtual: true,
});

jest.mock(
  "components/Resume/ResumePDF/styles",
  () => ({
    styles: {
      flexRowBetween: { display: "flex" },
      flexCol: { display: "flex", flexDirection: "column" },
    },
    spacing: {
      "0.5": 2,
    },
  }),
  { virtual: true }
);

jest.mock(
  "components/Resume/ResumePDF/common",
  () => {
    const ReactModule = require("react");

    return {
      ResumePDFSection: ({ children, heading }) =>
        ReactModule.createElement(
          "section",
          null,
          heading ? ReactModule.createElement("h2", null, heading) : null,
          children
        ),
      ResumePDFBulletList: ({ items }) =>
        ReactModule.createElement(
          "ul",
          null,
          items.map((item, idx) =>
            ReactModule.createElement("li", { key: idx }, item)
          )
        ),
      ResumeFeaturedSkill: ({ skill, rating, testID }) =>
        ReactModule.createElement(
          "div",
          { "data-testid": testID },
          `${skill} (${rating}/5)`
        ),
    };
  },
  { virtual: true }
);

jest.mock(
  "../common",
  () => {
    const ReactModule = require("react");

    return {
      ResumePDFSection: ({ children, heading }) =>
        ReactModule.createElement(
          "section",
          null,
          heading ? ReactModule.createElement("h2", null, heading) : null,
          children
        ),
      ResumePDFBulletList: ({ items }) =>
        ReactModule.createElement(
          "ul",
          null,
          items.map((item, idx) =>
            ReactModule.createElement("li", { key: idx }, item)
          )
        ),
      ResumeFeaturedSkill: ({ skill, rating, testID }) =>
        ReactModule.createElement(
          "div",
          { "data-testid": testID },
          `${skill} (${rating}/5)`
        ),
    };
  }
);

jest.mock("../styles", () => ({
  styles: {
    flexRowBetween: { display: "flex" },
    flexCol: { display: "flex", flexDirection: "column" },
  },
  spacing: {
    "0.5": 2,
  },
}));

const { ResumePDFSkills } = require("../ResumePDFSkills");

describe("ResumePDFSkills", () => {
  it("falls back to text-first rendering for long featured skill labels", () => {
    render(
      React.createElement(ResumePDFSkills, {
        heading: "Skills",
        skills: {
          featuredSkills: [
            {
              skill: "Large Language Model Tooling and Multi-Agent Orchestration",
              rating: 5,
            },
            {
              skill: "Distributed Systems Reliability Engineering",
              rating: 4,
            },
            { skill: "", rating: 3 },
            { skill: "", rating: 2 },
            { skill: "", rating: 1 },
            { skill: "", rating: 0 },
          ],
          descriptions: ["Core stack: TypeScript, React, Node.js"],
        },
        themeColor: "#000000",
        showBulletPoints: true,
      })
    );

    expect(screen.queryByTestId("resume-featured-skills-widget")).toBeNull();
    expect(
      screen.getByText(
        "Large Language Model Tooling and Multi-Agent Orchestration (5/5)"
      )
    ).toBeTruthy();
    expect(
      screen.getByText("Distributed Systems Reliability Engineering (4/5)")
    ).toBeTruthy();
    expect(
      screen.getByText("Core stack: TypeScript, React, Node.js")
    ).toBeTruthy();
  });

  it("falls back to text-first rendering when there are too many featured skills", () => {
    render(
      React.createElement(ResumePDFSkills, {
        heading: "Skills",
        skills: {
          featuredSkills: [
            { skill: "TypeScript", rating: 5 },
            { skill: "React", rating: 4 },
            { skill: "Node.js", rating: 4 },
            { skill: "GraphQL", rating: 3 },
            { skill: "Playwright", rating: 4 },
            { skill: "", rating: 0 },
          ],
          descriptions: ["Platform: frontend and backend delivery"],
        },
        themeColor: "#000000",
        showBulletPoints: true,
      })
    );

    expect(screen.queryByTestId("resume-featured-skills-widget")).toBeNull();
    expect(screen.getByText("TypeScript (5/5)")).toBeTruthy();
    expect(screen.getByText("Playwright (4/5)")).toBeTruthy();
    expect(
      screen.getByText("Platform: frontend and backend delivery")
    ).toBeTruthy();
  });
});
