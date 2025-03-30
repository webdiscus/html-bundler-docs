---
sidebar_position: 3
---

# Inline CSS in HTML

There are 2 ways to inline CSS in HTML:

- inline all CSS with `css.inline` [option](#option-css)
- inline single CSS with `?inline` URL query

The `inline` option can take the following values: `false`, `true` and `'auto'`.
For details see the [inline option](#option-css).

> :::note
>
> The individual `?inline` query parameter takes precedence over the globally `css.inline` option.\
> For example, if `css.inline = true` and in HTML a single file has the `?inline=false` query,
> this file will be extracted in an output file, while all other styles will be inlined.

For example, there are two SCSS files:

_main.scss_

```scss
$bgColor: steelblue;
body {
  background-color: $bgColor;
}
```

_styles.scss_:

```scss
$color: red;
h1 {
  color: $color;
}
```

There is the _./src/views/index.html_ with both style files:

```html
<html>
  <head>
    <link href="./main.scss" rel="stylesheet" />
    <link href="./style.scss" rel="stylesheet" />
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

To inline all CSS globally add the `css.inline` option:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: 'src/views/index.html',
      },
      css: {
        // adds CSS to the DOM by injecting a `<style>` tag
        inline: true,
        // output filename of extracted CSS, used if inline is false
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
};
```

The generated HTML contains inlined CSS:

```html
<html>
  <head>
    <style>
      body {
        background-color: steelblue;
      }
    </style>
    <style>
      h1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

To inline a single CSS, add the `?inline` query to a style file which you want to inline:

```html
<html>
  <head>
    <!-- file CSS -->
    <link href="./main.scss" rel="stylesheet" />
    <!-- inline CSS -->
    <link href="./style.scss?inline" rel="stylesheet" />
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

The generated HTML contains inline CSS already processed via Webpack:

```html
<html>
  <head>
    <!-- file CSS -->
    <link href="/css/main.05e4dd86.css" rel="stylesheet" />
    <!-- inline CSS -->
    <style>
      h1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

> :::note
>
> To enable the source map in inline CSS set the Webpack option [`devtool`](https://webpack.js.org/configuration/devtool/#devtool).
