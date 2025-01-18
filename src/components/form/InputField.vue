<script setup lang="ts">
import { useSlots } from 'vue'
import FieldBaseInput from './FieldBaseInput.vue'
const { labelId, error, modelValue, title, inputType } = defineProps({
  labelId: {
    required: true,
    type: String,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  inputType: {
    type: String,
    default: 'text',
  },
  error: {
    type: [String, undefined],
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const slots = useSlots()

const changeInputValue = (val) => {
  emit('update:modelValue', val)
  return
}

const changeValue = (e) => {
  changeInputValue(e.target.value)
}
</script>

<template>
  <FieldBaseInput
    :label-id
    :error
    :value="modelValue"
    :title
    style-class="text-area-field"
    @clear-input="changeInputValue"
  >
    <template #icon v-if="slots.icon">
      <slot name="icon"></slot>
    </template>
    <template #field>
      <input
        :type="inputType"
        placeholder=""
        :id="labelId"
        :value="modelValue"
        @input="changeValue"
      />
    </template>
    <template #other>
      <slot name="other"></slot>
    </template>
  </FieldBaseInput>
</template>
