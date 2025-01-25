<script setup>
import { useCounter } from '@/composables/counter'
import { computed } from 'vue'
import { useSlots } from 'vue'
import Format from '@/utils/format'

const { title, value } = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
})

const fancyNumber = computed(() => Format.fancyNumber(value))

const result = useCounter({ start: 0, end: fancyNumber.value.value, time: 3000 })

const slot = useSlots()
</script>

<template>
  <div class="stats-content">
    <div class="icon-container" v-if="slot.icon">
      <slot name="icon"></slot>
    </div>
    <div class="value-container">
      <span class="value">{{ result }}{{ fancyNumber.unit }}</span>
    </div>
    <div class="title-container">
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats-content {
  border: 1px solid var(--gray);

  flex: 1;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--gray);
  .icon-container {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  .value-container {
    span.value {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1;
    }
  }
  .title-container {
    span.title {
      font-size: 0.95rem;
      color: var(--gray-700);
      display: inline-block;
      &::first-letter {
        text-transform: capitalize;
      }
    }
  }
}
</style>
