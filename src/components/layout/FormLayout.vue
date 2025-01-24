<script setup>
import { useSlots } from 'vue'

const { customClass } = defineProps({
  customClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['formSubmit'])
const slot = useSlots()
</script>

<template>
  <div class="form-container" :class="customClass">
    <form @submit.prevent="emit('formSubmit')">
      <div class="form-header-container" v-if="slot.header">
        <slot name="header"></slot>
      </div>
      <div class="form-top-section">
        <slot name="fields-section"></slot>
      </div>
      <div class="form-bottom-section">
        <slot name="actions-section"></slot>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  flex: 1;
  form {
    display: flex;
    flex-direction: column;
    gap: 50px;
    height: 100%;
  }
}
</style>
