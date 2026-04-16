import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ProjectCard from '../../../src/components/ProjectCard.vue'
import ImageCarousel from '../../../src/components/ImageCarousel.vue'
import VideoPlayer from '../../../src/components/VideoPlayer.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.component('ProjectCard', ProjectCard)
    app.component('ImageCarousel', ImageCarousel)
    app.component('VideoPlayer', VideoPlayer)
  }
}
