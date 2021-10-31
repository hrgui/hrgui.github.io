---
title: "New Site, who dis? Part 1: Build chain."
date: "10/30/2021"
excerpt: It's been a while, but hey, new look and feel for this site, and I'll describe my journey on how I got here.
---

I got a new job after my long hiatus, and I was so busy that I never had time to update this website. There were times that I wanted to post something, but I couldn't think of anything. There were times when I wanted to try a new thing, for this site, but I was never really fully committed to doing so. I'll describe this journey in this post, so buckle up!

# I decided to move away from Gatsby.

Why? Well, _well_, _well_, everytime I ran my Gatsby application, I suddenly have forgotten how a Gatsby application was supposed to run. Suprisingly, I also have had the worst of luck with Gatsby. For some reason, my Gatsby application would never work on my computer. `gatsby dev` would always error out, and I would have to constantly remove the cache, or do some weird thing I forgot. I mean, look at this:

```

File path: /projects/hrgui.github.io/src/templates/blogTemplate.tsx
Url path: /blog/react-class-vs-function-2-closures-and-memory.md
Plugin: none
error There was an error in your GraphQL query:

Cannot find module '../build/Release/onig_scanner.node'
Require stack:
- ./node_modules/oniguruma/src/oniguruma.js
- ./node_modules/vscode-textmate/release/main.js
- ./node_modules/gatsby-remark-vscode/src/createGetRegistry.js
- ./node_modules/gatsby-remark-vscode/src/index.js
- ./node_modules/gatsby-remark-vscode/index.js
- ./node_modules/gatsby-remark-vscode/src/graphql/highlight.js
- ./node_modules/gatsby-remark-vscode/gatsby-node.js
- ./node_modules/gatsby/dist/bootstrap/load-plugins/validate.js
- ./node_modules/gatsby/dist/bootstrap/load-plugins/load.js
- ./node_modules/gatsby/dist/bootstrap/load-plugins/index.js
- ./node_modules/gatsby/dist/services/initialize.js
- ./node_modules/gatsby/dist/services/index.js
- ./node_modules/gatsby/dist/state-machines/develop/services.js
- ./node_modules/gatsby/dist/state-machines/develop/index.js
- ./node_modules/gatsby/dist/commands/develop-process.js
- ./.cache/tmp-1036-MHWsEPb4wt6W

   1 | query usershrguiprojectshrguiGithubIosrctemplatesblogTemplateTsx3074273309($path: String!) {
   2 |   markdownRemark(frontmatter: {path: {eq: $path}}) {
>  3 |     html
     |     ^
   4 |     frontmatter {
   5 |       title
   6 |       date
   7 |     }
   8 |   }
   9 | }
  10 |
```

It literally compiles on Github Actions and on Vercel, but not on my computer.

# I wanted something that I wouldn't have to remember, how do I do this again?

