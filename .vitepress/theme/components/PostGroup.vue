<template>
  <div class="post-group">
    <div class="header">
      <h1 class="title">{{ title }}</h1>
      <p class="description">{{ description }}</p>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="footer">
      <Link v-if="next" class="next" :to="`/posts/${next}/`">
        <IconArrowLeft/>
        <span>{{ nextText }}</span>
      </Link>
      <Link v-if="prev" class="prev" :to="`/posts/${prev}/`">
        <span>{{ prevText }}</span>
        <IconArrowRight/>
      </Link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Link from './Link.vue'
import IconArrowLeft from './IconArrowLeft.vue';
import IconArrowRight from './IconArrowRight.vue';

defineProps({
  title: String,
  description: String,
  next: String,
  prev: String,
  nextText: {
    type: String,
    default: 'Newer Posts'
  },
  prevText: {
    type: String,
    default: 'Older Posts'
  },
})
</script>

<style scoped>
.post-group {
  padding: 2.5rem 0;
}
.header {
  display: flex;
  flex-direction: column;
  gap: 4;
}
.title {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
}

.description {
  margin: 0;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

.footer {
  display: flex;
}

.next, 
.prev {
  display: flex;
  align-items: center;
  gap: .5rem;
  color: inherit;
  text-decoration: none;
  /* font-weight: 700; */
}

.next {
  margin-right: auto;
}

.prev {
  margin-left: auto;
}
</style>