---
sidebar_position: 1
---

# How to use `@import url()` in CSS

> :::warning
>
> Don't use `@import in CSS`. It's very `bad practice`.
>

Bad example, _main.css_:
```css
@import 'path/to/style.css';
```

The plugin does not support handling of `@import url()` in CSS. Imported url will be passed 1:1 into resulting CSS.

### Problem

Defaults, `css-loader` handles `@import at-rule`, which causes an issue in the plugin.

### Solution

Add the `import: false` into `css-loader` options:

```js
{
  test: /\.(css)$/i,
  loader: 'css-loader',
  options: {
    import: false, // disable handling of @import at-rule in CSS
  },
},
```

> :::warning
>
> The `*.css` files imported in CSS are not handled, therefore these files must be manually copied to the `dist/` folder using the `copy-webpack-plugin`.
