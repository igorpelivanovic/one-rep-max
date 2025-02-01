<script setup>
import { useAuthUserStore } from '@/stores/auth'

const { logout, getUser } = useAuthUserStore()
</script>

<template>
  <RouterLink :to="{ name: '' }" class="nav-bar-link">
    <span class="icon"><i class="fas fa-user"></i></span>
    <span class="title">{{ getUser.name }}</span>
  </RouterLink>
  <button type="button" @click="logout" class="nav-bar-link">
    <i class="fa-solid fa-right-from-bracket"></i>
  </button>
</template>
