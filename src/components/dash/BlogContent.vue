<script setup lang="ts">
import PostPreview from '../table/PostPreview.vue'
import DashContentContainer from './DashContentContainer.vue'

const { post } = defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <DashContentContainer class="blue">
    <template #header>
      <h2>najnoviji blog</h2>
      <RouterLink class="header-link" :to="{ name: 'dash-posts' }">svi postovi</RouterLink>
    </template>
    <template #body>
      <PostPreview class="body-link" :post="post"></PostPreview>
    </template>
  </DashContentContainer>
</template>

<style scoped>
.blue {
  order: 3;
}
</style>
