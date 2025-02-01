<script setup>
const { customClass } = defineProps({
  customClass: {
    type: [String, Object],
    default: '',
  },
})
</script>
<template>
  <div class="dash-section-container" :class="customClass">
    <div class="dash-content-header">
      <slot name="header"></slot>
    </div>
    <div class="dash-content-main">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style scoped>
.dash-section-container {
  /*   overflow: hidden;
 */
  background-color: transparent;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .dash-content-header {
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
    align-items: flex-end;
  }
  .dash-content-main {
    flex: 1 0px;
  }
}
@media screen and (min-width: 1281px) {
  .dash-section-container {
    .dash-content-main {
      overflow: auto;
    }
  }
}
</style>
