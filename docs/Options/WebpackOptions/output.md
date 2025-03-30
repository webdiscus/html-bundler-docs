---
sidebar_position: 1
---

Important Webpack options used to properly configure this plugin.

<a id="webpack-option-output" name="webpack-options-output"></a>
<a id="webpack-option-output-path" name="webpack-options-output-path"></a>

### `output.path`

Type: `string` Default: `path.join(process.cwd(), 'dist')`

The root output directory for all processed files, as an absolute path.\
You can omit this option, then all generated files will be saved under `dist/` in your project directory.

```js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  // ...
}
```


### `output.publicPath`

Type: `string|function` Default: `auto`

The value of the option is prefixed to every URL created by this plugin.
If the value is not the empty string or `auto`, then the option must end with `/`.

The possible values:

- `publicPath: 'auto'` - automatically determines a path of an asset relative of their issuer.
  The generated HTML page can be opened directly form the local directory and all js, css and images will be loaded in a browser.
- `publicPath: ''` - a path relative to an HTML page, in the same directory. The resulting path is different from a path generated with `auto`.
- `publicPath: '/'` - a path relative to `document root` directory on a server
- `publicPath: '/assets/'` - a sub path relative to `document root` directory on a server
- `publicPath: '//cdn.example.com/'` - an external URL with the same protocol (`http://` or `https://`)
- `publicPath: 'https://cdn.example.com/'` - an external URL with the `https://` protocol only

> :::warning
>
> If an incorrect value is specified you'll receive 404 errors while loading these resources.


### `output.filename`

Type: `string|function` Default: `[name].js`

The output filename for JS file.

> :::tip
> Highly recommended to define the `filename` in the Plugin option [`js.filename`](#option-js).

The output filename for CSS file is determined in the Plugin option [`css.filename`](#option-css).

Define output JS and CSS filenames in the Plugin option, in one place:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      js: {
        // output filename for JS
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // output filename for CSS 
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
  ],
};
```


### `output.chunkFilename`

Type: `string|function` Default: `[name].js`

The output filename for non-initial chunk files. Details see by [chunkFilename](https://webpack.js.org/configuration/output/#outputchunkfilename).

> :::tip
> Highly recommended to define the `chunkFilename` in the Plugin option [`js.chunkFilename`](#option-js).


```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      js: {
        // output filename for JS
        filename: 'js/[name].[contenthash:8].js',
        // output filename for JS chunks
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
      },
    }),
  ],
};
```
