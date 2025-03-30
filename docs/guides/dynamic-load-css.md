---
sidebar_position: 5
title: Lazy loading CSS
---

# Load CSS file dynamically

For dynamic file loading, we need the output filename of extracted CSS from a source style file.
To get the CSS output filename in JavaScript, you can use the `url` query:
```js
import cssUrl from './style.scss?url';
// - OR -
const cssUrl = require('./style.scss?url');
```
Where the `./style.scss` is the source SCSS file relative to the JavaScript file.

To load a CSS file dynamically, you can use following function:
```js
import cssUrl from './style.scss?url';

function loadCSS(url) {
  const style = document.createElement('link');
  style.href = url;
  style.rel = 'stylesheet';
  document.head.appendChild(style);
}

loadCSS(cssUrl);
``` 

The CSS will be extracted into separate file and the `cssUrl` variable will contains the CSS output filename.

Since 2023, many browsers support the modern way to add the stylesheets into DOM without creating the `link` tag.

```js
import cssUrl from './style.scss?url';

async function loadCSS(url) {
  const response = await fetch(url);
  const css = await response.text();
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  document.adoptedStyleSheets = [sheet];
}

loadCSS(cssUrl);
```

See the [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets#browser_compatibility).
