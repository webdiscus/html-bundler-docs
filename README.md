# html-bundler-webpack-plugin documentation style guide

This guide provides clear and concise instructions to help you create well-organized and readable documentation for
the html-bundler-webpack-plugin community. It covers organization, spelling, formatting, and more to ensure consistency
and professionalism across all documents.

## Table of contents

1. [General Guidelines](#general-guidelines)
1. [Writing Style](#writing-style)
1. [Punctuation](#punctuation)
1. [Document Structure](#document-structure)
1. [API Documentation](#api-documentation)
1. [Code Blocks](#code-blocks)
1. [Formatting](#formatting)
1. [Product and Project Naming](#product-and-project-naming)

---

## General guidelines

### File naming

- **Markdown Files:** Use `lowercase-with-dashes.md`.
  - Use underscores only if they are part of the topic name (e.g., `child_process`).
  - Some files, like top-level Markdown files, may be exceptions.

### Text wrapping

- Wrap documents at 120 characters per line to enhance readability and version control.

### Editor configuration

- Follow the formatting rules specified in `.editorconfig`.
  - A [plugin][editorconfig-url] is available for some editors to enforce these rules.

### Testing documentation

- Validate documentation changes using `make test-doc -j` or `vcbuild test-doc`.

---

## Writing style

### Spelling and grammar

- **Spelling:** Use [US spelling][US spelling Url].
- **Grammar:** Use clear, concise language. Avoid unnecessary jargon.

### Commas

- **Serial Commas:** Use [serial commas][serial commas] for clarity.
  - Example: *apples, oranges<b>,</b> and bananas*

### Pronouns

- Avoid first-person pronouns (*I*, *we*).

### Gender-neutral language

- Use gender-neutral pronouns and plural nouns.
  - OK: *they*, *their*, *them*, *folks*, *people*, *developers*
  - NOT OK: *his*, *hers*, *him*, *her*, *guys*, *dudes*

### Terminology

- Use precise technical terms and avoid colloquialisms.
- Define any specialized terms or acronyms at first use.

---

## Punctuation

### Terminal punctuation

- Place inside parentheses or quotes if the content is a complete clause.
- Place outside if the content is a fragment of a clause.

### Quotation marks

- Use double quotation marks for direct quotes.
- Use single quotation marks for quotes within quotes.

### Colons and semicolons

- Use colons to introduce lists or explanations.
- Use semicolons to link closely related independent clauses.

---

## Document structure

### Headings

- Start documents with a level-one heading (`#`).
- Use subsequent headings (`##`, `###`, etc.) to organize content hierarchically.

### Links

- Prefer reference-style links (`[a link][link-url]`) over inline links (`[a link](http://example.com)`).
- Use `url` suffix for reference-style link labels

### Lists

- Use bullet points for unordered lists and numbers for ordered lists.
- Keep list items parallel in structure.

### Tables

- Use tables to present structured information clearly. Ensure they are readable in plain text.

---

## API documentation

### Usage examples

- Provide a usage example or a link to an example for every function.

### Parameter descriptions

- Clearly describe parameters and return values, including types and defaults.
  - Example:

    ```markdown
    - `byteOffset` {integer} Index of first byte to expose. **Default:** `0`.
    ```

---

## Code blocks

### Language-aware fences

- Use language-aware fences (e.g., `` ```js ``) for code blocks.

  - **Info String:** Use the appropriate info string from the following list:

    | Language         | Info String  |
    | ---------------- | ------------ |
    | Bash             | `bash`       |
    | CommonJS         | `cjs`        |
    | Terminal Session | `console`    |
    | Diff             | `diff`       |
    | JavaScript       | `js`         |
    | JSON             | `json`       |
    | Markdown         | `markdown`   |
    | EcmaScript       | `mjs`        |
    | Powershell       | `powershell` |
    | Plaintext        | `text`       |
    | TypeScript       | `typescript` |

  - Use `text` for unknown languages.

### Code comments

- Use comments to explain complex logic within code examples.
- Follow the standard commenting style of the respective language.

---

## Formatting

### Escaping characters

- Use backslash-escaping for underscores, asterisks, and backticks: `\_`, `\*`, `` \` ``.

### Naming conventions

- **Constructors:** Use PascalCase.
- **Instances:** Use camelCase.
- **Methods:** Indicate methods with parentheses: `socket.end()` instead of `socket.end`.

### Function arguments and returns

- **Arguments:**

  ```markdown
  - `name` {type|type2} Optional description. **Default:** `value`.
  ```

  Example:

  ```markdown
  - `byteOffset` {integer} Index of first byte to expose. **Default:** `0`.
  ```

- **Returns:**

  ```markdown
  - Returns: {type|type2} Optional description.
  ```

  Example:

  ```markdown
  - Returns: {AsyncHook} A reference to `asyncHook`.
  ```

---

## Product and project naming

### Official styling

- Use official capitalization for products and projects.
  - OK: JavaScript, Google's V8, Node.js
  - NOT OK: Javascript, Google's v8, Node, NodeJS

### html-bundler-webpack-plugin references

- Use *html-bundler-webpack-plugin* instead of similar variants.

### Version references

- Use *html-bundler-webpack-plugin* and the version number in prose. Do not prefix the version number with *v*.
  - OK: *html-bundler-webpack-plugin 14.x*, *html-bundler-webpack-plugin 14.3.1*
  - NOT OK: *html-bundler-webpack-plugin v14*

For topics not addressed here, please consult the [Microsoft Writing Style Guide][Microsoft Writing Style Guide Url].

---

[Microsoft Writing Style Guide Url]: https://learn.microsoft.com/en-us/style-guide/welcome/
[US spelling Url]: https://learn.microsoft.com/en-us/style-guide/word-choice/use-us-spelling-avoid-non-english-words
[editorconfig-url]: https://editorconfig.org/#download
[serial commas]: https://learn.microsoft.com/en-us/style-guide/punctuation/commas
