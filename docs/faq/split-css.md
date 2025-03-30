---
sidebar_position: 4
---

# How to split CSS files

> :::warning
>
> Splitting CSS to many chunks is principally impossible. Splitting works only for JS files.

Using the bundler plugin, all your style source files should be specified directly in the template.
You can import style files in JavaScript, like it works using the `mini-css-extract-plugin` and `html-webpack-plugin`,
but it is a **bad practice** and processing is **slower**.

You can separate the styles into multiple bundles yourself.

For example, there are style files used in your app:

```
- components/banner/style.scss 150 KB
- components/button/style.scss  50 KB
- components/menu/style.scss    50 KB
- components/modal/style.scss  100 KB
- components/panel/style.scss  100 KB
- styles/main.scss  250 KB
```

We want to have a bundle file ~250 KB, then create the bundles manually:

_styles/bundle01.scss_ 200 KB

```scss
@use '../components/banner/style.scss';
@use '../components/button/style.scss';
```

_styles/bundle02.scss_ 250 KB

```scss
@use '../components/menu/style.scss';
@use '../components/modal/style.scss';
@use '../components/panel/style.scss';
```

Add the bundles in the template:

```html
<html>
  <head>
    <title>Home</title>
    <link href="./styles/bundle01.scss" rel="stylesheet" />
    <link href="./styles/bundle02.scss" rel="stylesheet" />
    <link href="./styles/main.scss" rel="stylesheet" />
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

If you use vendor styles in your style file, then vendor styles will not be saved to a separate file, because `sass-loader` generates one CSS bundle code.

_styles.scss_

```scss
@use 'bootstrap/scss/bootstrap';
body {
  color: bootstrap.$primary;
}
// ...
```

If you want save module styles separate from your styles, then load them in a template separately:

```html
<html>
  <head>
    <title>Home</title>
    <!-- include module styles -->
    <link href="bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <!-- include your styles -->
    <link href="./style.scss" rel="stylesheet" />
  </head>
  <body>
    <h1>Hello World!</h1>
    <script src="./main.js"></script>
  </body>
</html>
```
