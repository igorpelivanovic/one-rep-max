<script setup>
defineProps({
  workoutData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div :class="{ 'workout-done': workoutData.done }">
    <RouterLink :to="{ name: 'workout', params: { id: workoutData.id } }">
      <div class="workout-wrapper" :class="{ 'workout-done-background': workoutData.done }">
        <div class="workout-in-week-title">
          <h3>{{ workoutData.name }}</h3>
          <i v-if="workoutData.done" class="fa-solid fa-check-double"></i>
        </div>
        <p>{{ workoutData.descr }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.workout-done {
  opacity: 0.5;
  pointer-events: none;
  border-radius: 2rem;
}

.workout-wrapper {
  height: 100%;
  padding: 1rem;
  background-color: var(--gray);
  border-radius: 2rem;
}

.workout-in-week-title {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.workout-done-background {
  background-color: var(--blue);
}

.workout-done-background > * {
  color: var(--white);
}

/* h3 {
  margin: 0;
} */

p {
  color: #000000c0;
}
</style>
