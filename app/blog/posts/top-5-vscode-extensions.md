---
title: My top 5 used VS Code extensions
excerpt: In this post I'll share my top 5 VSCode extensions that help me stay productive while working daily. From automating tasks to formatting your code, these extensions will help you stay on top of your game!
slug: top-5-vscode-extensions
date: 2022-12-24
description: In this post I'll share my top 5 VSCode extensions that help me stay productive while working daily. From automating tasks to formatting your code, these extensions will help you stay on top of your game!
tags: ['vscode', 'productivity', 'extensions', 'development']
author: 'Eduardo Gaytan'
image: '/top-5-vscode-extensions.png'
---

Visual Studio Code, which is maintained by Microsoft, is one of the most **popular open source** code editors currently available. Perhaps one of the reasons for this widespread adoption is the extensive ecosystem of extensions that currently exists. While some IDEs may have the functionality that these extensions provide, the customization potential alone makes it a very attractive offering for all text editor users.

As a software engineer who has spent countless hours refining my development environment, I have discovered that the right extensions can transform your coding experience from frustrating to efficient. The extensions I am about to share have become indispensable tools in my daily workflow, each serving a specific purpose that addresses common pain points developers face.

In this comprehensive guide, we will explore the top 5 extensions I believe all web developers can benefit from. I will go over what they do, how they can make your coding journey more productive, and why they deserve a place in your VS Code setup. Let's jump right in!

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode 'Quokka JS marketplace')

## Prettier

If you haven't heard about it, [Prettier](https://prettier.io/) is an opinionated code formatter that supports most commonly used programming languages. This powerful tool allows teams to standardize code styles and save time and energy for developers by eliminating debates over formatting preferences.

Code formatting consistency is crucial for maintaining readable codebases, especially when working in teams. Without a standardized approach, developers often spend valuable time manually formatting code or engaging in lengthy discussions about style preferences. Prettier eliminates these concerns by automatically applying consistent formatting rules across your entire project.

This extension will help you get accustomed to setting it up and enable you to accomplish things like automatically fixing formatting issues in your code, correcting the mix of single and double-quotes, or addressing irregular use of semicolons. The beauty of Prettier lies in its opinionated nature – it makes decisions for you, ensuring that your code follows consistent patterns without requiring constant manual intervention.

Beyond basic formatting, Prettier also handles more complex scenarios such as line wrapping, indentation levels, and bracket placement. This comprehensive approach means that regardless of how different developers write their initial code, the final result will always follow the same formatting standards.

> Some of the supported technologies include: JavaScript, TypeScript, Java, JSON, CSS, HTML, Vue, Angular, Markdown, YAML, and many more.

**Pro tip**: Configure Prettier to format on save to maximize its effectiveness. This ensures that every file you work on is automatically formatted according to your team's standards without any additional effort.

## GitLens

This extension combines the capabilities of Git and empowers them within the text editor. It allows you to learn who, why, and when code was changed within the repository, all while showing you the evolution of the codebase within the explorer view.

Understanding the history and context of code changes is essential for effective collaboration and debugging. GitLens transforms VS Code into a powerful Git visualization tool that provides insights that would otherwise require multiple terminal commands or external Git clients to access.

The extension seamlessly integrates Git information directly into your editor interface, making it easy to understand the story behind every line of code. Whether you're trying to understand why a particular change was made, who to contact about a specific feature, or how a piece of code has evolved over time, GitLens provides this information at your fingertips.

It also includes other valuable features such as:

**History revision navigation** allows you to easily browse through different versions of files and see how they have changed over time. This is particularly useful when you need to understand the evolution of a feature or track down when a bug was introduced.

**Git Blame** functionality shows you who last modified each line of code, along with the commit message and timestamp. This information is invaluable when you need to understand the context behind specific changes or when you need to reach out to the original author for clarification.

**Status Bar integration** provides further information about the current Git history, including details about the current branch, pending changes, and recent commits. This gives you a comprehensive overview of your repository's state without leaving the editor.

The extension also offers advanced features such as interactive rebase support, commit graph visualization, and detailed diff views that make complex Git operations more accessible to developers of all skill levels.

## Path Intellisense

This is a seemingly simple, yet incredibly powerful extension. Essentially what it does is autocomplete the path to whatever file you're typing. While this might sound like a minor convenience, it addresses one of the most common sources of frustration in development: incorrectly typed file paths.

