<script setup>
import UserDashAside from '@/components/aside/UserDashAside.vue'
</script>

<template>
  <div class="dash-wrapper">
    <div class="dash-wrapper-content">
      <UserDashAside></UserDashAside>
      <main>
        <RouterView></RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dash-wrapper {
  height: auto;
  display: flex;
  width: 100%;
  .dash-wrapper-content {
    width: 100%;
    height: auto;
    display: flex;
    gap: 45px;
    main {
      flex: 0 1 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 1rem;
    }
  }
}

@media screen and (min-width: 1025px) {
  .dash-wrapper {
    height: 100dvh;
    .dash-wrapper-content {
      margin-block: auto;
      height: 80dvh;
      main {
        padding-right: 50px;
        padding-block: 0px;
      }
    }
  }
}
</style>

<style>
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
</style>
