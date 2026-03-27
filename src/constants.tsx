import type { JSX } from "preact";
export const GITHUB_URL = "https://www.github.com/hrgui";
export const LINKEDIN_URL = "https://www.linkedin.com/in/hrgui";

export const siteTitle = "hrgui";

type TechnicalSkillSection = {
  key?: string;
  title: string | JSX.Element;
  items: (string | TechnicalSkillSection)[];
};

export const technicalSkills: TechnicalSkillSection[] = [
  {
    key: "javascript",
    title: <span className="bg-yellow-300 text-black p-2">JavaScript</span>,
    items: [
      "Node.js",
      "React.js",
      "Astro",
      "Vite / ESBuild / SWC",
      "Webpack",
      "Vue.js",
      "...Vanilla",
    ],
  },
  {
    key: "html-css",
    title: (
      <>
        <span className="bg-red-600 p-2 text-white">HTML</span> /{" "}
        <span className="bg-blue-600 p-2 text-white">CSS</span>
      </>
    ),
    items: [
      "HTML5",
      {
        title: "CSS3 / CSS Preprocessors",
        items: [
          "CSS in JS - Emotion / Styled Components / JSS",
          "Tailwind, Utility First, or Atomic CSS",
          "CSS Modules",
          "SASS",
        ],
      },
    ],
  },
  {
    key: "other",
    title: <code>Other</code>,
    items: [
      "GraphQL",
      {
        title: "NoSQL",
        items: [
          "Firebase Realtime Database / Firestore",
          "MongoDB",
          "Any document store, (e.g. Local Storage, IndexedDB, PouchDB)",
        ],
      },
      {
        title: "SQL",
        items: [
          "PostgreSQL",
          "MySQL",
          "Google Cloud BigQuery",
          "Anything SQL based (e.g. SQLite3)",
        ],
      },
      {
        title: "Other Cloud / Google Cloud Platform",
        items: [
          "Google Cloud Storage",
          "Google Cloud PubSub",
          "Google Kubernetes Engine",
          "Cloudflare Workers",
        ],
      },
      {
        title: "Other Programming Languages",
        items: ["PHP", "Python", "Go"],
      },
    ],
  },
];

type Education = {
  key: string;
  url: string;
  imgSrc: string;
  timeframe: { start: number | string; end: number | string };
};

export const education: Education[] = [
  {
    key: "usc",
    url: "https://www.usc.edu",
    imgSrc: "/images/usc.webp",
    timeframe: { start: 2010, end: 2013 },
  },
];
