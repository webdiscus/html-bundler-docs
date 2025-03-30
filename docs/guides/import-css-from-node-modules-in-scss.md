---
sidebar_position: 6
title: Import package style in SCSS
---

# Import CSS or SCSS from package in SCSS

The plugin resolves default style files defined in `node_modules` automatically.

For example, import source styles of material-icons:

```scss
// import source styles from `material-icons` module
@use 'material-icons';

// define short class name for original `.material-icons-outlined` class name from module
.mat-icon {
  @extend .material-icons-outlined;
}
```

You can import a file from a module using the module name and the path to the file:
```scss
@use '<package>/path/to/style';
```

> :::warning
>
> - The file extension, e.g. .scss, .css, must be omitted.
> - Use the `@use` instead of `@import`, because it is [deprecated](https://github.com/sass/sass/blob/main/accepted/module-system.md#timeline).


For example, import the style theme `tomorrow` from the [prismjs](https://github.com/PrismJS/prism) module:
```scss
@use 'prismjs/themes/prism-tomorrow.min';
```

> :::warning
>
> Don't use [resolve-url-loader](https://github.com/bholloway/resolve-url-loader)!
>
> The plugin resolves styles faster than `resolve-url-loader` and don't requires using the `source map` in `sass-loader` options.
