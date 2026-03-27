const en = {
  nav: {
    home: "Home",
    blog: "Blog",
    portfolio: "Portfolio",
  },
  footer: {
    bio: "Harman Goei (hrgui) is a developer that loves to make cool and awesome web applications. His strength is in HTML, CSS, JavaScript, but he is willing to code anywhere in the stack to make the web be awesome.",
    backToTop: "back to top?",
    copyright: "© {{year}} Harman Goei",
  },
  social: {
    github: "View My GitHub Profile",
    linkedin: "View My LinkedIn Profile",
  },
  hero: {
    commandBody: " about",
    prefix: "I build ",
    highlight: "cool and awesome",
    suffix: "web and mobile apps.",
    quickLinks: "// quick_links",
  },
  home: {
    sellPoints: {
      moduleLabel: "core",
      passion: {
        title: "Making the web awesome is my passion.",
        description:
          "I am a Software Engineer who loves building interactive web applications. I believe great apps should work smoothly and look clean, so people can focus on getting things done. Seeing users succeed with something I helped build is the most rewarding part of my work. I am always refining the experience to make each product better than before.",
      },
      versatile: {
        title: "I will work with anything... to make the web work.",
        description:
          "Throughout my career, I have taken on unfamiliar and challenging problems. I have contributed to backend systems, automation platforms, and mobile applications across very different codebases. Some were clean, some were heavily patched, but I focus on improving the developer experience so teams can build and ship with confidence.",
      },
      offWork: {
        title: "While my code is compiling...",
        description:
          "Outside of coding, I play guitar and enjoy Japanese animation (anime). Both constantly fuel my creativity and inspire how I think about building products. I often learn anime theme songs on guitar, and that mix of music and storytelling keeps my ideas fresh. When I can bring those creative influences into software, I do my best work.",
      },
    },
    technicalSkills: {
      moduleLabel: "module_01 // tech_stack",
      heading: "Core Proficiencies",
      javascript: {
        title: "JavaScript",
        subtitle: "LOGIC_ENGINE_V8",
      },
      htmlCss: {
        title: "HTML/CSS",
        subtitle: "STRUCTURAL_UI_CORE",
      },
      other: {
        title: "JACK OF ALL TRADES",
        subtitle: "OTHER_TECH_SKILLS_I_HAVE",
      },
    },
    education: {
      moduleLabel: "module_02 // education",
      heading: "Education",
      imgAlt: "Open {{title}} in a new tab",
      usc: {
        title: "University of Southern California",
        description:
          "Bachelor of Science (B.S.), Computer Science and Engineering, Magna Cum Laude",
      },
    },
  },
  portfolio: {
    showcase: {
      moduleLabel: "module_03 // portfolio",
      heading: "Portfolio",
      description:
        "Built in the digital underground: apps, UI experiments, and creative code modules I designed and shipped, from React tools to interactive front-end prototypes.",
      viewAction: "View",
      viewOnGithub: "View on GitHub",
      viewOnGithubShort: "View on Github",
      viewItem: "View {{title}}",
    },
    entry: {
      projectLabel: "project_entry // live_record",
      externalLinksLabel: "external_links",
      openDemo: "Open Demo",
      viewGithubCode: "View GitHub Code",
      visitUrl: "Visit {{url}}",
      impactLabel: "impact_log // execution",
      notesLabel: "project_notes // context",
    },
    technologiesUsed: {
      heading: "Technologies Used",
      empty: "No technology data available.",
    },
    whatIDid: {
      heading: "What I Did",
    },
  },
  blog: {
    posts: {
      newBadge: "New",
      executeRead: "Execute_Read ->",
      readMore: "Read_More ->",
      noPosts: "No posts available.",
    },
    subHeader: {
      entryRecord: "ENTRY_RECORD",
      hiddenDraft: "Hidden Draft",
      hiddenWarning:
        "You are looking at a hidden post. Remove `hidden: true` or set it to `false` to publish this post.",
    },
  },
} as const;

type DeepString<T> = {
  readonly [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};
export type Translation = DeepString<typeof en>;
export default en;
