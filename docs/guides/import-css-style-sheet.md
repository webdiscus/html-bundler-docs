---
sidebar_position: 5
---

# Import CSS stylesheet in JS

Using the `css-loader` option [exportType](https://github.com/webpack-contrib/css-loader?#exporttype) as `css-style-sheet`
you can import the CSS stylesheets as the instance of the [CSSStyleSheet](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet) object.

Import a CSS module script and apply it to a document or a shadow root like this:

```js
import sheet from './style.scss?sheet';

document.adoptedStyleSheets = [sheet];
shadowRoot.adoptedStyleSheets = [sheet];
```

You can use the `?sheet` URL query to import a style file as stylesheets.
The query must be configured in the webpack config:

```js
module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: './src/index.html',
      },
      js: {
        filename: '[name].[contenthash:8].js',
      },
      css: {
        filename: '[name].[contenthash:8].css',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        oneOf: [
          // Import CSS/SCSS source file as a CSSStyleSheet object
          {
            resourceQuery: /sheet/, // <= the query, e.g. style.scss?sheet
            use: [
              {
                loader: 'css-loader',
                options: {
                  exportType: 'css-style-sheet', // <= define this option
                },
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
          // Import CSS/SCSS source file as a CSS string
          {
            use: [
              'css-loader',
              'sass-loader',
            ],
          }
        ],
      }
    ],
  },
};
```

Using the universal configuration above you can apply CSS stylesheets in JS and extract CSS into separate file or inject CSS into HTML:

```js
import sheet from './style.scss?sheet'; // import as CSSStyleSheet object
import './style2.scss?inline'; // the extracted CSS will be injected into HTML
import './style3.scss'; // the extracted CSS will be saved into separate output file

// apply stylesheet to document and shadow root
document.adoptedStyleSheets = [sheet];
shadowRoot.adoptedStyleSheets = [sheet];
```

This is useful for [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) and shadow DOM.

More information:

- [Using CSS Module Scripts to import stylesheets](https://web.dev/css-module-scripts/)
- [Constructable Stylesheets: seamless reusable styles](https://developers.google.com/web/updates/2019/02/constructable-stylesheets)
