## Known Webpack loaders/plugins

### Recommended Webpack loaders

| Resources | Loader                               | Notes                   |
| --------- | ------------------------------------ | ----------------------- |
| JS/TS     | [babel-loader][babel-loader-url]     | Optional                |
| JS/TS     | [swc-loader][swc-loader-url]         | Optional                |
| CSS       | [css-loader][css-loader-url]         | Required for CSS styles |
| CSS       | [postcss-loader][postcss-loader-url] | Optional                |
| SASS/SCSS | [sass-loader][sass-loader-url]       | Required for SASS/SCSS  |

### Recommended Webpack optimization plugins

| Resources | Plugin                                                               | Notes    |
| --------- | -------------------------------------------------------------------- | -------- |
| JS        | [terser-webpack-plugin][terser-webpack-plugin-url]                   | Optional |
| JS        | [swc-minify-webpack-plugin][swc-minify-webpack-plugin-url]           | Optional |
| HTML      | [html-minimizer-webpack-plugin][html-minimizer-webpack-plugin-url]   | Optional |
| Images    | [image-minimizer-webpack-plugin][image-minimizer-webpack-plugin-url] | Optional |

[babel-loader-url]: https://github.com/babel/babel-loader
[css-loader-url]: https://github.com/webpack-contrib/css-loader
[html-minimizer-webpack-plugin-url]: https://github.com/webpack-contrib/html-minimizer-webpack-plugin
[image-minimizer-webpack-plugin-url]: https://github.com/webpack-contrib/image-minimizer-webpack-plugin
[postcss-loader-url]: https://github.com/webpack-contrib/postcss-loader
[sass-loader-url]: https://github.com/webpack-contrib/sass-loader
[swc-loader-url]: https://swc.rs/docs/usage/swc-loader
[swc-minify-webpack-plugin-url]: https://github.com/guoyunhe/swc-minify-webpack-plugin
[terser-webpack-plugin-url]: https://github.com/webpack-contrib/terser-webpack-plugin
