<script setup>
import useFormValidation from '@/composables/formValidation'
import { useAuthUserStore } from '@/stores/auth'
import { ref } from 'vue'
import { reactive } from 'vue'
import { required } from '@/utils/formValidation'
import AuthFormInput from './AuthFormInput.vue'
import SpinnerContainer from '../spinner/SpinnerContainer.vue'
import AuthFormErrorMessage from './AuthFormErrorMessage.vue'
import { useAlertBoxStore } from '@/stores/alertBox'

const formData = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const responseError = ref(false)
const { login } = useAuthUserStore()
const { addError } = useAlertBoxStore()

const validation = {
  email: [required('email je obavezan')],
  password: [required('šifra je obavezan')],
}

const { onSubmit, errors } = useFormValidation({
  values: formData,
  validation,
  onSuccess: submitFormHandler,
})

async function submitFormHandler() {
  try {
    loading.value = true
    await login(formData)
  } catch (e) {
    responseError.value = e?.response?.data?.message || 'something wrong'
    addError({ content: responseError.value })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <div class="fields-container">
      <AuthFormInput v-model="formData.email" label-id="email" title="email" :error="errors?.email">
        <template #icon>
          <i class="fas fa-envelope"></i>
        </template>
      </AuthFormInput>
      <AuthFormInput
        v-model="formData.password"
        label-id="password"
        title="šifra"
        input-type="password"
        :error="errors?.password"
      >
        <template #icon>
          <i class="fas fa-lock"></i>
        </template>
      </AuthFormInput>
    </div>
    <button class="auth-form-submit-btn" :disabled="loading" type="submit">prijavi se</button>
    <AuthFormErrorMessage
      v-if="responseError"
      custom-class="response-error"
      :message="responseError"
    ></AuthFormErrorMessage>
  </form>
  <SpinnerContainer v-if="loading"></SpinnerContainer>
</template>
