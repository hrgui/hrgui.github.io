export const GITHUB_URL = "https://www.github.com/hrgui";
export const LINKEDIN_URL = "https://www.linkedin.com/in/hrgui";

export const siteTitle = "hrgui";
export const threeSellPoints = [
  {
    title: "Making the web awesome is my passion",
    description: `I am a Software Engineer who loves to make interactive web
    applications. I believe web applications should function great. It
    should look pleasing to the eye for the best user experience. When
    people get stuff done in the apps I have worked on, it really gives me
    that sense of nirvana. It doesn't just stop there. I always try to
    improve applications and their experiences to be the best as possible
    as they can be.`,
  },
  {
    title: "I will work with anything... to make the web work.",
    description: `In my career, I have also had to work on things unknown and
    challenging to me. I have contributed to web backend systems,
    automation platforms, and mobile applications of all kinds and sorts.
    Some of them were pleasant, some of them were frankensteined
    applications. I always try to help contribute making all developer
    experiences great, so everyone can have great developer experiences.`,
  },
  {
    title: "While my code is compiling...",
    description: `I love to play my guitar. I love to come up with new awesome guitar
    licks. I love to watch Japanese animation (anime). All this further
    stimulates my creativity. Sometimes, I like to combine the two. I
    would end up learning how to play that favorite theme song in that
    anime. A dream of mine is if I could combine some of my hobbies and my
    coding, I will give my 110% to make that experience totally awesome.`,
  },
];

export const technicalSkills = [
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

export const education = [
  {
    key: "usc",
    url: "https://www.usc.edu",
    imgSrc: "/images/usc.png",
    title: "University of Southern California",
    description: `Bachelor of Science (B.S.), Computer Science and Engineering,
    Magna Cum Laude`,
    timeframe: { start: 2010, end: 2013 },
  },
];
