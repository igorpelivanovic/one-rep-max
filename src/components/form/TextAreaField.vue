<script setup lang="ts">
import { computed } from 'vue'
import FieldBaseInput from './FieldBaseInput.vue'
import { useSlots } from 'vue'
const { labelId, error, modelValue, title, styleClass, renderClearBtn } = defineProps({
  labelId: {
    required: true,
    type: String,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  error: {
    type: [String, undefined],
  },
  title: {
    type: String,
    default: '',
  },
  styleClass: {
    type: String,
    default: '',
  },
  renderClearBtn: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const changeInputValue = (val) => {
  emit('update:modelValue', val)
  return
}

const formatCustomClass = computed(() => styleClass.concat(' text-area-field'))

const changeValue = (t) => {
  changeInputValue(t.target.value)
}

const slots = useSlots()
</script>

<template>
  <FieldBaseInput
    :label-id
    :error
    :value="modelValue"
    :title
    :style-class="formatCustomClass"
    @clear-input="changeInputValue"
    :render-clear-btn
  >
    <template #icon v-if="slots.icon">
      <slot name="icon"></slot>
    </template>
    <template #field>
      <textarea placeholder="" :value="modelValue" :id="labelId" @input="changeValue"></textarea>
    </template>
    <template #other>
      <slot name="other"></slot>
    </template>
  </FieldBaseInput>
</template>
