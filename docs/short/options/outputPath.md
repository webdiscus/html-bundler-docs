# `outputPath`

**Type**: `string`

**Default**: Webpack's `output.path` configuration.

Specifies the output directory for HTML files.

**Possible values**:

- Absolute path to output directory.
- Relative path to Webpack's `output.path` configuration.

## Example

**Source file structure**:

```text
src/index.html
src/main.js
```

**Source HTML**:

```html
<!doctype html>
<html>
  <head>
    <script src="./main.js"></script>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

**Webpack Configuration**:

```js
const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "dist/"), // root output directory for all assets
  },
  plugins: [
    new HtmlBundlerPlugin({
      // Absolute HTML output directory
      outputPath: path.join(__dirname, "dist/example/"),
      // OR relative to output.path:
      // outputPath: 'example/',
      entry: {
        index: "./src/index.html", // => dist/example/index.html
      },
      js: {
        filename: "[name].bundle.js",
        outputPath: "assets/js/", // JS output path relative to output.path
      },
    }),
  ],
};
```

**Processed output file structure**:

```text
dist/example/index.html
dist/assets/js/main.bundle.js
```

**Generated HTML**:

```html
<!doctype html>
<html>
  <head>
    <script src="../assets/js/main.bundle.js"></script>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

## References

- Webpack [`output.path`][webpack-output.path-url]

[webpack-output.path-url]: https://webpack.js.org/configuration/output/#outputpath
