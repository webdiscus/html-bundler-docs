---
sidebar_position: 5
title: Import CSS classes in JS
---

# Import CSS class names in JS

**Required:** `css-loader >= 7.0.0`

To import style `class names` in JS, add in the webpack config the [modules](https://github.com/webpack-contrib/css-loader#modules) option into `css-loader`:
```js
{
  test: /\.(css)$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]--[hash:base64:5]',
          exportLocalsConvention: 'camelCase',
        },
      },
    },
  ],
},
```

For example there is _./style.css_ file:
```css
.error-message {
  color: red;
}
```

In _./main.js_ file you can use the class name with `camelCase`:
```js
import styles from './style.css';

element.innerHTML = `<div class="${styles.errorMessage}">`;
```

The imported `styles` object contains generated class names like followings:
```js
{
  errorMessage: 'main__error-message--gvFM4',
}
```

Read more information about [CSS Modules](https://github.com/css-modules/css-modules).
