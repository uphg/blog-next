import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { base } from './env'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  title: "My Awesome Project",
  description: "A VitePress Site",
  srcDir: './output',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // aside: 'left',
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/posts/' }
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
      provider: 'local'
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./theme', import.meta.url))
      }
    }
  }
})
