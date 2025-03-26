## `preprocessorOptions`

**Type**: `object`

**Default**: Engine-dependent (e.g., Eta, EJS, Handlebars)

Specifies custom configuration options for the selected templating engine. The plugin uses engine-specific defaults unless
explicitly overridden by this option.

### Engine-Specific Configurations

The default value depends on the selected [`preprocessor`](preprocessor#preprocessor).

#### `eta`

```js
{
  preprocessor: 'eta',
  preprocessorOptions: {
    async: false,
    useWith: true,
    views: 'src/views',
  },
},
```

**Example**

**File Structure**:

```text
src/views/page/home.html
src/views/includes/gallery.html
src/views/includes/teaser.html
src/views/partials/footer.html
src/views/partials/menu/nav.html
src/views/partials/menu/top/desktop.html
```

**Template Usage**:

```html
<%~ include('teaser.html') %><!-- Relative to `views` -->
<%~ include('menu/nav.html') %><!-- Relative to `views` -->
<%~ include('menu/top/desktop.html') %><!-- Relative to `views` -->
<%~ include('footer.html') %><!-- Relative to `views` -->
```

If partials have `.eta` extensions, then the extension can be omitted in the include argument.

#### `ejs`

```js
{
  preprocessor: 'ejs',
  preprocessorOptions: {
    async: false, // Sync rendering (default)
    root: path.join(__dirname, 'src/views/'), // Base path for absolute includes
    views: [
      'src/views/includes', // relative path
      path.join(__dirname, 'src/views/partials'), // absolute path
    ],
  },
},
```

**Example**

**File Structure**:

```text
src/views/page/home.html
src/views/includes/gallery.html
src/views/includes/teaser.html
src/views/partials/footer.html
src/views/partials/menu/nav.html
src/views/partials/menu/top/desktop.html
```

**Template Usage**:

```html
<!-- root path -->
<%- include('/includes/gallery.html') %>

<!-- views paths -->
<%- include('menu/top/desktop.html') %>
<%- include('menu/nav.html') %>
<%- include('teaser.html') %>
<%- include('footer.html') %>
```

If you have partials with `.ejs` extensions, then the extension can be omitted.

#### `handlebars`

```js
{
  preprocessor: 'handlebars',
  preprocessorOptions: {
    // defaults process.cwd(), root path for includes with an absolute path (e.g., /file.html)
    root: path.join(__dirname, 'src/views/'), // defaults process.cwd()
    // defaults [], an array of paths to use when resolving includes with relative paths
    views: [
      'src/views/includes', // relative path
      path.join(__dirname, 'src/views/partials'), // absolute path
    ],
  },
},
```

The `preprocessor` has built-in `include` helper, to load a partial file directly in a template without registration of partials.

The `include` helper supports the following *de facto* standard options.

##### Example

**File Structure**:

```text
src/views/page/home.html
src/views/includes/gallery.html
src/views/includes/teaser.html
src/views/partials/footer.html
src/views/partials/menu/nav.html
src/views/partials/menu/top/desktop.html
```

Include the partials in the `src/views/page/home.html`
template with the `include` helper:

**Template Usage**:

```html
<!-- root path -->
{{ include '/includes/gallery' }}

<!-- views paths -->
{{ include 'menu/top/desktop' }}
{{ include 'menu/nav' }}
{{ include 'teaser' }}
{{ include 'footer' }}
```

The `include` helper automatically resolves `.html` and `.hbs` extensions, it can be omitted.

**The `runtime` option**

The path to the handlebars runtime library. The path can be absolute or relative to `node_modules` directory.
Defaults runtime file is `handlebars/runtime`.
This option is used only for importing templates in JavaScript, see [compile mode](#compile-mode).

**The `partials` option**

Type: `Array<string>|Object`. Default: `[]`

If you use the partials syntax `{{> footer }}` to include a file, then use `partials` option.
Partials will be auto-detected in paths recursively and registered under their relative paths, without an extension.

```js
{
  preprocessor: 'handlebars',
  preprocessorOptions: {
    // an array of relative or absolute paths to partials
    partials: [
      'src/views/includes', // relative path
      path.join(__dirname, 'src/views/partials'), // absolute path
    ],
  },
},
```

For example, if the partial path is the `src/views/partials`
then the file `src/views/partials/menu/top/desktop.html` will have the partial name `menu/top/desktop`.

You can define all partials manually using the option as an object:

```js
{
  preprocessor: 'handlebars',
    preprocessorOptions: {
    // define partials manually
    partials: {
      teaser: path.join(__dirname, 'src/views/includes/teaser.html'),
      gallery: path.join(__dirname, 'src/views/includes/gallery.html'),
      footer: path.join(__dirname, 'src/views/partials/footer.html'),
      'menu/nav': path.join(__dirname, 'src/views/partials/menu/nav.html'),
      'menu/top/desktop': path.join(__dirname, 'src/views/partials/menu/top/desktop.html'),
    },
  },
},
```

Include the partials in the `src/views/page/home.html` template:

```html
{{> menu/top/desktop }}
{{> menu/nav }}
{{> teaser }}
{{> gallery }}
{{> footer }}
```

**The `helpers` option**

Type: `Array<string>|Object` Default: `[]`

When the `helpers` is an array of relative or absolute paths to helpers, then the name of a helper is the relative path
to the helper file without an extension.

For example, there are helper files:

```text
src/views/helpers/bold.js
src/views/helpers2/italic.js
src/views/helpers2/wrapper/span.js
```

**The preprocessor options**:

```js
{
  preprocessor: 'handlebars',
  preprocessorOptions: {
    // an array of relative or absolute paths to helpers
    helpers: [
      'src/views/helpers',
      'src/views/helpers2',
    ],
  },
},
```

**Usage of helpers**:

```html
{{#bold}}The bold text.{{/bold}} {{#italic}}The italic text.{{/italic}}

<!-- the helper with namespace `wrapper/span` -->
{{#[wrapper/span]}}The text wrapped with span tag.{{/[wrapper/span]}}
```

> [!NOTE]
>
> - The helper located in a subdirectory, e.g. `wrapper/span.js` will be available in template as `[wrapper/span]`.
> - When helper name contain the `/` slash, then the helper name must be wrapped with the `[]`.

You can define helpers manually using `name: function` object:

```js
{
  preprocessor: 'handlebars',
  preprocessorOptions: {
    // define helpers manually
    helpers: {
      bold: (options) => new Handlebars.SafeString(`<strong>${options.fn(this)}</strong>`),
    },
  },
},
```

This plugin has own `built-in` helpers:

- `include` - includes a template file relative to paths defined in `views` option,
  the default path is the project root path

  ```hbs
  {{include 'TEMPLATE_FILE'}}
  ```

- `assign` - creates a new named variable or override old.
  You can define many variables. The variables are available in included partials.

  ```hbs
  {{assign title='Homepage' header='Home'}}
  {{> layout}}
  ```

  `layout.hbs`

  ```hbs
  <title>{{title}}</title>
  <h1>{{header}}</h1>
  ```

- `partial` and `block`:

  `partial` - defines the block content

  ```hbs
  {{#partial 'BLOCK_NAME'}}BLOCK_CONTENT{{/partial}}
  ```

  `block` - outputs the block content, it can be used in another partial file,
  e.g. in a layout partial

  ```hbs
  {{#block 'BLOCK_NAME'}}default content or empty{{/block}}
  ```

#### `tempura`

```js
{
  preprocessor: 'tempura',
  preprocessorOptions: {
    // defaults process.cwd(), root path for includes with an absolute path (e.g., /file.html)
    root: path.join(__dirname, 'src/views/'), // defaults process.cwd()
    // defaults [], an array of paths to use when resolving includes with relative paths
    views: [
      'src/views/includes', // relative path
      path.join(__dirname, 'src/views/partials'), // absolute path
    ],
    blocks: {
      // define here custom helpers
      bar: ({ value }) => `<bar>${value}</bar>`,
    },
  },
},
```

The preprocessor has built-in `include` helper, to load a partial file.

For all available options, see the [Tempura API options][tempura-api-url].

**Using built-in `include` helper.**

The `src` attribute contains a path to the partial file.

The path relative to current working directory (defaults webpack config directory):

```hbs
{{#include src='src/views/partials/header.hbs' }}
```

The path relative to directory defined in `root` option, e.g. `root: 'src/view'`:

```hbs
{{#include src='partials/header.hbs' }}
```

The path relative to one of directories defined in `views` option, e.g. `views: ['src/views/partials']`:

```hbs
{{#include src='header.hbs' }}
```

#### `nunjucks`

```js
{
  preprocessor: 'nunjucks',
  preprocessorOptions: {
    // here are preprocessor options
    // an array of relative or absolute templates paths, defaults the current working directory
    views: [
      'src/views/includes',
      'src/views/partials',
    ],
    async: false, // defaults 'false'
    jinjaCompatibility: false, // installs support for Jinja compatibility, defaults 'false'

    // here are original Nunjucks options
    autoescape: true, // escape dangerous characters, defaults 'true'
    // ...
  },
},
```

For all available options, see the [Nunjucks API configure][nunjucks-api-configure-url].

#### `pug`

```js
{
  preprocessor: 'pug',
  preprocessorOptions: {
    // in 99.9% of common use cases you don't need any pug options

    // available useful embedded filters
    embedFilters: {
      // enable the `:escape` filter
      escape: true,

      // enable the `:code` filter
      code: {
        className: 'language-', // class name of `<code>` tag
      },

      // enable `:highlight` filter
      highlight: {
        use: 'prismjs', // use the `prismjs` module as highlighter, must be installed
        verbose: true,
      },

      // enable `:markdown` filter for markdown only, w/o code blocks
      markdown: true,
      // - OR - you can enable highlighter for code blocks used in markdown
      markdown: {
        highlight: {
          use: 'prismjs', // use the `prismjs` module as highlighter, must be installed
          verbose: true,
        },
      },
    }
  },
},
```

See the [documentation and examples][pug-loader/pug-filters-url] for `embedded filters`.\
See the [pug compiler options][pug-api-reference-url].

> [!NOTE]
>
> The `pug` preprocessor based on the [@webdiscus/pug-loader][pug-loader-url] source code and has the same options and features.

#### `twig`

```js
{
  preprocessor: 'twig',
  preprocessorOptions: {
    async: false,
    autoescape: false,
    namespaces: {
      layouts: 'src/views/layouts',
      partials: 'src/views/partials',
    },
  },
},
```

The [TwigJS][twig-url] have few useful options:

- `async {boolean}` defaults is `'false'`.
- `autoescape {boolean}` defaults is `'false'`. Escape dangerous characters.
- `namespaces {Object}` defaults is `{}`.\
  The key is a namespace (like Webpack alias) used in the template instead a relative path.\
  The value is an absolute a path relative to the project directory.

The used namespace must begin with the leading `@` symbol:

```html
{% extends "@layouts/default.twig" %}
{% include "@partials/articles/sidebar.twig" %}
```

You can use a relative path:

```html
{% extends "../layouts/default.twig" %}
{% include "../partials/articles/sidebar.twig" %}
```

> [!WARNING]
>
> The dynamic including is not supported.\
> For example, passing `myTemplate` as a parameter does not work:

> ```html
> {# page.twig #}
> {% extends myTemplate %}
> ```

> [!WARNING]
>
> The Twig template containing `tabs` will not be compiled into HTML.\
> Use the `spaces` as an indent in templates. The `tabs` are not supported by TwigJS.

### Notes

**References**:

- Engine Docs: [Eta][eta-api-configuration-url], [EJS][ejs-docs-url], [Handlebars API][handlebars-api-compilation-url],
  [Nunjucks API][nunjucks-api-configure-url]

[ejs-docs-url]: https://ejs.co/#docs
[eta-api-configuration-url]: https://eta.js.org/docs/api/configuration
[handlebars-api-compilation-url]: https://handlebarsjs.com/api-reference/compilation.html
[nunjucks-api-configure-url]: https://mozilla.github.io/nunjucks/api.html#configure
[pug-api-reference-url]: https://pugjs.org/api/reference.html
[pug-loader-url]: https://github.com/webdiscus/pug-loader
[pug-loader/pug-filters-url]: https://webdiscus.github.io/pug-loader/pug-filters/
[tempura-api-url]: https://github.com/lukeed/tempura/blob/master/docs/api.md
[twig-url]: https://github.com/twigjs/twig.js
