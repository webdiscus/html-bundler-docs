---
sidebar_position: 7
title: Resolve image in style attribute
---

# Resolve image reference in the `style` attribute

For example, there is the source image file defined in the `style` attribute as the background of the `div` tag:

```html
<div style="background-image: url(./pic1.png);"></div>
```

The source image file can be a file relative to the template or you can use a webpack alias to the image directory.

> :::note
>
> This is BAD practice. Use it only in special cases.
> The background image should be defined in CSS.

By default, the `style` attribute is not parsed and therefore needs to be configured:

```js
new HtmlBundlerPlugin({
  entry: {
    index: './src/index.html',
  },
  loaderOptions: {
    sources: [
      {
        tag: 'div',            // specify the tag where should be parsed style
        attributes: ['style'], // specify the style attribute
      },
    ],
  },
}),
```

The plugin resolves the `url()` value and replaces it in the generated HTML with the output filename:
```html
<div style="background-image: url(assets/img/pic1.d4711676.png);"></div>
```
