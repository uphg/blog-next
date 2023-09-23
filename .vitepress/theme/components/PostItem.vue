<template>
  <article class="post-item" v-if="title">
    <h1 class="title">
      <Link class="title-text" :to="`/post/${to}`">{{ title }}</Link>
    </h1>
    <div v-if="description" class="description">{{ description + '...' }}</div>
    <div class="bottom">
      <Link class="read" :to="`/post/${to}`">
        <span>查看更多</span>
        <IconArrowRight class="read-icon" />
      </Link>
    </div>
  </article>
</template>

<script setup lang="ts">
import Link from './Link.vue';
import IconArrowRight from './IconArrowRight.vue';

defineProps({
  title: String,
  description: String,
  to: String
})
</script>

<style scoped>
.post-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-text {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.25s;
}
.title-text:hover {
  color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.description {
  line-height: 1.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read {
  display: flex;
  align-items: center;
  /* font-weight: 700; */
  font-size: .875rem;
  line-height: 1.25rem;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--vp-c-brand-1);
}

.read-icon {
  font-size: 1rem;
}
</style>