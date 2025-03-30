---
sidebar_position: 5
---

# How to configure `splitChunks`

Webpack tries to split every entry file, include template files, which completely breaks the compilation process in the plugin.

To avoid this issue, you must specify which scripts should be split, using `optimization.splitChunks.cacheGroups`:

```diff
module.exports = {
  optimization: {
    splitChunks: {
-     chunks: 'all', // <= DO NOT use this here
      cacheGroups: {
        scripts: {
          test: /\.(js|ts)$/, // <= IMPORTANT: split only script files
+         chunks: 'all', // <= DEFINE it here only
        },
      },
    },
  },
};
```

> :::note
>
> In the `test` option must be specified all extensions of scripts which should be split.

> :::warning
>
> DO NOT use the `chunks: 'all'` option globally!
>
> The `splitChunks.chunks: 'all'` option splits all types of chunks, but it make no sense, because we need split only scripts.
> Templates, CSS, images and other assets can't be split.
>
> Define `chunks: 'all'` only in a cache group where is specified the `test` option for your scripts.
>
> ‼️ The `splitChunks.chunks` option will be automatically removed, because some assets can't be resolved or output files may be corrupted!

See details by [splitChunks.cacheGroups](https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroups).

For example, in a template are used the scripts and styles from `node_modules`:

```html
<html>
  <head>
    <title>Home</title>
    <link href="bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <script src="bootstrap/dist/js/bootstrap.min.js" defer="defer"></script>
  </head>
  <body>
    <h1>Hello World!</h1>
    <script src="./main.js"></script>
  </body>
</html>
```

> :::note
>
> In the generated HTML, all script tags remain in their original places, and the split chunks will be added there
> in the order in which Webpack generated them.

In this use case the `optimization.splitChunks.cacheGroups.{cacheGroup}.test` option must match exactly only JS files from `node_modules`:

```js
module.exports = {
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/].+\.(js|ts)$/, // <= IMPORTANT: split only script files
          chunks: 'all', // <= DEFINE it here only
        },
      },
    },
  },
};
```

> :::warning
>
> If you will to use the `test` as `/[\\/]node_modules[\\/]`, without extension specification,
> then Webpack concatenates JS code together with CSS in one file and Webpack compilation will failed or generate files with a wrong content.
> Webpack can't differentiate CSS module from JS module, therefore you MUST match only JS files.
