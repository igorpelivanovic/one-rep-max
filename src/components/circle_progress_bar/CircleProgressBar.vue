<script setup>
const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="progress-bar" :style="{ '--i': `${props.percentage}%` }">
    <h3>{{ props.percentage }}<span>%</span></h3>
  </div>
</template>

<style scoped>
.progress-bar {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(closest-side, var(--blue-500) 79%, transparent 80% 100%),
    conic-gradient(var(--orange) var(--i), var(--blue-600) 0);
}

.progress-bar h3 {
  position: absolute;
  color: var(--white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  z-index: 1;
  font-weight: 500;
}
</style>
