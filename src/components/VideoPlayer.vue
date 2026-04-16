<template>
  <div class="video-player">
    <div v-if="isYoutube || isBilibili" class="video-embed">
      <iframe
        v-if="isYoutube"
        :src="youtubeEmbedUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <iframe
        v-if="isBilibili"
        :src="bilibiliEmbedUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
    <div v-else-if="isLocalVideo" class="local-video">
      <video :src="src" controls></video>
    </div>
    <div v-else-if="src" class="video-link">
      <a :href="src" target="_blank">观看视频</a>
    </div>
    <div v-else class="no-video">暂无视频</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  }
})

const isYoutube = computed(() =>
  props.src?.includes('youtube.com') || props.src?.includes('youtu.be')
)
const isBilibili = computed(() => props.src?.includes('bilibili.com'))
const isLocalVideo = computed(() => /\.(mp4|webm|ogg)$/i.test(props.src))

const youtubeEmbedUrl = computed(() => {
  if (!props.src) return ''
  const match = props.src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  const videoId = match?.[1] || ''
  return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
})

const bilibiliEmbedUrl = computed(() => {
  if (!props.src) return ''
  const match = props.src.match(/bilibili\.com\/video\/(BV\w+)/)
  const bvid = match?.[1] || ''
  return bvid ? `https://player.bilibili.com/player.html?bvid=${bvid}&page=1` : ''
})
</script>

<style scoped>
.video-player {
  margin: 1.5rem 0;
}
.video-embed iframe,
.local-video video {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
}
.video-link a {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s;
}
.video-link a:hover {
  background: var(--vp-c-brand-dark);
}
.no-video {
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
