---
layout: posts
sidebar: false
---

<PostsContainer title="@__title__@" description="@__description__@" next="@__next__@" prev="@__prev__@">
  <PostItem
    v-for="item, index in posts"
    :key="index"
    :title="item.title"
    :to="item.to"
    :description="item.description"
    :date="item.date"
    :tags="item.tags"
  />
</PostsContainer>

<script setup lang="ts">
import PostItem from '@/components/PostItem.vue'
import PostsContainer from '@/components/PostsContainer.vue'

const posts = @__posts__@
</script>
