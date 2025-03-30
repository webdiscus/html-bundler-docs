---
sidebar_position: 4
---

# Inline images in HTML

You can inline the images in two ways:

- auto inline by image size
- force inline image using `?inline` query (works in HTML, CSS, [JS](#recipe-import-svg))

Add to Webpack config the rule:

```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|svg|webp|ico)$/i,
      // auto inline by image size
      {
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024,
          },
        },
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
    },
  ],
}
```

The plugin automatically inline images smaller then `maxSize`.
