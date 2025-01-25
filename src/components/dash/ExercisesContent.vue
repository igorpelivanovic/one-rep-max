<script setup lang="ts">
import DashContentContainer from './DashContentContainer.vue'

const { exercise } = defineProps({
  exercise: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <DashContentContainer custom-class="hellow-content blue">
    <template #header>
      <h2>najnovija vežba</h2>
      <RouterLink class="header-link" :to="{ name: 'dash-posts' }">sve vežbe</RouterLink>
    </template>
    <template #body>
      <RouterLink class="body-link" :to="'te'">
        <p class="category gray-text">{{ exercise.type }}</p>
        <p class="title">{{ exercise.name }}</p>
        <p class="desc gray-text">angazuje: {{ exercise.muscle_groups }}</p>
      </RouterLink>
    </template>
  </DashContentContainer>
</template>
<style scoped>
.body-link {
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  p {
    margin: 0;
    text-align: center;
    &::first-letter {
      text-transform: capitalize;
    }
    &.category {
      font-size: 1.3rem;
    }
    &.title {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1;
    }
    &.desc {
      font-size: 1.1rem;
    }
  }
}
</style>
