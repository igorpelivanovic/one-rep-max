<script setup>
import { RouterLink } from 'vue-router'
import AuthLinks from './AuthLinks.vue'
import { useAuthUserStore } from '@/stores/auth'
import AuthUserInfo from './AuthUserInfo.vue'

const { getUser } = useAuthUserStore()
</script>

<template>
  <nav class="navbar" id="main-nav">
    <RouterLink to="/">
      <img src="@/assets/logo.png" alt="logo" class="logo-img" />
    </RouterLink>
    <div class="auth-container">
      <AuthUserInfo v-if="getUser" />
      <AuthLinks v-else />
    </div>
  </nav>
</template>

<style scoped>
nav.navbar#main-nav {
  flex: initial;
  z-index: 100;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #000000;
  color: white;
}
.auth-container {
  margin-right: 10px;
  display: flex;
  gap: 10px;
}
.logo {
  display: inline-block;
}
.logo-img {
  height: 25px;
  width: auto;
}

@media screen and (min-width: 601px) {
  .auth-container {
    gap: 15px;
  }
}
@media screen and (min-width: 1025px) {
  .auth-container {
    gap: 20px;
  }
}
</style>
