---
sidebar_position: 81
title: How to keep source directory structure for assets
---

# How to keep source directory structure for assets (fonts, images, etc.)

Define the `filename` as a function.

For example, we want to keep original directory structure for fonts, which can be in the source or in the `node_modules` directory:

```
node_modules/material-icons/iconfont/material-icons-sharp.woff2
node_modules/material-symbols/material-symbols-sharp.woff2
src/assets/fonts/Roboto/Roboto-Regular.woff2
```

Use the following function:

```js
{
  test: /[\\/]fonts|node_modules[\\/].+(woff(2)?|ttf|otf|eot|svg)$/i,
    type: 'asset/resource',
    generator: {
    // keep original directory structure
    filename: ({ filename }) => {
      const srcPath = 'src/assets/fonts';
      const regExp = new RegExp(`[\\\\/]?(?:${path.normalize(srcPath)}|node_modules)[\\\\/](.+?)$`);
      const assetPath = path.dirname(regExp.exec(filename)[1].replace('@', '').replace(/\\/g, '/'));

      return `fonts/${assetPath}/[name][ext][query]`;
    },
  },
},
```

The destructed `filename` argument of the function is a source file. It can be absolute or relative.

The output directory `dist/` will have the same structure:

```
dist/fonts/material-icons/iconfont/material-icons-sharp.woff2
dist/fonts/material-symbols/material-symbols-sharp.woff2
dist/fonts/Roboto/Roboto-Regular.woff2
```

The example to keep original directory structure for images:

```js
{
  test: /[\\/]images|node_modules[\\/].+(png|jpe?g|webp|ico|svg)$/i,
    type: 'asset/resource',
    generator: {
    // keep original directory structure
    filename: ({ filename }) => {
      const srcPath = 'src/assets/images';
      const regExp = new RegExp(`[\\\\/]?(?:${path.normalize(srcPath)}|node_modules)[\\\\/](.+?)$`);
      const assetPath = path.dirname(regExp.exec(filename)[1].replace('@', '').replace(/\\/g, '/'));

      return `images/${assetPath}/[name].[hash:8][ext]`;
    },
  },
},
```

> :::note
>
> For images, it is recommended to use the hashed output filename.
