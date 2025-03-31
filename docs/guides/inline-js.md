---
sidebar_position: 3
---

# Inline JS in HTML

There are two ways to inline CSS in HTML:

- inline all JS globally with `js.inline` [option](/plugin-options-js)
- inline single JS with `?inline` query added to a filename

The `inline` option can take the following values: `false`, `true` and `'auto'`.
For details see the [inline option](/plugin-options-js).

> :::note
>
> The individual `?inline` query parameter takes precedence over the globally `js.inline` option.\
> For example, if `js.inline = true` and in HTML a single file has the `?inline=false` query,
> this file will be extracted in an output file, while all other scripts will be inlined.

For example, there are two JS files:

_main.js_

```js
console.log('>> main.js');
```

_script.js_

```js
console.log('>> script.js');
```

There is the _./src/views/index.html_ with both script files:

```html
<html>
  <head>
    <script src="./main.js" defer="defer"></script>
  </head>
  <body>
    <h1>Hello World!</h1>
    <script src="./script.js"></script>
  </body>
</html>
```

## Inline all JS files

To inline all JS globally add the `js.inline` option:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: 'src/views/index.html',
      },
      js: {
        // injects compiled JavaScript as a `<script>` tag into DOM
        inline: true,
      },
    }),
  ],
};
```

The generated HTML contains inlined JS scripts:

```html
<html>
  <head>
    <script>
      (() => {
        'use strict';
        console.log('>> main.js');
      })();
    </script>
  </head>
  <body>
    <h1>Hello World!</h1>
    <script>
      (() => {
        'use strict';
        console.log('>> script.js');
      })();
    </script>
  </body>
</html>
```


## Inline a single JS file

Define the `js.filename` option:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: 'src/views/index.html',
      },
      js: {
        filename: 'js/[name].[contenthash:8].js', // Output JS filename
      },
    }),
  ],
};
```

To inline a single JS file, add the `?inline` URL query to a script file which you want to inline:

```html
<html>
  <head>
    <!-- file JS -->
    <script src="./main.js" defer="defer"></script>
    <!-- inline JS -->
    <script src="./script.js?inline"></script>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

The generated HTML contains inline JS already compiled via Webpack:

```html
<html>
  <head>
    <!-- file JS -->
    <script src="js/main.992ba657.js" defer="defer"></script>
    <!-- inline JS -->
    <script>
      (() => {
        'use strict';
        console.log('>> script.js');
      })();
    </script>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

> :::note
>
> If Webpack is started as `serve` or `watch`,
> the inlined JS code will contain additional HMR code.
> Don't worry it is ok, so works Webpack `live reload`.
>
> To enable the source map in inline JS set the Webpack option `devtool`.
