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
    },
    technicalSkills: {
      moduleLabel: "module_01 // tech_stack",
      heading: "Core Proficiencies",
    },
    education: {
      moduleLabel: "module_02 // education",
      heading: "Education",
      imgAlt: "Open {{title}} in a new tab",
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

export type Translation = typeof en;
export default en;
