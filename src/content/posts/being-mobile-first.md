---
title: "What does it mean to be mobile first?"
date: "9/16/2022"
excerpt: Here's my take on what mobile-first means.
---

# The scenario

1. We want a red background in mobile.
2. We want a green background in tablet and desktop.

# Is this mobile-first?

```css
body {
  background: green;
}

// This applies from 0px to 480px
@media (max-width: 480px) {
  body {
    background: red;
  }
}
```

No.

# Is this mobile-first?

```css
body {
  background: red;
}

// This applies from 480px onwards
@media (min-width: 480px) {
  body {
    background: green;
  }
}
```

Yes.

# Conclusion

Developers often code **desktop-first** rather than **mobile-first.**

I was like that until I learned [tailwindcss](https://tailwindcss.com/).
