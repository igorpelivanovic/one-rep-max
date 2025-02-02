<script setup>
const props = defineProps({
  exrName: {
    type: String,
    required: true,
  },
  mgName: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="record-item-wrapper">
    <span class="muscle-group">{{ props.mgName }}</span>
    <span class="exercise">{{ props.exrName }}</span>
    <span class="weight">{{ props.weight }}kg</span>
  </div>
</template>

<style scoped>
.record-item-wrapper {
  background-color: var(--blue-600);
  color: var(--white);
  border: 5px solid var(--orange);
  border-radius: 2rem;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.muscle-group {
  font-weight: 700;
}

.exercise {
  font-size: 0.8rem;
}

.weight {
  font-size: 2rem;
  font-weight: 700;
  margin-top: auto;
}
</style>
