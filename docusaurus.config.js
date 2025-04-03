// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HTML Bundler',
  tagline: 'Cool plugin for Webpack',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://webdiscus.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/html-bundler-webpack-plugin/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'webdiscus', // Usually your GitHub org/user name.
  projectName: 'html-bundler-webpack-plugin', // Usually your repo name.
  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  //onDuplicateRoutes: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/webdiscus/html-bundler-docs/tree/docusaurus/',
          routeBasePath: '/', // Removes "docs/" from the URL
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Logo',
          src: 'img/logo.png',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'docsSidebar',
          //   position: 'left',
          //   label: 'Docs',
          // },
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'configurationSidebar',
            position: 'left',
            label: 'Configuration',
          },
          {
            type: 'docSidebar',
            sidebarId: 'guidesSidebar',
            position: 'left',
            label: 'Guides',
          },
          {
            type: 'docSidebar',
            sidebarId: 'faqSidebar',
            position: 'left',
            label: 'FAQ',
          },
          // {
          //   // the top menu item w/o sidebar
          //   to: 'contribute',
          //   position: 'left',
          //   label: 'Contribute',
          // },
          {
            type: 'docSidebar',
            sidebarId: 'contributeSidebar',
            position: 'left',
            label: 'Contribute',
          },
          {
            href: 'https://github.com/webdiscus/html-bundler-webpack-plugin',
            //label: 'GitHub',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: 'introduction',
              },
              {
                label: 'Getting Started',
                to: 'category/getting-started',
              },
              {
                label: 'Guides',
                to: 'guides',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/html-bundler-webpack-plugin',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/webdiscus/html-bundler-webpack-plugin',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} HTML Bundler`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        // TODO: add 'liquid' (currently occurs error)
        additionalLanguages: ['markup-templating', 'diff', 'powershell', 'bash',  'ejs', 'handlebars', 'markdown', 'scss'],
      },
    }),
};

export default config;
