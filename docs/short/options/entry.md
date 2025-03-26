## `entry`

**Type**: `EntryObject | EntryDescription[] | string`

Defines HTML templates as entry points for the plugin. These entries are processed to extract resources and generate
optimized output files. Use this option to configure single templates, directories, or complex multi-page setups.

### Configuration Types

#### `string`

Specifies an absolute/relative path to the directory containing HTML templates.

**Features**:

- Recursively detects files matching [`test`](test#test) option.
- Preserves source directory structure in the output.
- Simple configuration for bulk processing.

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

#### `EntryObject`

```typescript
type EntryObject = {
  [name: string]: EntryDescription | string;
};
```

Defines named entry points, where each key specifies the output file path relative to the output directory.

The corresponding value can be either `string` containing an absolute/relative path to the source file, or
the [EntryDescription](#entrydescription) object. The `EntryDescription.filename` property is omitted.

**Example `{name: string}`**:

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

**Example `{name: EntryDescription}`**:

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

### `EntryDescription[]`

Explicit array format for full control.

**Requirements**:

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

### `EntryDescription`

```ts
import type { AssetInfo, PathData } from "webpack";

type EntryDescription = {
  import: string;
  filename?: FilenameTemplate | string;
  data?: { [key: string]: any; } | string;
};

type FilenameTemplate = (pathData: PathData, assetInfo?: AssetInfo): string;
```

Defines detailed configuration for a single entry point.

**Requirements**:

- `import`: Always required
- `filename`: Required in Entry Collection. Omitted in Named Entries
- `data`: Optional template variables

#### `import`

**Type**: `string`, **Required**

Specifies an absolute or relative file path.

**Example**:

```js
{
  import: 'src/index.html',
  filename: '[name]/index.html',
}
```

#### `filename`

Type: `FilenameTemplate | string`

Default: `[name].html`

Defines the output filename, including its path relative to the output directory.
Accepts Webpack template strings (`[name]`,`[basename]`,`[contenthash]`,...).

##### Examples

**Template String Example**:

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

#### `data`

Type: `object | string`

Template-specific variables that override [global data](data#data).

Specified in one of two ways:

- As an `object`.
- As a `string` containing the path to a JavaScript or JSON file.

**Key Behaviors**:

- **Template-Specific scope**: Use [data](data#data) to pass data to all templates.
- **Merge Logic**: Template-specific data overrides matching properties in the global data object.
- **HMR Support**: Webpack detects changes only when data is a file path.

##### `object` Data object

**Type**: `object`

Directly defines data as a JavaScript object.

**Limitations**:

- **HMR Support**: Changes require Webpack restart to apply.

**Example**:

```js
{
  import: 'path/to/template.html',
  filename: 'path/output.html',
  data: { title: 'Page Title', description: 'Page Description' }
}
```

##### `string`

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

##### Key Notes

**Use Case Comparison**:

| `data`   | Best For              | HMR Support |
| -------- | --------------------- | ----------- |
| `object` | Static data           | No          |
| `string` | Dynamic/editable data | Yes         |

### Notes

- Webpack uses the `context` option to resolve relative paths.

**References**:

- Webpack [`context`](https://webpack.js.org/configuration/entry-context/#context)
- Webpack [HMR](https://webpack.js.org/concepts/hot-module-replacement/#get-started)
- Webpack [template strings](https://webpack.js.org/configuration/output/#template-strings)
