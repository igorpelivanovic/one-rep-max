<script setup>
const { customClass } = defineProps({
  customClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <i class="fas fa-spinner spinner" :class="customClass"></i>
</template>

<style scoped>
i.spinner {
  position: relative;
  animation: 1s infinite linear fullRotate;
  color: var(--blue-600);
}

@keyframes fullRotate {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}
</style>
