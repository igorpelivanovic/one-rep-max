<script setup>
import AuthFormErrorMessage from '../authForm/AuthFormErrorMessage.vue'

const { labelId, error, modelValue, title } = defineProps({
  labelId: {
    required: true,
    type: String,
  },
  modelValue: {
    type: [Boolean],
    required: true,
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

const onChange = (e) => {
  emit('update:modelValue', e.target.checked)
  return
}
</script>

<template>
  <div class="label-container">
    <label :for="labelId">
      <div class="input-container">
        <input type="checkbox" :value="modelValue" @change="onChange" :id="labelId" />
      </div>
      <span class="indicator">
        <i class="fas fa-check" v-if="modelValue"></i>
      </span>
      <div class="label">
        <span>{{ title }}</span>
      </div>
      <Transition name="error-message">
        <AuthFormErrorMessage v-if="error" :message="error"></AuthFormErrorMessage>
      </Transition>
    </label>
  </div>
</template>
<style scoped>
.label-container {
  position: relative;
  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    .input-container {
      display: none;
    }
    .indicator {
      border: 1px solid var(--gray-600);
      background-color: var(--white);
      align-self: flex-start;
      width: 30px;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      font-size: 1.1rem;
      i {
        display: flex;
      }
    }
    .label {
      span {
        display: inline-block;
        &::first-letter {
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
