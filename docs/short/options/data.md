## `data`

**Type**: `object|string`

**Default**: `{}`

Defines data that is accessible in all templates.

Specified in one of two ways:

- As an `object`.
- As a `string` containing the path to a JavaScript or JSON file.

**Key Behaviors**:

- **Template-Specific Overrides**: Use [entry data](entry#data) to pass data to individual templates.
- **Merge Logic**: Template-specific data overrides matching properties in the global data object.
- **HMR Support**: Webpack detects changes only when `data` is a data file reference.

### Configuration Types

#### `object`

**Type**: `object`

Directly defines data as a JavaScript object.

**Limitations**:

- **HMR Support**: Requires Webpack restart to apply changes.

**Example**:

```js
// webpack.config.js
module.exports = {
  plugins: [
    new HtmlBundlerWebpackPlugin({
      entry: {
        index: "path/to/template.eta",
      },
      data: { title: "Page Title", description: "Page Description" },
    }),
  ],
};
```

#### `string`

**Type**: string

Specifies an absolute or relative path to a JSON or JavaScript file. For a JavaScript file,
ensure the module exports an object.

**Supported formats**:

- JavaScript
- JSON

**HMR Support**:

- Changes trigger Webpack recompilation if the file is included in watch options.

**Example**:

```js
// webpack.config.js
module.exports = {
  plugins: [
    new HtmlBundlerWebpackPlugin({
      entry: {
        index: "path/to/template.eta",
      },
      data: "path/to/renderData.json",
    }),
  ],
};
```

#### Key Notes

**Use Case Comparison**:

| `data`   | Best For              | HMR Support |
| -------- | --------------------- | ----------- |
| `object` | Static data           | No          |
| `string` | Dynamic/editable data | Yes         |

### Notes

**References**:

- Webpack uses the `context` option to resolve relative paths.

**References**:

- Webpack [`context`](https://webpack.js.org/configuration/entry-context/#context)
- Webpack [HMR](https://webpack.js.org/concepts/hot-module-replacement/#get-started)
