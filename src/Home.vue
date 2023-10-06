<template>
  <Wrap class="home">
    <h1 class="title">嘿!</h1>    
    <p class="description">我是一个程序员，这里是我的个人博客，主要用来记录编程学习笔记、日常。</p>
    <h2>我的项目</h2>
    <ul>
      <li>Vanilla Utils Plus</li>
      <li>Tulip UI</li>
      <li>Element Part</li>
    </ul>
    <h2>最近的博客</h2>
    <ul>
      <li>Vanilla Utils Plus</li>
      <li>Tulip UI</li>
      <li>Element Part</li>
    </ul>
  </Wrap>
</template>

<script setup lang="ts">
import Wrap from '@/components/Wrap.vue'
</script>

<style scoped>
.home {
  padding-top: 2.5rem;
  padding-bottom: 5rem;
}

.title {
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -.02em;
  white-space: pre-wrap;
}
.home h2 {
  margin: 48px 0 16px;
  /* border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px; */
  letter-spacing: -.02em;
  line-height: 32px;
  font-size: 24px;
}

.home h1, .home h2, .home h3, .home h4, .home h5, .home h6 {
  position: relative;
  font-weight: 600;
  outline: none;
}
.home p {
  line-height: 28px;
  margin: 16px 0;
}
.home ul {
    list-style: disc;
}
.home ul, .home ol {
    padding-left: 1.25rem;
    margin: 16px 0;
}
</style>