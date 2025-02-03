<script setup>
import { useAuthUserStore } from '@/stores/auth'

const { logout, getUser } = useAuthUserStore()
</script>

<template>
  <RouterLink :to="{ name: 'main-dash' }" class="nav-bar-link">
    <span class="icon"><i class="fas fa-user"></i></span>
    <span class="user-title">{{ getUser.name }}</span>
  </RouterLink>
  <button type="button" @click="logout" class="nav-bar-link">
    <i class="fa-solid fa-right-from-bracket"></i>
  </button>
</template>

<style scoped>
.nav-bar-link {
  span.test {
    &::first-letter {
      text-transform: lowercase;
    }
  }
}
</style>
