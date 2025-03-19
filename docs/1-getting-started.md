## Getting Started

### Prerequisites

- [Node.js][node-url] >= 18
- [Webpack][webpack-url] >= 5.81.0

### Installation

```bash
npm install html-bundler-webpack-plugin --save-dev
```

#### Recommended Webpack loaders

| Resources | Loader                           | Notes |
| --------- | -------------------------------- | ----- |
| JS/TS     | [babel-loader][babel-loader-url] |       |
| JS/TS     | [swc-loader][swc-loader-url]     |       |
| CSS       | [css-loader][css-loader-url]     |       |
| SASS/SCSS | [sass-loader][sass-loader-url]   |       |

#### Recommended Webpack optimization plugins (optional)

| Resources | Plugin                                                               | Notes |
| --------- | -------------------------------------------------------------------- | ----- |
| JS        | [terser-webpack-plugin][terser-webpack-plugin-url]                   |       |
| JS        | [swc-minify-webpack-plugin][swc-minify-webpack-plugin-url]           |       |
| HTML      | [html-minimizer-webpack-plugin][html-minimizer-webpack-plugin-url]   |       |
| Images    | [image-minimizer-webpack-plugin][image-minimizer-webpack-plugin-url] |       |

[babel-loader-url]: https://github.com/babel/babel-loader
[css-loader-url]: https://github.com/webpack-contrib/css-loader
[html-minimizer-webpack-plugin-url]: https://github.com/webpack-contrib/html-minimizer-webpack-plugin
[image-minimizer-webpack-plugin-url]: https://github.com/webpack-contrib/image-minimizer-webpack-plugin
[node-url]: https://nodejs.org/
[sass-loader-url]: https://github.com/webpack-contrib/sass-loader
[swc-loader-url]: https://swc.rs/docs/usage/swc-loader
[swc-minify-webpack-plugin-url]: https://github.com/guoyunhe/swc-minify-webpack-plugin
[terser-webpack-plugin-url]: https://github.com/webpack-contrib/terser-webpack-plugin
[webpack-url]: https://webpack.js.org/
