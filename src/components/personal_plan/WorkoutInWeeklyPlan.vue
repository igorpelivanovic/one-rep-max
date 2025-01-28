<script setup>
defineProps(['workoutData'])
</script>

<template>
  <RouterLink :to="{ name: 'workout', params: { id: workoutData.id } }">
    <div class="workout-wrapper">
      <h3>{{ workoutData.name }}</h3>
      <p>{{ workoutData.descr }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.workout-wrapper {
  height: 100%;
  padding: 1rem;
  background-color: var(--gray);
  border-radius: 2rem;
}
</style>
