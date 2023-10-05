---
layout: tags
sidebar: false
---

<TagsContainer title="标签">
  <Tag v-for="item, index in tags" :key="index" :to="item">{{ item }}</Tag>
</TagsContainer>

<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import TagsContainer from '@/components/TagsContainer.vue'

const tags = @__tags__@
</script>