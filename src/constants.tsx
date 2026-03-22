import type { JSX } from "preact";
export const GITHUB_URL = "https://www.github.com/hrgui";
export const LINKEDIN_URL = "https://www.linkedin.com/in/hrgui";

export const siteTitle = "hrgui";

type SellPoint = {
  title: string;
  description: string;
};

export const threeSellPoints: SellPoint[] = [
  {
    title: "Making the web awesome is my passion.",
    description: `I am a Software Engineer who loves building interactive web
    applications. I believe great apps should work smoothly and look clean,
    so people can focus on getting things done. Seeing users succeed with
    something I helped build is the most rewarding part of my work. I am
    always refining the experience to make each product better than before.`,
  },
  {
    title: "I will work with anything... to make the web work.",
    description: `Throughout my career, I have taken on unfamiliar and
    challenging problems. I have contributed to backend systems,
    automation platforms, and mobile applications across very different
    codebases. Some were clean, some were heavily patched, but I focus on
    improving the developer experience so teams can build and ship with
    confidence.`,
  },
  {
    title: "While my code is compiling...",
    description: `Outside of coding, I play guitar and enjoy Japanese
    animation (anime). Both constantly fuel my creativity and inspire how I think
    about building products. I often learn anime theme songs on guitar,
    and that mix of music and storytelling keeps my ideas fresh. When I can
    bring those creative influences into software, I do my best work.`,
  },
];

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
  title: string;
  description: string;
  timeframe: { start: number | string; end: number | string };
};

export const education: Education[] = [
  {
    key: "usc",
    url: "https://www.usc.edu",
    imgSrc: "/images/usc.webp",
    title: "University of Southern California",
    description: `Bachelor of Science (B.S.), Computer Science and Engineering,
    Magna Cum Laude`,
    timeframe: { start: 2010, end: 2013 },
  },
];
