---
layout: ../../layouts/blog.astro
title: "How I Deploy my personal websites"
date: "8/7/2022"
excerpt: I'll talk about how I deploy my personal websites.
---

# For a completely no-cost static option - Github Pages

For building my personal websites, for a no-cost option, I use [Github Pages via Github Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow). The downside is that the code needs to be public.

Anywho, I just drop this file into `.github/workflows`, change Pages to use Github Actions rather than a branch, and I am set:

```yml
name: Build and Deploy for Github Pages
on:
  workflow_dispatch:
  push:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.6.0
        with:
          access_token: ${{ secrets.GITHUB_TOKEN }}

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3

      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1

      - name: ⚙️ Build
        run: yarn build

      - name: ⚙️ Setup Pages
        if: success()
        uses: actions/configure-pages@v1

      - name: 📁 Upload artifact
        if: success()
        uses: actions/upload-pages-artifact@v1
        with:
          # Upload entire repository
          path: "./dist"

  deploy:
    # Add a dependency to the build job
    needs: build

    # Grant GITHUB_TOKEN the permissions required to make a Pages deployment
    permissions:
      pages: write # to deploy to Pages
      id-token: write # to verify the deployment originates from an appropriate source

    # Allow one concurrent deployment
    concurrency:
      group: "pages"
      cancel-in-progress: true

    # Deploy to the github-pages environment
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    # Specify runner + deployment step
    runs-on: ubuntu-latest
    steps:
      - name: 🚀 Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

Note that I am assuming that `./dist` is my output here.

# For a somewhat private option - Vercel

My next line in choice is [Vercel](https://vercel.com/). Unlike Github Pages, just install the Vercel App and have Vercel point to one of your repos. Then, Vercel will know what to do - or you'll need to provide what the deploy, build and output folders are.

What's nice is that I get preview URLs per each branch. Excessive, but great. The only downside is that I believe there are limits.

# If I like to experiment and tinker on things - Cloudflare Workers or Cloudflare Pages

The I like to live dangerously option choice is [Cloudflare Workers](https://workers.cloudflare.com/) or [Cloudflare Pages](https://pages.cloudflare.com/). I haven't done this option in years, but the upside to this one is that it may perform like Vercel's Edge Functions - or even faster. This is because Cloudflare Workers deploys to many locations around the world, and will serve the closest to where you are.

There's no need to deploy to many locations. That's why I love it. Only downside to this is that I am not working with a Node environment here. I am working with a Cloudflare Workers, or Web Worker environment. It's the new way of thinking.
