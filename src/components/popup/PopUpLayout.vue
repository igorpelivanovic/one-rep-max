<script setup>
import useClickOutside from '@/composables/clickOutside'
import { computed } from 'vue'
import { useTemplateRef } from 'vue'
import { defineProps } from 'vue'
const { enableClose, clickOutSideClose, excludesRef } = defineProps({
  enableClose: {
    type: Boolean,
    default: false,
  },
  clickOutSideClose: {
    type: Boolean,
    default: true,
  },
  excludesRef: {
    type: [Array, HTMLElement],
    default: () => [],
  },
})

const formatExcludesRefs = computed(() =>
  Array.isArray(excludesRef) ? excludesRef : [excludesRef],
)

const containerRef = useTemplateRef('popUpLayout')

const clickOutsideHandle = () => {
  if (clickOutSideClose) {
    emit('close')
  }
}

useClickOutside(containerRef, clickOutsideHandle, formatExcludesRefs.value)

const emit = defineEmits(['close'])

function btnClickHandle() {
  emit('close')
  return
}
</script>

<template>
  <div class="popUpWrapper body-disable-scroll">
    <div ref="popUpLayout" class="popUpContainer">
      <div v-if="enableClose">
        <button type="button" @click="btnClickHandle">close</button>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popUpWrapper {
  background-color: var(--transparent-gray);
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .popUpContainer {
    background-color: var(--gray);
    min-width: 400px;
    max-width: 450px;
    min-height: 250px;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;
    border: 1px solid var(--gray);
  }
}
</style>
