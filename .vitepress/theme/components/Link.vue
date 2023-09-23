<template>
  <a :href="_to">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { base } from '../../env'

const props = defineProps({
  to: String
})

const _to = (base === '/' ? '' : base) + props.to
</script>