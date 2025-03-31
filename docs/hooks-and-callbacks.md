---
sidebar_position: 99
---

# Hooks & Callbacks

Using hooks and callbacks, you can extend the functionality of this plugin.

The `hook` can be defined in an external plugin.
The `callback` is defined as an option in the HTMLBundlerPlugin.

Most hooks have a callback with the same name.
Each callback is called after hook with the same name.
So with a callback, you can change the result of the hook.

## When using `callbacks`

If you have small code just for your project or are doing debugging, you can use callbacks.

## When using `hooks`

Using hooks you can create your own plugin.

_How the plugin works under the hood._


![Hooks & callbacks](../static/img/docs/hooks.png)

## How to use hooks

The simplest way, add the `{ apply() { ... } }` object to the array of the Webpack plugins:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: './src/index.html',
      },
    }),
    // your plugin
    {
      apply(compiler) {
        const pluginName = 'MyPlugin';

        compiler.hooks.compilation.tap(pluginName, (compilation) => {
          const hooks = HtmlBundlerPlugin.getHooks(compilation);

          // modify generated HTML of the index.html template
          hooks.beforeEmit.tap(pluginName, (content, { name, sourceFile, assetFile }) => {
            return content.replace('something...', 'other...')
          });
        });
      },
    },
  ],
};
```

You can use this template as the basis for your own plugin:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

class MyPlugin {
  pluginName = 'my-plugin';
  options = {};

  /**
   * @param {{ enabled: boolean | 'auto'}} options The options of your plugin.
   */
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // you can use the API of the HtmlBundlerPlugin.option
    const enabled = HtmlBundlerPlugin.option.toBool(this.options?.enabled, true, 'auto');
    const outputPath = HtmlBundlerPlugin.option.getWebpackOutputPath();

    if (!enabled) {
      return;
    }

    const { pluginName } = this;
    const { webpack } = compiler; // instance of the Webpack
    const fs = compiler.inputFileSystem.fileSystem; // instance of the Webpack FileSystem

    // start your plugin from the webpack compilation hook
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      const hooks = HtmlBundlerPlugin.getHooks(compilation);

      // usage of the sync, async and promise hooks

      // sync hook
      hooks.<hookName>.tap(pluginName, (...arguments) => {
        // do somthing here ...
        const result = 'your result';
        // return the result
        return result;
      });

      // async hook
      hooks.<hookName>.tapAsync(pluginName, (...arguments, callback) => {
        // do somthing here ...
        const result = 'your result';
        // call the callback function to resolve the async hook
        callback(result);
      });

      // promise hook
      hooks.<hookName>.tapPromise(pluginName, (...arguments) => {
        // do somthing here ...
        const result = 'your result';
        // return the promise with the result
        return Promise.resolve(result);
      });
    });
  }
}

module.exports = MyPlugin;
```

Then add your plugin in the webpack config:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const MyBundlerPlugin = require('my-bundler-plugin');

