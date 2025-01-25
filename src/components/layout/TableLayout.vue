<script setup>
import { useTemplateRef } from 'vue'

const { customClass } = defineProps({
  customClass: {
    type: [String, Object],
    default: '',
  },
})

const tableBody = useTemplateRef('tableBody')

defineExpose({ tableBody })
</script>

<template>
  <div class="table-wrapper" :class="customClass">
    <div class="table-header-container">
      <slot name="header"></slot>
    </div>
    <div class="table-body-container" ref="tableBody">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
  overflow: hidden;
  .table-header-container {
  }
  .table-body-container {
    width: 100%;
    overflow: hidden;
    flex: 1 0px;
    display: flex;
    flex-direction: column;
  }
}
</style>
