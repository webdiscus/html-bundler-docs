# `entry`

**Type**: `EntryObject | EntryDescription[] | string`

**Default**: `[name].html`

Defines HTML templates as entry points for the plugin. These entries are processed to extract resources and generate
optimized output files. Use this option to configure single templates, directories, or complex multi-page setups.

**Valid values**:

- `string` Template directory reference
- `EntryObject` Named entry points
- `EntryDescription[]` Entry collection

## Template Directory Reference

**Type**: `string`

Specifies an absolute/relative path to the directory containing HTML templates.

**Features**:

- Recursively detects files matching [`test`](test#test) option.
- Inherits includes/excludes patterns from [`entryFilter`](entryFilter#entryfilter)
- Preserves source directory structure in the output.
- Simplifies bulk processing configuration.

**Example**:

```js
// webpack.config.js
module.exports = {
  plugins: [
    new HtmlBundlerWebpackPlugin({
      entry: "path/to/templates", // Processes all matching templates in this directory
    }),
  ],
};
```

## Named Entry Points

```typescript
type EntryObject = {
  [name: string]: EntryDescription | string;
};
```

**Properties**:

- `name` Output filename relative to [`outputPath`](outputPath#outputpath) configuration

**Valid values**:

- `string` Absolute/relative path to the source file.
- `EntryDescription` Single Entry Configuration

**Source file reference example**:

```js
// webpack.config.js
module.exports = {
  plugins: [
    new HtmlBundlerWebpackPlugin({
      entry: {
        index: "path/to/home.html", // Output: dist/index.html
        "subdir/about": "path/to/about.html", // Output: dist/subdir/about.html
      },
    }),
  ],
};
```

**Advanced entry configuration example**:

```js
// webpack.config.js
module.exports = {
  plugins: [
    new HtmlBundlerWebpackPlugin({
      entry: {
        index: { // Output: dist/index.html
          import: "path/to/home.html",
          data: { title: "Home Page" },
        },
        "subdir/about": { // Output: dist/subdir/about.html
          import: "path/to/about.html",
          data: { title: "About Page" },
        },
      },
    }),
  ],
};
```

## Entry collection

**Type**: `EntryDescription[]`

Explicit array format for granular control over entries.

**`EntryDescription` Requirements**:

- `import`: Required
- `filename`: Required
- `data`: Optional

**Example**:

```js
// webpack.config.js
module.exports = {
  plugins: [
    new HtmlBundlerWebpackPlugin({
      entry: [
        {
          import: "path/to/home.html",
          filename: "index.html",
          data: { title: "Home Page" },
        },
        {
          import: "path/to/about.html",
          filename: "about/index.html",
          data: { title: "About Page" },
        },
      ],
    }),
  ],
};
```

## `EntryDescription`

```ts
import type { AssetInfo, PathData } from "webpack";

type EntryDescription = {
  import: string;
  filename?: FilenameTemplate | string;
  data?: { [key: string]: any; } | string;
};

type FilenameTemplate = (pathData: PathData, assetInfo?: AssetInfo): string;
```

**Properties**:

- `import` Specifies an absolute or relative file path to the source file.
- `filename` Template-specified output filename. See [`filename`](filename#filename).
- `data` Template-specific data configuration.

**Example**:

```js
{
  import: 'src/views/about.html',
  filename: 'subdir/[name].[contenthash:8].html',
}
```

**Function Example**:

```js
{
  import: "path/to/template.html",
  filename: (pathData, assetInfo) => {
    // Using environment variable
    if (process.env.PUBLIC_URL === undefined) {
      return "index.html";
    }

    return "index.[contenthash:8].html";
  }
}
```

### `EntryDescription.data`

Type: `object | string`

Template-specific data that override the [global data](data#data).

**Configuration**:

- `object` Object-based data.
- `string` File reference data.

**Key Behaviors**:

- **Template-Specific scope**: Use [data](data#data) to pass data to all templates.
- **Merge Logic**: Template-specific data overrides matching properties in the global data object.
- **HMR Support**: Webpack detects changes only when data is a file path.

#### `EntryDescription.data` as `object`

**Type**: `object`

Directly defines data as a JavaScript object.

**Limitations**:

- **HMR Support**: Requires Webpack restart to reflect changes.

**Example**:

```js
{
  import: 'path/to/template.html',
  filename: 'path/output.html',
  data: { title: 'Page Title', description: 'Page Description' }
}
```

#### `EntryDescription.data` as `string`

**Type**: `string`

Specifies an absolute or relative path to a JSON or JavaScript file. For a JavaScript file,
ensure the module exports an object.

**Supported formats**:

- JavaScript
- JSON

**HMR Support**:

- Changes trigger Webpack recompilation if the file is included in watch options.

**Example**:

```js
{
  import: 'path/to/template.html',
  filename: 'path/output.html',
  data: 'path/to/renderData.json'
}
```

#### Key Notes

**Use Case Comparison**:

| `data`   | Best For              | HMR Support |
| -------- | --------------------- | ----------- |
| `object` | Static data           | No          |
| `string` | Dynamic/editable data | Yes         |

## Notes

- Webpack uses the `context` configuration to resolve relative paths.

**References**:

- Webpack [`context`](https://webpack.js.org/configuration/entry-context/#context)
- Webpack [HMR](https://webpack.js.org/concepts/hot-module-replacement/#get-started)
- Webpack [template strings](https://webpack.js.org/configuration/output/#template-strings)