module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: './src/index.html',
      },
    }),
    // your plugin
    new MyBundlerPlugin({ enabled: true });
  ],
};
```

For an example implementation see [FaviconsBundlerPlugin](https://github.com/webdiscus/html-bundler-webpack-plugin/tree/master/plugins/favicons-bundler-plugin).

## Hooks

### `beforePreprocessor`

```ts
AsyncSeriesWaterfallHook<[
  content: string,
  loaderContext: LoaderContext<Object> & { data: { [key: string]: any } | string }
]>;
```

For details on `AsyncSeriesWaterfallHook` see the [hook interface](https://github.com/webpack/tapable#hookhookmap-interface).

For details on hook parameters, see in the [beforePreprocessor](/plugin-options-beforePreprocessor) callback option.


### `preprocessor`

```ts
AsyncSeriesWaterfallHook<[
  content: string,
  loaderContext: LoaderContext<Object> & { data: { [key: string]: any } | string }
]>;
```

For details on `AsyncSeriesWaterfallHook` see the [hook interface](https://github.com/webpack/tapable#hookhookmap-interface).

For details on hook parameters, see in the [preprocessor](/plugin-options-preprocessor#custom-processing-function) callback option.

### `resolveSource`

```ts
SyncWaterfallHook<[
  source: string,
  info: {
    type: 'style' | 'script' | 'asset';
    tag: string;
    attribute: string;
    value: string;
    resolvedFile: string;
    issuer: string
  },
]>;
```

_no calback_


Called after resolving of a source attribute defined by [source](/plugin-options-sources) loader option.

For details on `SyncWaterfallHook` see the [hook interface](https://github.com/webpack/tapable#hookhookmap-interface).

Hook parameters:

- `source` - a source of the tag where are parsed attributes, e.g. `<link href="./favicon.png" rel="icon">`
- `info` - an object with parsed information:
  - `type` - the type of the tag
  - `tag` - the tag name, e.g. `'link'`, `'script'`, `'img'`, etc.
  - `attribute` - the attribute name, e.g. `'src'`, `'href'`, etc.
  - `value` - the attribute value
  - `resolvedFile` - the resolved file from the value
  - `issuer` - the template file

Return a string to override the resolved value of the attribute or `undefined` to keep the resolved value.


### `postprocess`

```ts
AsyncSeriesWaterfallHook<[content: string, info: TemplateInfo]>;
```

For details on `AsyncSeriesWaterfallHook` see the [hook interface](https://github.com/webpack/tapable#hookhookmap-interface).

For details on hook parameters, see in the [postprocess](/plugin-options-postprocess) callback option.


### `beforeEmit`

```ts
AsyncSeriesWaterfallHook<[content: string, entry: CompileEntry]>;
```

For details on `AsyncSeriesWaterfallHook` see the [hook interface](https://github.com/webpack/tapable#hookhookmap-interface).

For details on hook parameters, see in the [beforeEmit](/plugin-options-beforeEmit) callback option.


### `afterEmit`

```ts
AsyncSeriesHook<[entries: CompileEntries]>;
```

For details on `AsyncSeriesHook` see the [hook interface](https://github.com/webpack/tapable#hookhookmap-interface).

For details on hook parameters, see in the [afterEmit](/plugin-options-afterEmit) callback option.


### `integrityHashes`

```ts
AsyncSeriesHook<{
  // the map of the output asset filename to its integrity hash
  hashes: Map<string, string>;
}>;
```

Called after all assets have been processed and hashes have finite values and cannot be changed, at the `afterEmit` stage.
This can be used to retrieve the integrity values for the asset files.

For details on `AsyncSeriesHook` see the [hook interface](https://github.com/webpack/tapable#hookhookmap-interface).

Callback Parameter: `hashes` is the map of the output asset filename to its integrity hash.
The map only contains JS and CSS assets that have a hash.

You can write your own plugin, for example, to extract integrity values into the separate file:

```js
const fs = require('fs');
const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
module.exports = {
  output: {
    crossOriginLoading: 'anonymous', // required for Subresource Integrity
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: './src/index.html',
      },
      js: {
        filename: '[name].[contenthash:8].js',
        chunkFilename: '[name].[contenthash:8].chunk.js',
      },
      css: {
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css',
      },
      integrity: 'auto',
    }),
    // your plugin to extract the integrity values
    {
      apply(compiler) {
        compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
          const hooks = HtmlBundlerPlugin.getHooks(compilation);
          hooks.integrityHashes.tapAsync(
            'MyPlugin',
            (hashes) => Promise.resolve().then(() => {
                if (hashes.size > 0) {
                  const saveAs = path.join(__dirname, 'dist/integrity.json');
                  const json = Object.fromEntries(hashes);
                  fs.writeFileSync(saveAs, JSON.stringify(json, null, '  ')); // => save to file
                  console.log(hashes); // => output to console
                }
              })
            );
          }
        );
      },
    },
  ],
};
```

The content of the `dist/integrity.json` file looks like:
```
{
  "815.49b3d882.chunk.js": "sha384-dBK6nNrKKk2KjQLYmHZu6tuWwp7kBzzEvdX+4Ni11UzxO2VHvP4A22E/+mmeduul",
  "main.9c043cce.js": "sha384-AbfLh7mk6gCp0nhkXlAnOIzaHeJSB8fcV1/wT/FWBHIDV7Blg9A0sukZ4nS3xjtR"
  "main.dc4ea4af.chunk.css": "sha384-W/pO0vwqqWBj4lq8nfe+kjrP8Z78smCBttkCvx1SYKrVI4WEdJa6W6i0I2hoc1t7",
  "style.47f4da55.css": "sha384-gaDmgJjLpipN1Jmuc98geFnDjVqWn1fixlG0Ab90qFyUIJ4ARXlKBsMGumxTSu7E",
}
```
