# html-bundler-docs

Documentation for [html-bundler-webpack-plugin](https://github.com/webdiscus/html-bundler-webpack-plugin).

- Build with [Docusaurus](https://docusaurus.io)
- Hosted on GitHub Pages: https://webdiscus.github.io/html-bundler-docs

## Contribute

### Clone and install

```bash
git clone https://github.com/webdiscus/html-bundler-docs.git
cd html-bundler-docs
git checkout docusaurus
npm i
```

### Local editing

```bash
npm start
```

### Before push to GitHub

- Check Markdown
```bash
npm run lint:md
```

- Check spelling
```bash
npm run lint:spelling
```

- Build website and check broken links
```bash
npm run build
```

---

## TODO:

- refactor documentation

## Done

Please add here refactored points:

- Inner links are fixed.

- Plugin Options
  - test
  - entry
  - entryFilter
  - data
  - filename
  - outputPath
  - js
  - preprocessor
