<script setup>
import { useAuthUserStore } from '@/stores/auth'
import { ref } from 'vue'
import { reactive } from 'vue'
import AuthFormInput from './AuthFormInput.vue'
import AuthFormErrorMessage from './AuthFormErrorMessage.vue'
import { required, pattern, minLength, maxLength, email } from '@/utils/formValidation'
import useFormValidation from '@/composables/formValidation'
import SpinnerContainer from '../spinner/SpinnerContainer.vue'
import { useAlertBoxStore } from '@/stores/alertBox'
import { useRouter } from 'vue-router'

const formData = reactive({
  email: '',
  name: '',
  fullname: '',
  password: '',
})

const responseError = ref(false)

const { addSuccess } = useAlertBoxStore()

const validation = {
  email: [required('email je obavezan'), email('nevalidan')],
  password: [
    required('šifra je obavezan'),
    pattern({
      msg: 'šifra mora da sadži jedno veliko slovo, jedan broj i minimalno 8 karaktera',
      regex: /^(?=.*[A-Z])(?=.*\d).{8,}$/gim,
    }),
  ],
  name: [
    required('ime je obavezno'),
    minLength({ msg: 'min', length: 3 }),
    maxLength({ msg: 'max', length: 60 }),
  ],
  fullname: [
    required('prezime je obavezno'),
    minLength({ msg: 'min', length: 3 }),
    maxLength({ msg: 'max', length: 60 }),
  ],
}

const router = useRouter()

const { onSubmit, errors } = useFormValidation({
  values: formData,
  validation,
  onSuccess: submitFormHandler,
})

const loading = ref(false)
const { register } = useAuthUserStore()

async function submitFormHandler() {
  try {
    loading.value = true
    await register(formData)
    addSuccess({ content: 'uspešno ste izvršili registraciju' })
    router.push({ name: 'login' })
  } catch (e) {
    responseError.value = e?.response?.data?.message || 'something wrong'
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

      <AuthFormInput v-model="formData.name" label-id="firstName" title="ime" :error="errors?.name">
        <template #icon>
          <i class="fas fa-user"></i>
        </template>
      </AuthFormInput>
      <AuthFormInput
        v-model="formData.fullname"
        label-id="lastName"
        title="prezime"
        :error="errors?.fullname"
      >
        <template #icon>
          <i class="fas fa-user"></i>
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
    <button class="auth-form-submit-btn" :disabled="loading" type="submit">registruj se</button>
    <AuthFormErrorMessage
      v-if="responseError"
      custom-class="response-error"
      :message="responseError"
    ></AuthFormErrorMessage>
  </form>
  <SpinnerContainer v-if="loading"></SpinnerContainer>
</template>
