<script setup>
import Format from '@/utils/format'
import { computed } from 'vue'

const emit = defineEmits(['clearField'])

const { textValue } = defineProps({
  textValue: {
    type: String,
    default: '',
  },
})

const formatCurrentNumberCarachterText = computed(() => Format.number(textValue.length))
</script>

<template>
  <div class="text-area-bottom-content">
    <span class="letter-counter"
      >broj karaktera: {{ formatCurrentNumberCarachterText }} / {{ Format.number(65535) }}</span
    >
    <button type="button" class="custom-clear-btn" @click="emit('clearField', '')">obriši</button>
  </div>
</template>

<style scoped>
.text-area-bottom-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .letter-counter {
    &::first-letter {
      text-transform: capitalize;
    }
    color: var(--gray-700);
  }
  .custom-clear-btn {
    background-color: var(--gray-680);
    &:hover {
      background-color: var(--blue-500);
    }
  }
}
</style>