Manual path typing is prone to errors, especially in large projects with deep directory structures. A single typo in a file path can break imports, cause build failures, or lead to runtime errors that can be difficult to debug. Path Intellisense eliminates this problem by providing intelligent suggestions as you type.

The extension works across various file types and contexts, including import statements, require calls, image sources, and any other scenario where you need to reference a file path. It understands your project structure and provides relevant suggestions based on the current context.

Beyond error prevention, Path Intellisense also significantly speeds up development by reducing the time spent navigating project structures to find the correct file paths. Instead of manually browsing through directories or copying paths from the file explorer, you can simply start typing and select from the intelligent suggestions.

The extension is particularly valuable in large codebases where remembering exact file locations becomes challenging. It also helps maintain consistency in path formatting across your project, which is essential for team collaboration.

## Import Cost

This extension displays the estimated size of an import package directly in your editor. In my opinion, this is a very powerful tool because it helps developers keep track of the size of all added dependencies, which is crucial for maintaining optimal application performance.

Bundle size has become increasingly important in modern web development, as larger bundles directly impact loading times and user experience. Many developers unknowingly import large libraries for simple functionality, significantly increasing their application's size without realizing the impact.

Import Cost provides immediate visual feedback about the size implications of your import statements. When you import a module, the extension calculates and displays the estimated size right next to the import statement. If the import is particularly large, it will show a prominent warning in red color so you won't miss it.

This real-time feedback encourages developers to make informed decisions about their dependencies. For example, you might discover that importing an entire utility library for a single function adds hundreds of kilobytes to your bundle. This knowledge empowers you to seek lighter alternatives or import only the specific functions you need.

The extension also helps with performance optimization by making bundle size considerations a natural part of the development process rather than something you discover only during build analysis. This proactive approach to dependency management leads to more efficient applications and better user experiences.

## Quokka.js

This extension allows you to quickly prototype code in a playground environment within VS Code. While this extension has a paid version with additional features, the free version provides substantial value for developers who need to test code snippets or explore JavaScript concepts.

Rapid prototyping and experimentation are essential aspects of modern development. Whether you're testing a new algorithm, exploring API responses, or debugging complex logic, having an immediate feedback loop accelerates the development process significantly.

The free version of Quokka.js offers several powerful features that make it an indispensable tool for JavaScript developers:

**Inline reporting** provides immediate feedback about your code execution, displaying results directly within the editor. This eliminates the need to switch between your editor and browser console or terminal to see output.

**Real-time code execution** shows you the result of your code as you type, creating an interactive development experience. This is particularly valuable when working with complex expressions or when you need to understand how different inputs affect your code's behavior.

**Runtime values and rich output formatting** present execution results in a clear, readable format that makes it easy to understand what your code is doing. This includes support for objects, arrays, and other complex data structures.

The extension essentially transforms VS Code into a JavaScript playground where you can experiment freely without the overhead of setting up separate test files or switching to external tools. This capability is particularly valuable for learning new JavaScript features, testing library functions, or debugging complex logic.

## Maximizing Your VS Code Experience

As you can see, we are barely scratching the surface of what customizing VS Code can look like. This flexibility is excellent because it permits you to match your editor to your current needs and workflow preferences.

Each of these extensions addresses specific pain points that developers encounter regularly. Prettier eliminates formatting discussions and ensures consistency, GitLens provides essential Git context, Path Intellisense prevents typing errors, Import Cost promotes performance consciousness, and Quokka.js enables rapid experimentation.

The key to getting the most value from these extensions is to configure them properly for your workflow. Take time to explore their settings, customize their behavior to match your preferences, and integrate them into your daily development routine. Remember that the goal is not to install every available extension, but to thoughtfully select tools that genuinely improve your productivity and code quality.

As your development skills grow and your projects become more complex, you may find yourself needing additional extensions to address new challenges. The VS Code marketplace offers thousands of extensions covering everything from language support to deployment tools, ensuring that your editor can evolve with your needs.

By investing time in properly configuring your development environment with these essential extensions, you create a foundation for more efficient, enjoyable, and productive coding sessions. The initial setup time is minimal compared to the hours you will save and the frustration you will avoid throughout your development career.
