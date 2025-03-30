---
sidebar_position: 7
title: Resolve image in href
---

# Resolve image reference in href

For example, you want to link a small image as a preview to open the full-size image in a new tab or pop-up window.

A typical example:

```html
<!-- href contains HTML file -->
<a href="index.html">home</a> | <a href="about.html">about</a>

<!-- href contains image file, which should be resolved -->
<a href="./images/cat-fullsize.jpg" target="_blank">
   <img src="./images/cat-preview.jpg" />
</a>
```

To resolve images in the `href` attribute of a tag, just enable it using the [loaderOptions.sources](#loader-option-sources) option.

```js
loaderOptions: {
  sources: [
    {
      tag: 'a',
      attributes: ['href'],
    },
  ],
},
```

### Problem

All `href` attributes of all `<a>` tags will now be resolved,
which could cause an error if the `href` contained an HTML file, e.g. `<a href="index.html">`.

### Solution

Use the [filter](#loader-option-sources-filter) function to avoid resolving non-image files.

```js
loaderOptions: {
  sources: [
    {
      tag: 'a',
      attributes: ['href'],
      filter: ({ value }) => !value.endsWith('.html'), // return false to ignore *.html files
    },
  ],
},
```
