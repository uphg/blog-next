import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { base } from './env'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  title: "吕恒的个人网站",
  description: "个人博客网站",
  srcDir: './output',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // aside: 'left',
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/posts/' },
      { text: '标签', link: '/tags/' }
    ],

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
