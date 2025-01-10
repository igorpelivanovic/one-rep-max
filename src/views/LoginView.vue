<script setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { useAuthUserStore } from '@/stores/auth'

const formData = reactive({
  email: 'prochkhkedure@email.com',
  password: 'Rootroot12',
})

const loading = ref(false)
const { login } = useAuthUserStore()

async function submitFormHandler() {
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
  <form @submit.prevent="submitFormHandler">
    <input type="email" v-model="formData.email" />
    <input type="password" v-model="formData.password" />
    <button :disabled="loading" type="submit">login</button>
  </form>
  <p v-if="loading">loading....</p>
</template>
