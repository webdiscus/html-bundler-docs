---
sidebar_position: 7
title: Resolve in JSON value of attribute
---

# Resolve a reference in JSON value of an attribute 

For example, source images should be defined in the custom `data-image` attribute of the `a` tag:

```html
<a data-image='{ "imgSrc": "./pic1.png", "bgImgSrc": "./pic2.png" }' href="#" >
  ...
</a>
```

To resolve such files, just use the `require()` function:

```html
<a data-image='{ "imgSrc": require("./pic1.png"), "bgImgSrc": require("./pic2.png") }' href="#" >
  ...
</a>
```

Add to `sources` loader option the `data-image` attribute for the `a` tag:

```js
new HtmlBundlerPlugin({
  entry: {
    index: './src/index.html',
  },
  loaderOptions: {
    sources: [
      {
        tag: 'a',                   // specify the 'a' tag
        attributes: ['data-image'], // specify custom attribute for the 'a' tag
      },
    ],
  },
}),
```

The custom attribute will contains in the generated HTML the resolved output assets filenames:

```html
<a data-image='{ "imgSrc": "img/pic1.da3e3cc9.png", "bgImgSrc": "img/pic2.e3cc9da3.png" }' href="#" >
  ...
</a>
```
