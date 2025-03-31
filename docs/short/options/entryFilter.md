# `entryFilter`

```ts
type AdvancedFilter =
  | RegExp
  | Array<RegExp>
  | { includes?: Array<RegExp>; excludes?: Array<RegExp>; }
  | ((file: string) => boolean | void);
```

**Default**: Engine-dependent.

Filters template files to be processed.
The option applies only when the [`entry`](entry#entry) is configured as a reference to the templates directory.

## Default Behavior

The default `includes` property varies based on the configured [preprocessor](preprocessor#preprocessor).
Each preprocessor defines its own filter to select relevant template files from the entry path.

**Type**:

```ts
{
  includes: [ RegExp ],
  excludes: []
}
```

## entryFilter as RegExp

Matches files using inclusion rules.

**Example**:

```js
new HtmlBundlerPlugin({
  entry: "src/views/pages/",
  entryFilter: /index\.html$/, // Processes all `index.html` files in subdirectories
});
```

## entryFilter as Array<RegExp>

Type: `Array<RegExp>`

Matches files against any included pattern.

**Example**:

```js
new HtmlBundlerPlugin({
  entryFilter: [
    /index\.html$/,
    /contact\.html$/,
    /about\.html$/,
  ],
});
```

## `entryFilter` as `Object`

Type:

```ts
{
  includes?: Array<RegExp>;
  excludes?: Array<RegExp>;
}
```

Defines an object with inclusion/exclusion rules.

**Example**:

```js
{
  entryFilter: {
    includes: [/\.(html|eta)$/],
    excludes: [/partial/],
  }
}
```

## `entryFilter` as Function

Type:

```ts
(file: string) => boolean | void
```

**Parameter**:

- `file` An absolute path to the template file.

**Returns**:

- `false` Exclude the file.
- `true` Process the file.
- `void` Process the file.

**Example**:

```js
new HtmlBundlerPlugin({
  entry: "src/views/pages/",
  entryFilter: (file) => {
    if (/partial/.test(file)) return false; // ignore files containing the `partial` in the path
  },
});
```
