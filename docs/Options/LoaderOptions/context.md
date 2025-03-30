---
sidebar_position: 2
slug: context
title: context
tags: [template, context, loader options]
---

# Context directory

Type: `string` Default: `undefined`

The `context` option allow to resolve an asset file without leading `/` root path.

For example, there are project files:

```
project/src/views/index.html
project/src/styles/style.scss
project/src/images/logo.png
otherDir/stock-photos/cologne.png // <= file outer your project directory
```

You can use the [root](/loader-options-root) option to use assets in your project directory
and define the `context` option to use assets outer your project directory:

```js
new HtmlBundlerPlugin({
  entry: {
    index: 'src/views/index.html',
  },
  loaderOptions: {
    root: path.resolve(__dirname, 'src'),
    context: path.resolve(__dirname, '../otherDir'),
  },
});
```

Now you can use the leading `/` for the assets in your project and w/o `/` for assets from outer directory:

```html
<html>
  <head>
    <link href="/styles/style.scss" rel="stylesheet" />
  </head>
  <body>
    <h1>Hello World!</h1>
    <img src="/images/logo.png" />
    <img src="stock-photos/cologne.png" />
  </body>
</html>
```
