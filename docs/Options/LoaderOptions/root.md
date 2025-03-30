---
sidebar_position: 1
slug: /loader-options-root
title: root
tags: [template, root, loader options]
---

# Root directory

Type: `string|boolean` Default: `false`

The `root` option allow to resolve an asset file with leading `/` root path.

Defaults is disabled because the file with leading `/` is a valid URL in the public path, e.g. `dist/`.
The files with leading `/` are not processed.

Define the `root` option as the absolute path to the source directory to enable the processing.

For example, there are project files:

```
./src/views/index.html
./src/styles/style.scss
./src/scripts/main.js
./src/images/apple.png
```

Define the `root` loader option:

```js
new HtmlBundlerPlugin({
  entry: {
    index: 'src/views/index.html',
  },
  loaderOptions: {
    root: path.join(__dirname, 'src'),
  },
});
```

Now you can use the `/` root path for the source assets:

```html
<html>
  <head>
    <link href="/styles/style.scss" rel="stylesheet" />
    <script src="/scripts/main.js" defer="defer"></script>
  </head>
  <body>
    <h1>Hello World!</h1>
    <img src="/images/apple.png" />
  </body>
</html>
```
