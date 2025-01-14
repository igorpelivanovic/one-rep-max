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
  <div>
    <div ref="popUpLayout">
      <div v-if="enableClose">
        <button type="button" @click="btnClickHandle">close</button>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
