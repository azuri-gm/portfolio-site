---
title: Migrating to Next.js 13
excerpt: With the release of Next.js 13, there are several changes and improvements that developers should be aware of. In this guide, we'll discuss the steps involved in migrating to Next.js 13.
slug: migrating-to-next13
date: 2023-04-02
---

# Migrating to Next.js 13

Next.js is a popular React-based framework for building server-rendered applications. With the release of Next.js 13, there are several changes and improvements that developers should be aware of. In this guide, we'll discuss the steps involved in migrating to Next.js 13.

## Step 1: Upgrade to the latest version of Next.js

The first step is to upgrade your existing Next.js application to the latest version, which is Next.js 13 at the time of writing. You can do this by running the following command in your terminal:

```bash
npm install next@latest
```

Once the installation is complete, you can check the version of Next.js by running the following command:

```bash
npx next --version
```

## Step 2: Update dependencies

Next.js 13 comes with a number of updated dependencies, including React 18 and webpack 5. It's important to make sure that all your dependencies are compatible with these new versions.

You can update your dependencies by running the following command:

```bash
npm install
```

This will update all the dependencies in your package.json file to the latest versions.

## Step 3: Update configuration files

Next.js 13 introduces some changes to the configuration files. You may need to update your next.config.js file to make sure it's compatible with the new version of Next.js.

One important change is the removal of the basePath property. If you were using this property in your configuration, you'll need to remove it and update your application code accordingly.

## Step 4: Update your code

Next.js 13 introduces some changes to the way images are handled in the application. The next/image component now uses a new srcSet attribute instead of the old sizes attribute.

You'll need to update any instances of the sizes attribute to use srcSet instead.

## Step 5: Test your application

Once you've completed the above steps, it's important to thoroughly test your application to make sure everything is working as expected.

Make sure to check all the pages and components in your application and verify that they're rendering correctly.

## Conclusion

Migrating to Next.js 13 may seem like a daunting task, but by following the steps outlined in this guide, you can make the process much smoother.

By upgrading to the latest version of Next.js, updating your dependencies and configuration files, and updating your code to use the new image handling attributes, you can ensure that your application is compatible with the latest version of Next.js and taking advantage of all its new features and improvements.
