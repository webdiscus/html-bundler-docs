---
sidebar_position: 5
title: Load JS and CSS from package in template
---

# Load JS and CSS from package in template

Some npm packages specify compiled bundle files for the browser in the `package.json`.

For example:
- the [material-icons](https://github.com/marella/material-icons/blob/main/package.json) specifies the `browser ready` CSS file.
- the [bootstrap](https://github.com/twbs/bootstrap/blob/main/package.json) specifies the `browser ready` JS and CSS files.

You can use only the module name, the plugin automatically resolves `browser ready` files for script and style:

```html
<html>
<head>
  <!-- plugin resolves the bootstrap/dist/css/bootstrap.css -->
  <link href="bootstrap" rel="stylesheet">
  <!-- plugin resolves the bootstrap/dist/js/bootstrap.js -->
  <script src="bootstrap" defer="defer"></script>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

If you need to load a specific version of a file, use the module name and the path to that file:

```html
<html>
<head>
  <link href="bootstrap/dist/css/bootstrap.rtl.css" rel="stylesheet">
  <script src="bootstrap/dist/js/bootstrap.bundle.js" defer="defer"></script>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

> :::warning
>
> Don't use a relative path to `node_modules`, like `../node_modules/bootstrap`. The plugin resolves node module path by the name automatically.
