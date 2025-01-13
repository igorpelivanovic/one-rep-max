<script setup>
import { useAuthUserStore } from '@/stores/auth'
import { ref } from 'vue'
import { reactive } from 'vue'

const formData = reactive({
  email: 'prochkhkedure@email.com',
  name: 'asd',
  fullname: 'asdasd',
  password: 'Rootroot12',
})

const loading = ref(false)
const { register } = useAuthUserStore()

async function submitFormHandler() {
  try {
    loading.value = true
    await register(formData)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  register view
  <form @submit.prevent="submitFormHandler">
    <input type="text" v-model="formData.name" />
    <input type="text" v-model="formData.fullname" />
    <input type="email" v-model="formData.email" />
    <input type="password" v-model="formData.password" />
    <button :disabled="loading" type="submit">register</button>
  </form>
  <p v-if="loading">loading....</p>
</template>
