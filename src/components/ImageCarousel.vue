<template>
  <div class="carousel" v-if="images && images.length">
    <div class="carousel-main">
      <img :src="images[currentIndex]" :alt="`截图 ${currentIndex + 1}`" @click="openLightbox" />
      <button class="nav-btn prev" @click="prev" v-if="images.length > 1">&lt;</button>
      <button class="nav-btn next" @click="next" v-if="images.length > 1">&gt;</button>
      <div class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
    </div>
    <div class="carousel-thumbnails" v-if="images.length > 1">
      <img
        v-for="(img, idx) in images"
        :key="idx"
        :src="img"
        :class="{ active: idx === currentIndex }"
        @click="currentIndex = idx"
      />
    </div>
    <div class="lightbox" v-if="lightboxOpen" @click="lightboxOpen = false">
      <button class="lightbox-close" @click="lightboxOpen = false">×</button>
      <img :src="images[currentIndex]" />
    </div>
  </div>
  <div v-else class="no-images">暂无截图</div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

const currentIndex = ref(0)
const lightboxOpen = ref(false)

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

function openLightbox() {
  lightboxOpen.value = true
}
</script>

<style scoped>
.carousel {
  margin: 1.5rem 0;
}
.carousel-main {
  position: relative;
  margin-bottom: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
}
.carousel-main img {
  width: 100%;
  display: block;
  cursor: zoom-in;
}
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.nav-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}
.nav-btn.prev { left: 1rem; }
.nav-btn.next { right: 1rem; }
.image-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
}
.carousel-thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}
.carousel-thumbnails img {
  width: 80px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
  flex-shrink: 0;
}
.carousel-thumbnails img:hover {
  opacity: 0.8;
}
.carousel-thumbnails img.active {
  opacity: 1;
  border: 2px solid var(--vp-c-brand);
}
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
}
.lightbox img {
  max-width: 90%;
  max-height: 90%;
  cursor: default;
}
.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
}
.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.3);
}
.no-images {
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
