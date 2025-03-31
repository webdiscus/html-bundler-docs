---
sidebar_position: 3
---

# How to disable resolving in commented out tag

In [default attributes](/plugin-options-sources#default-attributes), files will be resolved automatically, regardless of whether the tag is commented out or not.
This is not a bug, it is a feature for very fast attribute parsing.

If you commented out a tag and don't want to resolve files in the tag's [attributes](/plugin-options-sources#default-attributes), rename the attribute.
For example: `href` -> `x-href` or `src` -> `x-src`.

```html
<!-- <link x-href="./styles.scss" rel="stylesheet /> -->
<!-- <script x-src="./main.js" defer="defer"></script> -->
<!-- <img x-src="./image.png"> -->
```

If used any [template engine](/category/template-engines) (defaults is [Eta](/guides/preprocessor/eta))
then can be used [templating comments](https://eta.js.org/docs/intro/template-syntax) `<%/* ... */%>`.

```html
<%/* <link rel="stylesheet href="./style.scss" /> Single line comment w/o resolving */%>

<%/*
  Multiline comment w/o resolving of files in attributes
  <img src="./image1.png" />
  <img src="./image2.png" />
*/%>
```
The generated HTML will not contain templating comments.
