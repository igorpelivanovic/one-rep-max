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
    <i class="fa-solid fa-circle-exclamation"></i><span class="error-content">{{ message }}</span>
  </p>
</template>

<style scoped>
p.error-message {
  cursor: text;
  width: 100%;
  display: flex;
  color: var(--red);
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  padding-left: 15px;
  font-size: 0.8rem;
  margin-top: 4px;
  span.error-content {
    margin-left: 5px;
    display: inline-block;
    text-align: left;
    &::first-letter {
      text-transform: capitalize;
    }
  }
}
@media screen and (min-width: 481px) {
  p.error-message {
    font-size: 1rem;
  }
}
</style>
