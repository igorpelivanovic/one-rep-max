<template>
  <RouterLink :to="{ name: 'login' }" class="nav-bar-link">
    <span class="title">prijavi se</span>
  </RouterLink>
  <RouterLink :to="{ name: 'register' }" class="nav-bar-link secondary">
    <span class="title">registruj se</span>
  </RouterLink>
</template>
