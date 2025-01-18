<script setup>
import { computed } from 'vue'
import { useSlots } from 'vue'
import { ref } from 'vue'
import AuthFormErrorMessage from '../authForm/AuthFormErrorMessage.vue'
import { useTemplateRef } from 'vue'

const { labelId, error, value, title, inputType, styleClass, renderClearBtn } = defineProps({
  labelId: {
    required: true,
    type: String,
  },
  value: {
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
    type: [String, Object],
    default: '',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  renderClearBtn: {
    type: Boolean,
    default: true,
  },
})

const wrapper = useTemplateRef('wrapper')

defineExpose({ wrapper })

const emit = defineEmits(['clearInput'])

const iType = ref(inputType)

const slots = useSlots()

const showClearBtn = computed(() => value.toString().length > 0)
const isHiddenData = computed(() => iType.value === inputType)
const isSelectInput = computed(() => inputType === 'select')

const toggleInputType = () => {
  if (isHiddenData.value) {
    iType.value = 'text'
    return
  }
  iType.value = inputType
}
</script>

<template>
  <div class="label-container" ref="wrapper" :class="styleClass">
    <component
      :is="isSelectInput ? 'div' : 'label'"
      v-bind="isSelectInput ? { class: 'select-label' } : { for: labelId }"
    >
      <div class="field-border">
        <div class="icon-container" v-if="slots.icon">
          <slot name="icon"></slot>
        </div>
        <div class="field-container">
          <span class="label">{{ title }}</span>
          <div class="input-container">
            <slot name="field" v-if="slots.field"></slot>
            <template v-if="showClearBtn">
              <button v-if="inputType === 'password'" type="button" @click="toggleInputType">
                <i class="fas" :class="isHiddenData ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
              <button type="button" @click="emit('clearInput', '')" v-if="renderClearBtn">
                <i class="fas fa-xmark"></i>
              </button>
            </template>
          </div>
          <slot name="other"></slot>
        </div>
        <Transition name="error-message">
          <AuthFormErrorMessage v-if="error" :message="error"></AuthFormErrorMessage>
        </Transition>
      </div>
    </component>
  </div>
</template>
