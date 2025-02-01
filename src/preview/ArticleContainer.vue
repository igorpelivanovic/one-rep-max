<script setup>
import { useSlots } from 'vue'

const slot = useSlots()
</script>

<template>
  <div class="article-container">
    <div class="article-header" v-if="slot.header">
      <slot name="header"></slot>
    </div>
    <div class="article-body" v-if="slot.body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style scoped>
.article-container {
  .article-body {
    margin-left: 10px;
  }
}
</style>
