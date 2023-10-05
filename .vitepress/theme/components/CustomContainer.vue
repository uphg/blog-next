<template>
  <div class="custom-container">
    <div class="header">
      <h1 class="title">{{ title }}</h1>
      <p v-if="description" class="description">{{ description }}</p>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  description: String,
})
</script>

<style scoped>
.custom-container {
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
</style>