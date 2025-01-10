<script setup>
import { useAuthUserStore } from '@/stores/auth'

const authStore = useAuthUserStore()

function handleLogout() {
  authStore.logout()
}
</script>

<template>
  {{ authStore.getUser.usr_email }}

  <button @click="handleLogout">logout</button>
</template>
