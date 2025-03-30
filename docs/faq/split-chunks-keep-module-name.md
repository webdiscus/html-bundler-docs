---
sidebar_position: 6
---

# How to keep package name for split chunks

To save split chunks under a custom name use `optimization.splitChunks.cacheGroups.{cacheGroup}.name` as function.

For example, many node modules are imported in the `main.js`:

```js
import { Button } from 'bootstrap';
import _, { map } from 'underscore';
// ...
```

There is a template used the `main.js` _./src/views/index.html_:

```html
<html>
  <head>
    <!-- include source script -->
    <script src="./main.js" defer="defer"></script>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

Then, use the `optimization.splitChunks.cacheGroups.{cacheGroup}.name` as following function:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: 'src/views/index.html',
      },
      js: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[id].[contenthash:8].js',
      },
    }),
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      maxSize: 1000000, // split chunks bigger than 100KB, defaults is 20KB
      cacheGroups: {
        app: {
          test: /\.(js|ts)$/, // <= IMPORTANT: split only script files
          chunks: 'all', // <= define it only in a cache group
          name({ context }, chunks, groupName) {
            // save split chunks of the node module under package name
            if (/[\\/]node_modules[\\/]/.test(context)) {
              const moduleName = context.match(/[\\/]node_modules[\\/](.*?)(?:[\\/]|$)/)[1].replace('@', '');
              return `npm.${moduleName}`;
            }
            // save split chunks of the application
            return groupName;
          },
        },
      },
    },
  },
};
```

> :::warning
>
> The group name MUST be different from the script names used in the template.
> Otherwise, a chunk name conflict occurs.
>
> For example,
> if you are already using `main.js` in the template, the group name should not be `main`.
> Take another name, e.g. `app`.

The split files will be saved like this:

```
dist/js/runtime.9cd0e0f9.js
dist/js/npm.bootstrap.f69a4e44.js <- split chunks of node modules
dist/js/npm.underscore.4e44f69a.js
dist/js/main.3010da09.js <- base code of main script
dist/js/app-5fa74877.7044e96a.js <- split chinks of main script
dist/js/app-d6ae2b10.92215a4e.js
dist/js/app-5fa74877.1aceb2db.js

```
