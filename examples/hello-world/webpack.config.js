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
