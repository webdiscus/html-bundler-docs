## Getting Started

### Prerequisites

- [Node.js][node-url] >= 18
- [Webpack][webpack-url] >= 5.81.0

### Installation

```bash
npm install html-bundler-webpack-plugin --save-dev
```

### Quick start

[Source code](../../examples/hello-world) | [Open in Stackblitz][hello-world-demo-url]

```bash
npm i -D webpack css-loader html-bundler-webpack-plugin
```

[webpack.config.js](../../examples/hello-world/webpack.config.js)

```js
import HtmlBundlerPlugin from "html-bundler-webpack-plugin";

/** @type {import('webpack').Configuration} */
const config = {
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.(png|jpg)/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: "src/views",
    }),
  ],
};

export default config;
```

[src/views/index.html](../../examples/hello-world/src/views/index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello World</title>
    <link href="../img/favicon.png" rel="icon" />
    <link href="../css/styles.css" rel="stylesheet" />
    <script src="../js/main.js"></script>
  </head>
  <body>
    <h1>Hello World!</h1>
    <figure>
      <img src="../img/a91275e9-43e4-4f8a-b2d7-1146112b5d9b.jpg" alt="An example" width="1344" height="768" />
      <figcaption>Hope you're in high spirits!</figcaption>
    </figure>
    <p>
      This page was generated using the
      <a href="https://github.com/webdiscus/html-bundler-webpack-plugin">HTML Builder Plugin</a>
    </p>
  </body>
</html>
```

[src/js/main.js](../../examples/hello-world/src/js/main.js)

```js
console.log(">> main");
```

[src/css/styles.css](../../examples/hello-world/src/css/styles.css)

```css
body {
  font-family: "OpenSans", sans-serif;
}

h1 {
  color: orangered;
}
```

```bash
npx webpack build --mode production
```

New to Webpack? See [Getting Started][webpack-getting-started-url]

[hello-world-demo-url]: https://stackblitz.com/edit/webpack-webpack-js-org-nzje589a?file=README.md
[node-url]: https://nodejs.org/
[webpack-getting-started-url]: https://webpack.js.org/guides/getting-started/#using-a-configuration
[webpack-url]: https://webpack.js.org/
