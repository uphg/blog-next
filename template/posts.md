---
layout: posts
sidebar: false
---

<PostGroup title="博客" description="我最近的博客" :next="@__next__@" :prev="@__prev__@">
  <PostItem v-for="item, index in posts" :key="index" :title="item.title" :to="item.to" :description="item.description" />
</PostGroup>

<script setup lang="ts">
import PostItem from '@/components/PostItem.vue'
import PostGroup from '@/components/PostGroup.vue'

const posts = @__posts__@
</script>
