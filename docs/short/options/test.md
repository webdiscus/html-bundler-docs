# `test`

**Type**: `RegExp`

**Default**: Engine-dependent.

Defines a regular expression to match template files for processing.

## Default Behavior

Depends on the [`preprocessor`](preprocessor#preprocessor) configuration. Specifying a `preprocessor` as a supported
templating engine automatically assigns a corresponding file type pattern to the `test` option.

**Supported Preprocessors & Default Patterns**:

- `ejs` - `/\.(html|ejs)$/i`
- `eta` - `/\.(html|eta)$/i`
- `handlebars` - `/\.(html|hbs|handlebars)$/i`
- `nunjucks` - `/\.(html|njk)$/i`
- `pug` - `/\.(pug|jade)$/i`
- `tempura` - `/\.(html|hbs|tmpr)$/i`
- `twig` - `/\.(html|twig)$/i`

## Examples

**Preprocessor configuration**:

```js
new HtmlBundlerPlugin({
  preprocessor: "eta", // test: /\.(html|eta)$/i
}),
```

**Custom pattern**:

```js
new HtmlBundlerPlugin({
  test: /\.eta$/i
  preprocessor: "eta",
}),
```
