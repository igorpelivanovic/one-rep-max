<script setup>
import Spinner from './Spinner.vue'

const { customClasses } = defineProps({
  customClasses: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="spinner-container" :class="customClasses">
    <Spinner />
  </div>
</template>

<style scoped>
.spinner-container {
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--transparent-gray);
}
</style>
