// @ts-check
import { defineConfig } from 'astro/config';
import UnoCSS from '@unocss/astro';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), UnoCSS()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      darkTheme: 'github-dark',
    },
  },
});
