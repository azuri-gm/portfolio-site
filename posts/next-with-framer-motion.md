---
title: Using framer-motion with Next.js
excerpt: A few months ago, I decided to rebuild my site from scratch, while building it, I decided that it would improve the user experience to add animations to the page transitions and the elements within it. In this post, I'll talk about my experience using framer-motion.
slug: framer-motion
date: 2022-10-28
---

# Framer Motion

> A production-ready motion library for React.
>
> ***https://www.framer.com/motion***

It's a library that enables the animations of React components on a page and while the component is entering and also leaving.

Framer Motion can do all of the following:

- Spring animations
- Simple keyframes syntax
- Gestures (drag/tap/hover)
- Layout and shared layout animations
- SVG paths
- Exit animations
- Server-side rendering
- Variants for orchestrating animations across components
- CSS variables

Read more about Framer Motion and view examples on [**their website**](https://www.framer.com/motion/).

# Animating Next.js page transitions

As well as making user-triggered animations, Framer Motion can animate a component when it is mounting (entering) and unmounting (leaving). I use this capability to animate the components that come and go when the page changes. In Next.js terms, this is everything apart from \_app.js - so all pages and other components. Where possible, using `app.js` to persist layouts between page changes will reduce the amount of rendering that React has to do each time the page changes - potentially improving your app performance.
Preparing the codebase

Before I added any animations to my website I did two pieces of refactoring:

1. Moved common components that shouldn't animate on every page change into \_app.js. In my case, this meant moving the Header and Footer which you can see on GitHub.
2. Added a wrapper component to control the animation states within pages. On my website, it is the Layout component. Note the <motion.main> component which is specific to Framer Motion. In the rendered HTML output this will be an HTML main element, however, adding the motion. supplied by Framer Motion provides the ability to pass certain animation props such as transition, initial and animate.

```js
console.log('this is a test')
```

Entry animations

Looking at the Layout component you will see an object named variants (see below). Variants promote cleaner code by removing the requirement to add the animation object to the motion.main component. You can read more about them on the Framer Motion website.
