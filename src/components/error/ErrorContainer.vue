<script setup>
import { useSlots } from 'vue'

const { text } = defineProps({
  text: {
    type: String,
    default: 'došlo je do greške, pokušajte kasnije.',
  },
})

const slot = useSlots()
</script>
<template>
  <div class="error-wrapper">
    <div class="error-container error-page">
      <slot v-if="slot.default"></slot>
      <template v-else>
        <div class="icon-container">
          <span class="icon">
            <i class="fas fa-bug"></i>
          </span>
        </div>
        <div class="message-container">
          <p>{{ text }}</p>
        </div>
        <div class="actions-btn-container">
          <RouterLink :to="{ name: 'home' }" class="nav-element">nazad na početnu</RouterLink>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.error-wrapper {
  background-color: var(--gray);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
