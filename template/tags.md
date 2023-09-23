---
layout: tags
sidebar: false
---

<TagGroup>
  <Tag v-for="item in 10">{{ 'Node.js' }}</Tag>
</TagGroup>

<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import TagGroup from '@/components/TagGroup.vue'
</script>