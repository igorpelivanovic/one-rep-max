<script setup>
import { useAuthUserStore } from '@/stores/auth'

const authStore = useAuthUserStore()
console.log('profile view')
function handleLogout() {
  authStore.logout()
}
</script>

<template>
  {{ authStore.getUser.usr_email || 'asd' }}
  <RouterLink to="/post">post</RouterLink>

  <button @click="handleLogout">logout</button>
</template>
