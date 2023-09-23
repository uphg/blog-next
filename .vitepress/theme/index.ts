// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import About from './components/About.vue'
import Posts from './components/Posts.vue'
import Tags from './components/Tags.vue'
import DocHeader from './components/DocHeader.vue'
import './style.css'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(DocHeader)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('about', About)
    app.component('posts', Posts)
    app.component('tags', Tags)
  }
}