Lately I've been building plain-jane React apps. I just had to whip up [Create-React-App (CRA)](https://reactjs.org/docs/create-a-new-react-app.html). Can it make blogs? It could, but it doesn't just feel natural. I would most likely whip up [react-router](https://reactrouter.com/), then probably [remarkjs](https://github.com/remarkjs/remark), then have React read Markdown on demand.

## Isn't reading Markdown on demand slow and **dangerous**?

That's the best we can do with Markdown and CRA unfortunately. CRA doesn't have ways to statically generate pages, so we would need the client, the browser request for the Markdown file. Ultimately, this is bad for SEO and performance. Despite it's something I know best, I did not do it. I did not want to go backwards.

# The new kid on the block: Vite and ESBuild.

One of the pain points in Frontend development is that the tooling chain, or Developer Experience (DX) _was_ slow. A typical React app would take about 40-50 seconds to run, and I guess I can say "my code is <s>compiling</s> <s>loading</s> transpiling" every time I had to rerun `yarn start`. Luckily, I was not the only one that felt this sentiment. A lot of my co-workers felt this way, a lot of the JavaScript community felt this way, and it wasn't only just running the app, but also installing the node_modules too, and then there's the build step that could be slow also. Sigh. That is a **huge** rabbit hole to go down to.

In Computer Science and Engineering, there's always a phrase where either you fight a huge gorilla, or a bunch of tiny gorillas. What did they call that again? **Divide and Conquer**?

So I figured, what if I put aside the node_modules problem for now? What if I focused on the `yarn start` first? One common problem that Frontend devs have to worry about is the amount of HTML, CSS, JavaScript to run for the application. In the old days, I used to just use a `index.html` file, then add `<script src="app.js"></script>` to the head. That works, and it still works today. People do it. This was about like 2000s, when people still didn't want to use JavaScript for everything. As time went along, people wanted more interactive applications, and reliable apps. Don't forget - it has to look pretty. So we added a thing called CSS. Added a lot of them, with the [Bootstrap framework](https://getbootstrap.com/). Still wasn't enough. Pages had to be interactive - did not want full page reloads. Can I just use vanilla JavaScript? Sure, you can. Just gotta make it work for IE 6, Chrome, Firefox, Safari, Opera, etc. They all interpret the DOM differently. Damn, if / else conditions all over the place for browsers. [JQuery](https://jquery.com/) came along, and that saved me time from writing something like that. All I did was add another script tag. But what about the `app.js`? How big is too big? :thinking:

I used to work with code where, yep, this `app.js` file, it's 10,000 lines of code. It's also wrapped in a try/catch block from beginning to end. The platform was Microsoft's JScript, which was derived from VBScript. The team I worked with thought that `On Error Resume Next` from VBScript was neat, so they did that in JScript also. It was a nightmare to work with. Whenever there was a problem, JScript only says `x is not defined`. It was a 10,000 line code file. Where is `x`? Thankfully, I've moved on, and the industry has moved on from that past. We get now stack traces, and we have ways to deal with 10,000 line code files. We can now `require()` or `import` other files. We still have to work with many browsers, so there was a period of time where we had to rely on other products like Grunt, Gulp, Browserify (CommonJS), RequireJS (AMD), Webpack (CommonJS/AMD/UMD/ESM), and those would just bundle it up to 1 or more files.

It was nice for a while, but then remember what I said about `node_modules`? How it was slow? Well since I can `require()` things, I can require a node_module. How many though? (Insert meme here)

Files generated would be about 10 megabytes, or 25, heck I even heard there was a 40 megabyte file that someone had to download to run an application. It is rough, but nobody got time to reinvent the wheel, so we just `require` all the things and go home.

We had to do that even when we ran the development process.

I was once interviewing for a company, and they had a test where I can say was somewhat modern but somewhat antiquated. I won't go into much details, but what I liked was they allowed the use of `<script type="module" />`. It didn't have to work with all the browsers, but that was a game changer. No longer I had to wait for bundling. No longer I had to actually install the app's node modules (only if i really wanted to). It was golden.

I lingered for that experience for my actual real-life work though. Work's driven by time and money, and work is never gonna pay the big bucks to reinvent everything. Luckily, I was not the only one that lingered fro script modules in development process. [Vite](https://vitejs.dev/) came along, and I think I found it on `/r/javascript`. I was like, I gotta replace my CRA app now. No mroe needing to have to wait 1 minute for my dev build. It was just going to pre-bundle everything and it'll take about 500 ms or so. Sometimes it amazes me, only 5 ms? okay. It was all thanks to [ESBuild](https://esbuild.github.io/), which was a part of Vite's internals.

Prior to Vite, I was looking [Snowpack](https://www.snowpack.dev/), but I didn't work in an environment or time where HTTP2 Server Push was a thing, so I had to download a waterfall of JavaScript for production. Tons of them due to node_modules. I can't sacrifice User Experience (UX). Vite just gave that compromise:

- `<script type=module />` for dev
- The old way of bundling for Prod (with [rollup](https://rollupjs.org/guide/en/)).

When I replaced my CRA buildchain with Vite, it was rough. The idea of `<script type=module />` works best with ES Modules, or only works with that I think, and some packages that I _downloaded_ to save time did not work. Yet, the open source community kept improving Vite. All I had to was keep updating Vite. I just kept on updating and updating, and now it just magically worked. It was usually some ESBuild thing that stopped me, but all I had to update was Vite.

# So it seems like you love Vite, did you build this site with it?

No, I did not. Vite doesn't have a stable way to do Static Site Generation (SSG). They just gave a [script to run](https://vitejs.dev/guide/ssr.html#pre-rendering-ssg) which wasn't the best experience. There wasn't a dedicated CLI yet. However, the community's great, and people built CLIs.

- [vite-plugin-ssr](https://vite-plugin-ssr.com/)
- [vitedge](https://vitedge.js.org/)

These packages were run by the community, and usually by 1-2 maintainers, but it was fun to see what was going on and see the OSS thriving in this realm. I didn't use these because remember this?

> I wanted something that I wouldn't have to remember, how do I do this again?

Had I chosen one of those packages, since not too many people have used them, it would have been difficult to find anything. I believe there some contender out there called [remix.run](remix.run), built by the same folks who maintain react-router, but as of today it's still not stable nor it is available in open source. I've heard good things about it though, and I am excited to see what it has to disrupt how we do things.

# So what did you build this site with?

I built this site with [Next.js](https://nextjs.org/). Next.js is something that fit the bill. It uses file system routing, so I wouldn't have to remember how the routes worked. The way it handles layouts is also intuitive, just use `[whateverNameYouWant].tsx`, and then you can read it from your app, whip up a layout, and boom the page is built with that layout.

Of course, I probably need to read up a thing or two about `next/router` for more advanced things, but that's only if I wanted to do more for this simple website of mine that showcases my blog and who I am. It has a great community, it has a great backing by the [Vercel company](https://vercel.com/) and a lot of people know that NextJS is what we call the standard that drove SSG and Server Side Rendering (SSR) home to folks. No longer the user has to wait for anything to load now. We can just pre-make all the HTML pages upfront with the CSS files, and **boom** the website is fast again.

I didn't have to learn a new Single Page Application methodology though. It's still React. They have a great example on how to read markdown-x files or markdown:

```tsx
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
};

export default function PostPage({ source, frontMatter }) {
  return (
    <div className="pt-28 p-6 container mx-auto">
      <div className="mb-14">
        <h5 className="text-gray-500 mb-4 font-mono leading-5">{frontMatter.date}</h5>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium">{frontMatter.title}</h1>
      </div>
      <div className="prose prose-md md:prose-lg lg:prose-xl">
        <main>
          <MDXRemote {...source} components={components} />
        </main>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.md`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
```

If i were to explain this:

1. `getStaticProps` feeds what was from the URL (through params) and how the file was named `[slug].tsx`. I also read `frontmatter` through [`gray-matter`](https://www.npmjs.com/package/gray-matter). [Read about `frontmatter` here](https://jekyllrb.com/docs/front-matter/) for the metadata for this page.
2. `getStaticPaths` is for when we want to do SSG. Next.js needs this to know out of all markdown files, what needs to be premade into individual HTML pages.
3. `PostPage` is simply the layout, and was fed to [`mdx-remote`](https://github.com/hashicorp/next-mdx-remote), which is how markdown-x files are interpreted in this.

# Now what if i told you, I did not have to write that much CSS for this new blog layout?

`prose prose-md md:prose-lg lg:prose-xl` is the only CSS class I had to maintain for this. I'll talk about this in the next part of my **New Site who dis** series. It'll be another long blogpost, and about how I feel about CSS. I have a lot to say about it.
