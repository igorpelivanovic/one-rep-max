<script setup>
import { computed } from 'vue'

const { labelId, modelValue, title, option } = defineProps({
  labelId: {
    required: true,
    type: String,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  option: {
    type: [String, Number],
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => modelValue === option)
</script>

<template>
  <div
    class="radio-container"
    :class="{ checked: isChecked }"
    @click="emit('update:modelValue', option)"
  >
    <div class="indicator-container"></div>
    <div class="label">
      <span>{{ title }}</span>
    </div>
  </div>
</template>
<style scoped>
.radio-container {
  margin-bottom: 10px;
  &.checked {
    .indicator-container {
      border-width: 2px;
      border-color: var(--blue-600);
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        border-radius: 50%;
        background-color: var(--blue-600);
        width: 50%;
        height: 50%;
      }
    }
  }
  .input-container {
    display: none;
  }
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  .indicator-container {
    flex: 0 0 20px;
    width: 20px;
    align-self: flex-start;
    aspect-ratio: 1/1;
    background-color: var(--white);
    border-radius: 50%;
    border: 1px solid;
    border-color: var(--gray-600);
  }
}
</style>
