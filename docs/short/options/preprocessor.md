## `preprocessor`

```ts
type Preprocessor =
  | TemplatingEngineName
  | PreprocessorFn
  | false;
```

Specifies the templating engine, a custom processing function, or disables template processing entirely.

### Default Behavior

The default `preprocessor` is pre-configured as the following function:

```js
const { Eta } = require("eta");
const eta = new Eta({
  async: false,
  useWith: true,
  views: process.cwd(),
});
preprocessor = (content, { data }) => eta.renderString(content, data);
```

### `TemplatingEngineName`

```ts
type TemplatingEngineName: 'eta' | 'ejs' | 'handlebars' | 'nunjucks' | 'pug' | 'twig';
```

The plugin includes built-in support for these engines and uses their default configurations unless overridden
in [`preprocessorOptions`](preprocessor-options#preprocessoroptions).

### `PreprocessorFn`

```ts
type PreprocessorFn = (
  content: string,
  loaderContext: LoaderContext<object> & { data: { [key: string]: any; } | string; },
) => string | Promise<any> | undefined;
```

Defines a custom function to process templates with any engine (e.g., LiquidJS, Mustache).

The function arguments:

- `content` Raw template content
- `loaderContext`
  - `mode: production | development | none` Webpack mode.
  - `rootContext: string` Path to Webpack context.
  - `resource: string` URL to template file, including query.
  - `resourcePath: string` Template file path.
  - `data: object | null` Custom data passed to the template.

#### Function Behavior

- Called for each entry file before content processing.
- Returns:
  - `string`: Synchronously processed content.
  - `Promise`: Asynchronously processed content.
  - `undefined`: Leaves content unchanged.

#### Examples

**Synchronous Processing:**

```js
{
  preprocessor: ((content, { data }) => render(content, data));
}
```

**Asynchronous Processing:**

```js
{
  preprocessor: ((content, { data }) =>
    new Promise((resolve) => {
      const result = render(content, data);
      resolve(result);
    }));
}
```

### `false`

Disables template processing. The plugin only resolves asset paths in HTML-like templates (e.g., for server-side rendering).

Example:

```js
{
  preprocessor: false; // Only replace filenames, leave content unchanged
}
```

```js
{
  preprocessor: false,
}
```

### Notes

- **EJS-like Syntax**: Supported by default. Omit `HtmlBundlerPlugin.loader` in Webpack config.
- **PHP Templates**: See [processing guide](recipes#recipe-preprocessor-php).

**References**:

- [Loader Context][webpack-loader-context-url]
- [Webpack mode][webpack-mode-url]
- Engine Docs: [Eta][eta-url], [EJS][ejs-url], [Handlebars][handlebars-url], [Nunjucks][nunjucks-url],
  [LiquidJS][liquidjs-url], [Mustache][mustache-url]

[ejs-url]: https://ejs.co
[eta-url]: https://eta.js.org
[handlebars-url]: https://handlebarsjs.com
[liquidjs-url]: https://github.com/harttle/liquidjs
[mustache-url]: https://github.com/janl/mustache.js
[nunjucks-url]: https://mozilla.github.io/nunjucks/
[webpack-loader-context-url]: https://webpack.js.org/api/loaders/#the-loader-context
[webpack-mode-url]: https://webpack.js.org/configuration/mode/
