<script setup>
const { message, customClass } = defineProps({
  message: {
    type: [String],
    required: true,
  },
  customClass: {
    type: [String],
    default: '',
  },
})
</script>

<template>
  <p class="error-message" :class="customClass">
    <i class="fa-solid fa-circle-exclamation"></i><span>{{ message }}</span>
  </p>
</template>

<style scoped>
p.error-message {
  color: var(--red);
  margin: 0;
  position: absolute;
  top: 100%;
  left: 15px;
  font-size: 1rem;
  margin-top: 4px;
  span {
    margin-left: 5px;
    &::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
