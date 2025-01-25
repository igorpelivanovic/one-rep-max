<script setup>
import { computed } from 'vue'
import { useSlots } from 'vue'

const { isLodingPage } = defineProps({
  isLodingPage: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()

const showLoading = computed(() => slots.loading && isLodingPage)
</script>

<template>
  <div class="page-container">
    <slot name="loading" v-if="showLoading"></slot>
    <template v-else>
      <div class="page-header">
        <slot name="header"></slot>
      </div>
      <div class="page-body">
        <slot name="body"></slot>
      </div>
    </template>
  </div>
</template>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
  .page-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
