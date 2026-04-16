---
layout: home

hero:
  name: "技术随笔"
  text: "全栈开发者的代码人生"
  tagline: "探索前端工程化、架构设计与工程实践"
  image:
    src: /hero-image.svg
    alt: 技术随笔
  actions:
    - theme: brand
      text: 浏览博客
      link: /blog/
    - theme: alt
      text: 查看作品
      link: /projects/
---

<script setup>
import { ref } from 'vue'

const features = ref([
  {
    icon: '📝',
    title: '技术笔记',
    description: '从 Vue/React 到 TypeScript，记录开发中的点滴心得与踩坑经验，持续学习与成长',
    link: '/blog/'
  },
  {
    icon: '🛠️',
    title: '工程实践',
    description: '前端工程化、CICD 流程、自动化测试，构建可维护的技术体系与开发流程',
    link: '/blog/performance-optimization'
  },
  {
    icon: '🏗️',
    title: '架构设计',
    description: '从模块设计到系统架构，探讨如何构建稳健、高效、可扩展的软件系统',
    link: '/blog/'
  },
  {
    icon: '📚',
    title: '开源分享',
    description: '贡献开源项目，分享工具库与框架的最佳实践，与社区共同成长',
    link: '/projects/'
  }
])
</script>

<div class="features-grid">
  <a
    v-for="(feature, i) in features"
    :key="i"
    :href="feature.link"
    class="feature-card"
  >
    <span class="feature-icon">{{ feature.icon }}</span>
    <h3 class="feature-title">{{ feature.title }}</h3>
    <p class="feature-desc">{{ feature.description }}</p>
    <span class="feature-link">
      <span>了解更多</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </span>
  </a>
</div>

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 2rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #818cf8, #a5b4fc);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(99, 102, 241, 0.15);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover .feature-link svg {
  transform: translateX(4px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1.25rem;
  display: block;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.feature-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
  flex: 1;
}

.feature-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--brand-1, #6366f1);
  transition: all 0.3s ease;
}

.feature-link svg {
  transition: transform 0.3s ease;
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
    padding: 1rem 1.5rem 3rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}
</style>
