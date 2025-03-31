# `preprocessor`

```ts
type Preprocessor = TemplatingEngineName | PreprocessorFn | false;
```

Specifies the built-in templating engine identifier, custom processing function, or disables template processing.

**Valid values**:

- **`TemplatingEngineName`**: Built-in templating engine identifier.
- **`PreprocessorFn`**: Custom processing function.
- **`false`**: Disables template processing entirely.

## Default Configuration

The default preprocessor uses Eta templating engine:

```js
const { Eta } = require("eta");
const eta = new Eta({
  async: false,
  useWith: true,
  views: process.cwd(),
});
preprocessor = (content, { data }) => eta.renderString(content, data);
```

## Templating Engines

```ts
type TemplatingEngineName = "eta" | "ejs" | "handlebars" | "nunjucks" | "pug" | "twig";
```

Supported engines use default configurations unless overridden in [`preprocessorOptions`](preprocessor-options#preprocessoroptions).

## Custom Processing Function

```ts
type PreprocessorFn = (
  content: string,
  loaderContext: LoaderContext<object> & {
    data: { [key: string]: any; } | string;
  },
) => string | Promise<any> | undefined;
```

**Parameters**:

- **`content`**: Raw template content (string).
- **`loaderContext`**:
  - `mode`: Webpack build mode (`production`/`development`/`none`).
  - `rootContext`: Webpack context path.
  - `resource`: Template file URL with query parameters.
  - `resourcePath`: Absolute template file path.
  - `data`: Custom template data (object or string).

**Returns**:

- **`string`**: Synchronously processed content.
- **`Promise`**: Asynchronously processed content.
- **`undefined`**: Leaves original content unchanged.

## Usage Examples

**Synchronous Processing**:

```js
{
  preprocessor: (content, { data }) => renderSync(content, data),
}
```

**Asynchronous Processing**:

```js
{
  preprocessor: (content, { data }) =>
    new Promise((resolve) => {
      const result = renderAsync(content, data);
      resolve(result);
    }),
}
```

**Disable Processing**:

```js
{
  preprocessor: false, // Only updates resource paths
}
```

---

## Related Resources

- [Webpack Loader Context][webpack-loader-context-url]
- [Webpack Mode][webpack-mode-url]
- Templating Engine Docs:
  - [Eta][eta-url]
  - [EJS][ejs-url]
  - [Handlebars][handlebars-url]
  - [Nunjucks][nunjucks-url]
  - [LiquidJS][liquidjs-url]
  - [Mustache][mustache-url]

[ejs-url]: https://ejs.co
[eta-url]: https://eta.js.org
[handlebars-url]: https://handlebarsjs.com
[liquidjs-url]: https://github.com/harttle/liquidjs
[mustache-url]: https://github.com/janl/mustache.js
[nunjucks-url]: https://mozilla.github.io/nunjucks/
[webpack-loader-context-url]: https://webpack.js.org/api/loaders/#the-loader-context
[webpack-mode-url]: https://webpack.js.org/configuration/mode/
