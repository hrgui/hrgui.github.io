---
template: blog
path: /blog/github-step-summary.md
title: "What I use `$GITHUB_STEP_SUMMARY` for"
date: "7/4/2022"
excerpt: $GITHUB_STEP_SUMMARY is a useful step in Github Actions. What do I use it for?
---

In 05/09/2022, [Github Actions released `$GITHUB_STEP_SUMMARY`](https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/).

I use it for reporting code coverage. Writing it in a comment will always fail as comments cannot be greater than 65536 characters. I always exceed that.

Add this step to your Github Actions file, if you use [vitest](https://vitest.dev/):

```yml
- name: 🧪 Test
  run: |
    yarn test --silent --coverage
    echo "### Test Results 🧪 "  >> $GITHUB_STEP_SUMMARY
    echo "\`\`\`"  >> $GITHUB_STEP_SUMMARY
    yarn c8 report >> $GITHUB_STEP_SUMMARY
    echo "\`\`\`"  >> $GITHUB_STEP_SUMMARY
```

[Here's a sample result.](https://github.com/hrgui/hrgui.github.io/actions/runs/2613306882)

If you use [jest](https://jestjs.io/), just replace `yarn c8 report` with the output of `yarn test --silent --coverage`, like so:

```yml
- name: 🧪 Test
  run: |
    echo "### Test Results 🧪 "  >> $GITHUB_STEP_SUMMARY
    echo "\`\`\`"  >> $GITHUB_STEP_SUMMARY
    yarn test --silent --coverage >> $GITHUB_STEP_SUMMARY
    echo "\`\`\`"  >> $GITHUB_STEP_SUMMARY
```

However, you won't be able to see your tests run in Github Actions as they will be piped to the ENV variable. 🤔
