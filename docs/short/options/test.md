## `test`

**Type**: `RegExp`

**Default**: Engine-dependent (e.g., Eta, EJS, Handlebars)

Defines a regular expression to validate template file paths. Files matching this pattern are treated as entry points.

### Default Behavior

The default value depends on the selected [`preprocessor`](preprocessor#preprocessor):

- `ejs` - `/\.(html|ejs)$/i`
- `eta` - `/\.(html|eta)$/i`
- `handlebars` - `/\.(html|hbs|handlebars)$/i`
- `nunjucks` - `/\.(html|njk)$/i`
- `pug` - `/\.(pug|jade)$/i`
- `tempura` - `/\.(html|hbs|tmpr)$/i`
- `twig` - `/\.(html|twig)$/i`

> [!NOTE]
>
> Using the [preprocessor](preprocessor-options#preprocessoroptions) options will be added
> the templating engine extensions in the `test` automatically. Defaults `preprocessor` is ['eta'](preprocessor-options#eta)
> therefore is used the `/\.(html|eta)$/` RegExp.
>
> For example, if you define the preprocessor option as the [handlebars](preprocessor-options#handlebars), then will be
> used the `/\.(html|hbs|handlebars)$/` RegExp automatically.
