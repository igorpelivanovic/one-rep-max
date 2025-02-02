<script setup>
const { title, value } = defineProps({
  title: {
    type: String,
    default: '',
  },
  value: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="option-container">
    <div class="indicator-container">
      <span>
        <i class="fas" :class="value ? 'fa-check' : 'fa-xmark'"></i>
      </span>
    </div>
    <div class="label">
      <p>{{ title }}</p>
    </div>
  </div>
</template>
<style scoped>
.option-container {
  display: flex;
  align-items: flex-start;
  gap: 5px;
}
.indicator-container {
}
p {
  margin: 0;
  &::first-letter {
    text-transform: capitalize;
  }
}
</style>
