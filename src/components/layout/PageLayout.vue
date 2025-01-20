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
  <div class="bg-white page-container">
    <slot name="loading" v-if="showLoading"></slot>
    <div class="container" v-else>
      <div class="page-header">
        <slot name="header"></slot>
      </div>
      <div class="page-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  .container {
    margin-block: 20px 40px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 60px;
    .page-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
