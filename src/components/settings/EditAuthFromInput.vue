<script setup>
import { ref, useTemplateRef, nextTick } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  title: {
    type: String,
    required: true,
  },
  iLabel: {
    type: String,
    required: true,
  },
  iValue: {
    type: String,
    required: true,
  },
  validator: {
    type: Function,
    default: (val) => {
      if (val != '') {
        return val
      } else return false
    },
  },
})

const emit = defineEmits(['inputChange'])

const firstInput = useTemplateRef('first-input-element')
const requestChange = ref(false)
const newValue = ref(props.iValue)
const newValue1 = ref(props.iValue)
const validPassword = ref(false)
const showPassword = ref(false)
const error = ref(false)
const errorMsg = ref('')

function handleRequestChange() {
  requestChange.value = true
  validPassword.value = false
  nextTick(() => {
    firstInput.value.focus()
  })
}

function toggleShowPassword(event) {
  if (!requestChange.value) {
    return
  }
  event.stopPropagation()
  showPassword.value = !showPassword.value
}

function handleSubmit() {
  if (props.type === 'password' && newValue.value != newValue1.value) {
    error.value = true
    errorMsg.value = 'Lozinka se ne poklapa'
    return
  }
  const check = props.validator(newValue.value)
  if (check) {
    requestChange.value = !requestChange.value
    if (props.type === 'password') {
      validPassword.value = true
    }
    error.value = false
    emit('inputChange', newValue.value)
  } else {
    if (newValue.value === '') {
      if (props.type === 'password') {
        emit('inputChange', '')
      }
      requestChange.value = false
      return
    }
    error.value = true
    errorMsg.value = 'Neispravna vrednost'
  }
}
</script>

<template>
  <div class="data-field-container">
    <div>
      <div v-if="props.type === 'password'" class="data-field-wrapper">
        <span class="title">{{ props.title }}</span>
        <div
          class="data-input-wrapper show-password"
          :class="{ 'error-input': error, 'valid-password': validPassword }"
          @click="(event) => event.target.children[0].focus()"
        >
          <input
            v-if="!showPassword"
            ref="first-input-element"
            :type="props.type"
            v-model="newValue"
            @keyup.enter="handleSubmit"
            :disabled="!requestChange"
          />
          <span v-else>{{ newValue }}</span>
          <div>
            <button v-if="showPassword" @click="toggleShowPassword">
              <i class="fa-regular fa-eye"></i>
            </button>
            <button v-else @click="toggleShowPassword">
              <i class="fa-regular fa-eye-slash"></i>
            </button>
          </div>
        </div>
        <div
          class="data-input-wrapper show-password"
          :class="{ 'error-input': error, 'valid-password': validPassword }"
          @click="(event) => event.target.children[0].focus()"
        >
          <input
            v-if="!showPassword"
            :type="props.type"
            v-model="newValue1"
            @keyup.enter="handleSubmit"
            :disabled="!requestChange"
          />
          <span v-else>{{ newValue1 }}</span>
          <div>
            <button v-if="showPassword" @click="toggleShowPassword">
              <i class="fa-regular fa-eye"></i>
            </button>
            <button v-else @click="toggleShowPassword">
              <i class="fa-regular fa-eye-slash"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="data-field-wrapper">
        <span class="title">{{ props.title }}</span>
        <span v-if="!requestChange" class="value">{{ props.iValue }}</span>
        <div
          v-else
          class="data-input-wrapper"
          :class="{ 'error-input': error }"
          @click="(event) => event.target.children[0].focus()"
        >
          <input
            ref="first-input-element"
            :type="props.type"
            v-model="newValue"
            @keyup.enter="handleSubmit"
          />
        </div>
      </div>
      <span v-if="error" class="error-message">{{ errorMsg }}</span>
    </div>
    <div>
      <button class="edit-submit-button" v-if="!requestChange" @click="handleRequestChange">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button class="edit-submit-button" v-else @click="handleSubmit">
        <i class="fa-solid fa-check"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.data-field-container {
  width: 100%;
  max-width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.data-field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  text-transform: capitalize;
}

.value {
  font-weight: 700;
}

.data-input-wrapper {
  padding: 0.5rem;
  border: 1px solid var(--gray-700);
  border-radius: 1rem;
  cursor: text;
}

.data-input-wrapper:has(input:disabled) {
  pointer-events: none;
  opacity: 0.5;
}

.show-password {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.show-password > span {
  width: 200px;
}

.show-password button {
  width: 35px;
}

input {
  width: 200px;
  border: none;
  background: inherit;
  pointer-events: none;
}

button {
  background: none;
  border: none;
  color: var(--black);
  padding: 0.5rem;
  cursor: pointer;
}

.error-input {
  border-color: var(--red);
}

.error-message {
  color: var(--red);
  font-size: 0.8rem;
}

.valid-password {
  opacity: 0.5;
}
</style>
