<script setup>
import { useSlots } from 'vue'
import { ref } from 'vue'
import { computed } from 'vue'
import AuthFormErrorMessage from './AuthFormErrorMessage.vue'

const { labelId, error, modelValue, title, inputType } = defineProps({
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
  inputType: {
    type: String,
    default: 'text',
  },
  title: {
    type: String,
    default: '',
  },
})

const iType = ref(inputType)

const slots = useSlots()

const showClearBtn = computed(() => modelValue.toString().length > 0)
const isHiddenData = computed(() => iType.value === inputType)

const toggleInputType = () => {
  if (isHiddenData.value) {
    iType.value = 'text'
    return
  }
  iType.value = inputType
}
</script>

<template>
  <div class="label-container">
    <label :for="labelId">
      <div class="field-border">
        <div class="icon-container" v-if="slots.icon">
          <slot name="icon"></slot>
        </div>
        <div class="field-container">
          <span class="label">{{ title }}</span>
          <div class="input-container">
            <input
              :type="iType"
              :value="modelValue"
              placeholder=""
              :id="labelId"
              @input="$emit('update:modelValue', $event.target.value)"
              autocomplete="off"
            />
            <template v-if="showClearBtn">
              <button v-if="inputType === 'password'" type="button" @click="toggleInputType">
                <i class="fas" :class="isHiddenData ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
              <button type="button" @click="$emit('update:modelValue', '')">
                <i class="fas fa-xmark"></i>
              </button>
            </template>
          </div>
        </div>
        <Transition name="error-message">
          <AuthFormErrorMessage v-if="error" :message="error"></AuthFormErrorMessage>
        </Transition>
      </div>
    </label>
  </div>
</template>

<style scoped>
.error-message-enter-active,
.error-message-leave-active {
  transition: all 0.2s ease;
}

.error-message-enter-from,
.error-message-leave-to {
  opacity: 0;
  transform: translateY(-20%);
}
</style>
