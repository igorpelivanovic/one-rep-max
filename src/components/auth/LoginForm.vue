<script setup>
import useFormValidation from '@/composables/formValidation'
import { useAuthUserStore } from '@/stores/auth'
import { ref } from 'vue'
import { reactive } from 'vue'
import { required, email } from '@/utils/formValidation'

const formData = reactive({
  email: 'prochkhkemail.com',
  password: 'Rootroot12',
})

const loading = ref(false)
const { login } = useAuthUserStore()

const validation = {
  email: [required(), email()],
}

const { onSubmit, errors } = useFormValidation({
  values: formData,
  validation,
  onSuccess: submitFormHandler,
})

async function submitFormHandler(e) {
  try {
    loading.value = true
    await login(formData)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  login view
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="formData.email" />
    <span v-if="errors?.email">{{ errors.email }}</span>
    <input type="password" v-model="formData.password" />
    <button :disabled="loading" type="submit">login</button>
  </form>
  <p v-if="loading">loading....</p>
</template>
