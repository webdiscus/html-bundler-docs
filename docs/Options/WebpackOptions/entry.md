---
sidebar_position: 2
---

The starting point to build the bundle.

> :::info
>
> This plugin treats a template in the `entry` as an entry point.
> All script and style references can be specified directly in the HTML template.

You can use the Webpack `entry` option to define HTML templates,
but it is highly recommended to define all templates in plugin option [`entry`](/plugin-options-entry),
because it has an additional `data` property (not available in the Webpack entry)
to pass custom variables into the HTML template.

For details see the [plugin option `entry`](/plugin-options-entry).
