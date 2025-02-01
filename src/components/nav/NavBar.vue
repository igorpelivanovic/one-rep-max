<script>
export default {
  name: 'NavBar',
}
</script>

<template>
  <nav class="navbar">
    <router-link to="/">
      <img src="@/assets/logo.png" alt="logo" class="logo-img" />
    </router-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #000000;
  color: white;
  max-height: fit-content;
}
.logo {
  display: inline-block;
}
.logo-img {
  height: 25px;
  width: auto;
}
</style>
