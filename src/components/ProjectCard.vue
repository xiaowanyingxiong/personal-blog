<template>
  <div class="project-card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="tech-stack" v-if="techStack && techStack.length">
      <span v-for="tech in techStack" :key="tech" class="tech-tag">
        {{ tech }}
      </span>
    </div>
    <div class="actions">
      <a v-if="demoUrl" :href="demoUrl" target="_blank" class="btn-demo">演示</a>
      <a v-if="repoUrl" :href="repoUrl" target="_blank" class="btn-repo">源码</a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  techStack: Array,
  demoUrl: String,
  repoUrl: String
})
</script>

<style scoped>
.project-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg-soft);
}
.project-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}
.project-card p {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2);
}
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.tech-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
}
.actions {
  display: flex;
  gap: 1rem;
}
.actions a {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.btn-demo {
  background: var(--vp-c-brand);
  color: white;
}
.btn-demo:hover {
  background: var(--vp-c-brand-dark);
}
.btn-repo {
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
}
.btn-repo:hover {
  background: var(--vp-c-brand-soft);
}
</style>
