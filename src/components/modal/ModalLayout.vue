<script setup lang="ts">
import PopUpLayout from '../popup/PopUpLayout.vue'
const emit = defineEmits(['denide', 'accept'])
</script>

<template>
  <PopUpLayout @close="emit('denide')" :enable-close="false" :click-out-side-close="false">
    <slot></slot>
  </PopUpLayout>
</template>
