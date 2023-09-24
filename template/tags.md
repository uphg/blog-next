---
layout: tags
sidebar: false
---

<TagGroup>
  <Tag v-for="item, index in tags" :key="index" :to="item">{{ item }}</Tag>
</TagGroup>

<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import TagGroup from '@/components/TagGroup.vue'

const tags = @__tags__@
</script>