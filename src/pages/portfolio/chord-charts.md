---
{
  layout: "../../layouts/portfolio.astro",
  category: "github",
  title: "chord-charts",
  slug: "chord-charts",
  githubUrl: "https://github.com/hrgui/chord-charts-app",
  url: "https://chord-charts.vercel.app/",
  thumbnail: "/images/portfolio/chord-charts.png",
  iframe:
    { scrolling: "no", height: 530, src: "https://chord-charts.vercel.app/" },
  whatIDid: ["Create a web application to store chord charts for musicians"],
  technologiesUsed:
    [{ type: "JAVASCRIPT", value: 80 }, { type: "CSS", value: 20 }],
}
---

## About

As a musician that has to play different songs each week, it's hard to memorize the chord progressions and licks of a song. This mobile-first application stores chord charts of a song so that we can focus on playing rather than memorizing many songs. Also, it includes transposing keys, which allows songs to be sung in a different range.

The application relies on the system's file system just like VSCode for Web. Nothing is stored online.

## Tech stack in detail

- This is a Pure, offline web app in HTML/CSS/JavaScript
- CSS
  - Tailwind, daisyUI
- JavaScript
  - Build: Vite
  - Component Library: React
  - State Management: Redux, RTK-Toolkit with RTK-Query, [PouchDB](https://pouchdb.com/)
