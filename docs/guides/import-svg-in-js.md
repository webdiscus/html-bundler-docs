---
sidebar_position: 5
title: Import SVG in JS
---

# Import SVG in JS

You don't need the [svg-url-loader](https://github.com/bhovhannes/svg-url-loader) anymore.
If you use it yet, remove this legacy loader from your configuration.
Since Webpack 5, you can use the native Webpack [Asset Modules](https://webpack.js.org/guides/asset-modules/),
which are supported by the Bundler Plugin.

### Replacement of `svg-url-loader` options

- [`encoding`](https://github.com/bhovhannes/svg-url-loader#encoding) - Use the `?inline` or `?inline=base64` query.
- `prefix` - Use the [output filename](https://webpack.js.org/guides/asset-modules/#custom-output-filename) option.
- [`limit`](https://github.com/bhovhannes/svg-url-loader#limit) - Use the [Rule.parser.dataUrlCondition](https://webpack.js.org/configuration/module/#ruleparserdataurlcondition) option.
- [`iesafe`](https://github.com/bhovhannes/svg-url-loader#iesafe) - The same as by `limit` using `Rule.parser.dataUrlCondition.maxSize = 4096`.
- [`stripdeclarations`](https://github.com/bhovhannes/svg-url-loader#stripdeclarations) - we wan't manipulate the SVG content, may be useful to read by [svgo](https://github.com/svg/svgo/issues/836).\
  Anyway [In XML 1.1, the declaration is mandatory](https://stackoverflow.com/a/7007781/1696030), therefore this option is senseless.


To handle SVG files define the module configuration:

```js
module: {
  rules: [
    {
      test: /\.svg/i,
      type: 'asset/resource',
      generator: {
        filename: 'img/[name].[hash:8][ext]',
      },
    },
  ],
}
```

## Import SVG file as output filename.

Using the module configuration as `asset/resource`, the imported SVG file will contain a output filename.


```js
import file from './image.svg';

console.log(file); // img/image.416b7e1d.svg
```

## Import SVG file as data URL.

The Bundler Plugin supports the `?inline` URL query to force load SVG file as a data URL.

> :::note
> The `inline` query works independent of used module type.

The `inline` query parameter supports values of encoding:
- `base64` - default, import SVG as base64-encoded data URL
- `escape` - import SVG as escaped data URL

To import SVG as base64-encoded data URL, use the `?inline=base64` or `?inline` query.

```js
import file from './image.svg?inline=base64';

console.log(file); // data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=
```

Import SVG as escaped data URL:

```js
import file from './image.svg?inline=escape';

console.log(file); // data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2...%3C%2Fsvg%3E
```
