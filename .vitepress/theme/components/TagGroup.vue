<template>
  <div class="tag-group">
    <div class="header">
      <h1 class="title">标签</h1>
      <!-- <p class="description"></p> -->
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  description: String
})
</script>

<style scoped>
.body {
  padding: 2.5rem 0;
  display: flex;
  flex-wrap: wrap;
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

</style>
