// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docsSidebar: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [{type: 'autogenerated', dirName: 'getting-started'}],
    },
    {
      type: 'category',
      label: 'Options',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Plugin Options',
          link: {
            type: 'generated-index',
          },
          items: [{type: 'autogenerated', dirName: 'Options/PluginOptions'}]
        },
        {
          type: 'category',
          label: 'Loader Options',
          link: {
            type: 'generated-index',
          },
          items: [{type: 'autogenerated', dirName: 'Options/LoaderOptions'}]
        },
        {
          type: 'category',
          label: 'Webpack Options',
          link: {
            type: 'generated-index',
          },
          items: [{type: 'autogenerated', dirName: 'Options/WebpackOptions'}]
        },
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'Plugins/build-in',
        'Plugins/third-party',
        'Plugins/favicons',
      ],
    },
    'hooks-and-callbacks'
  ],

  configurationSidebar: [{type: 'autogenerated', dirName: 'configuration'}],
  guidesSidebar: [{type: 'autogenerated', dirName: 'guides'}],
  faqSidebar: [{type: 'autogenerated', dirName: 'faq'}],
  contributeSidebar: [{type: 'autogenerated', dirName: 'contribute'}],
};

export default sidebars;
