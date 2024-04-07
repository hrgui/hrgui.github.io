---
title: "Do I know: Webpack?"
date: "9/11/2022"
excerpt: Does Harman know how to use Webpack? He just uses Vite for everything.
---

TLDR, to sum it up in one word:

# Yes

Do you want to know more? _Read below_.

---

In 2018, when I was a Software Architect for a UI team, I dabbled mainly in [Webpack](https://webpack.js.org/). Back then, the team used [Angular.js](https://angularjs.org/), [React.js](https://reactjs.org/). My mission was to figure out how to combine the two. That's when I had to really learn webpack. I was finding that my initial implementation was very slow. Developers were complaining it was taking 8 minutes to build, taking 1 minute to cold boot and taking a minute to change anything.

Developer experience is vital to a company. The worse a developer experience is, the slower things would be developed. That is why I spent more time than usual trying to figure things out. In the end of the story, it turned out `sass-loader`, `awesome-typescript-loader` was configured incorrectly. It had too wide of a file glob scope. When narrowing the scope, the 8 minutes became 1 minute to build. The 1 minute became about 10 seconds, and to change anything it was a matter of a few seconds. That was nirvana to me.

To help me debug the timings and the bundle sizes, I used the following

- [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
- [Speed Measure Plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)

I even figured out how to create Progress bars. I soon then realized that was a bad idea though. Printing things and tracking time was slowing the build time. So I stopped doing that.

# If you know how to use Webpack, why do you use Vite?

That is because one of my characteristics if you get to see me at work is that I am always **curious**. I am always very welcoming with things that improve our developer experience - and I am always the first willing to try it out.

In 2021, after dealing with another create-react-app application, for a moment of time, I changed the application to use [Vite](https://vitejs.dev/). Back then, I knew that browsers started having support for `<script type="module" src="index.js"></script>`, which allowed for ES modules to run. I could use `import ... from ...`! The downside was that in a HTTP 1.1 environment it was slow. Web applications that have a lot of product features have a deep tree of imports. Especially when the application relies on third party code, the tree expands even further. In HTTP 1.1, [only 6 requests can happen at a time for a connection to a domain](https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser). The next 6 will come afterward. That results in a very slow experience.

In HTTP 2, the protocol is different. [We only open 1 connection with the domain](https://stackoverflow.com/questions/36835972/is-the-per-host-connection-limit-raised-with-http-2). HTTP 1.1 required a connection open and closed per request. This makes it _virtually unlimited_ instead of 6 at a time. Neat.

Years before 2021, using that concept, I traveled the open source JavaScript and came across [Snowpack](https://www.snowpack.dev/). It did exactly what I wanted to do. It used script type module. However, I had a grim realization that the servers that I may potentially host at may not be ready for HTTP 2. That is when I held back from using it at the company I worked at. I only used it as an experiment for one of my personal projects. It never came to light because I knew that it eventually led to a bad experience for our users. Back then, not every browser supported script type module either.

Going back to 2021, that is when I came to [Vite](https://vitejs.dev/). I talked about [Vite](https://vitejs.dev/) before in my [New site who dis? Part 1: Build chain](/posts/new-site-who-dis-buildchain-part1/). What was different about Vite was that it only did script type module in development, provided a HTTP 2 server. When building for production, it relies on [Rollup](https://rollupjs.org/guide/en/) to bundle the application. This allowed for a great developer experience without gambling the assumption that users have a great browser. We can also say the same for having a great server, as HTTP 2 was still not everywhere back then.

# If you had to use Webpack again... how would you use it?

First, I assess the reasoning to why we use webpack. If it makes sense, then I stick with webpack. Otherwise, I would switch to vite.

I also assess the priorities that are currently in plate in the company. I assess if there is room to changing the buildchain to something else. A lot of assessments need to be done. We can't just change things quickly in a company. We have to think for our end users. Webpack and vite might have different build outputs. The different build outputs might impact the user experience as it may deter folks from using the website.

So if I assessed everything and it turns out yes, we need to stick with webpack, then I start thinking about how we can improve the build with just webpack. So let's talk about what I would do now in 2022 in webpack VS what I did before:

| File  | What I used to do                                                                                                                                                                               | What I do now                                                                 |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| JSX?  | Used [babel-loader](https://www.npmjs.com/package/babel-loader)                                                                                                                                 | Use [esbuild-loader](https://github.com/privatenumber/esbuild-loader)         |
| TSX?  | Used [ts-loader](https://github.com/TypeStrong/ts-loader) and [ForkTSCheckerWebpackPlugin](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin)                                        | Use [esbuild-loader](https://github.com/privatenumber/esbuild-loader) and TSC |
| SASS  | Used [sass-loader](https://www.npmjs.com/package/sass-loader) AND [node-sass-loader](https://www.npmjs.com/package/node-sass-loader)                                                            | I don't use SASS anymore, but if I have to, sass-loader is what I use.        |
| CSS   | Use [css-loader](https://webpack.js.org/loaders/css-loader/) and [postcss-loader](https://webpack.js.org/loaders/postcss-loader/)                                                               | Same                                                                          |
| Files | Used [file-loader](https://v4.webpack.js.org/loaders/file-loader/), [raw-loader](https://v4.webpack.js.org/loaders/raw-loader/) and [url-loader](https://v4.webpack.js.org/loaders/url-loader/) | Use [asset modules](https://webpack.js.org/guides/asset-modules/)             |

The rest of the things I look at [create-react-app](https://github.com/facebook/create-react-app) and [Next.js](https://nextjs.org/) and assess what they use and leverage that. I know there's MiniCssExtractPlugin, there's HTMLWebpackPlugin, and so many more things.

I could go on and on. I even created a [webpack boilerplate template](https://github.com/hrgui/my-webpack-boilerplate) for folks to look at.

# Concluding Thoughts

**Do I know how to use Webpack?** Yes.

**Would I use it today?** If I have to. If I don't, then I will use Vite, or leverage an already-existing webpack configuration like create-react-app or Next.js.

Otherwise, I would use vite. It makes a web application have a modern build toolchain. It knows how to support [Server Side Rendering](https://vitejs.dev/guide/ssr.html) and [Web Workers](https://github.com/Aslemammad/vite-plugin-cloudflare) with its API.
