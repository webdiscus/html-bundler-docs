# `filename`

```ts
string | ((pathData: PathData, assetInfo: AssetInfo) => string);
```

**Default:** `[name].html`

Defines the HTML output filename relative to the [`outputPath`](outputPath#outputpath) configuration.
Template-specific [filename](entry#entrydescription) configuration overrides this option.

**Valid values**:

- `string` Output filename template.
- `Function` Custom processing function.

## Output Filename Template

Type: `string`

Specifies the output filename template.

Supports following Webpack substitutions:

- **`[id]`**: The chunk ID.
- **`[name]`**: The filename without extension or path.
- **`[contenthash]`**: The content hash (default length: 20).
- **`[contenthash:nn]`**: Custom hash length (replace `nn` with desired length).

## Custom Processing Function

```ts
function (pathData: PathData, assetInfo: AssetInfo) => string
```

**Parameters**:

- `pathData`: Contextual information about the asset path
- `assetInfo`: Additional metadata about the Webpack asset

**Returns**:

- `string` Output filename template.

**Webpack Type Definitions**:

```ts
type PathData = {
  hash: string;
  hashWithLength: (number) => string;
  chunk: Chunk | ChunkPathData;
  module: Module | ModulePathData;
  contentHashType: string;
  contentHash: string;
  contentHashWithLength: (number) => string;
  filename: string;
  url: string;
  runtime: string | SortableSet<string>;
  chunkGraph: ChunkGraph;
};
```

## Related Resources

- [Webpack filename templates][webpack-filename-templates]

[webpack-filename-templates]: https://webpack.js.org/configuration/output/#template-strings
