<script setup>
import AdminDashAside from '@/components/aside/AdminDashAside.vue'
</script>

<template>
  <div class="dash-wrapper">
    <div class="dash-wrapper-content">
      <AdminDashAside />
      <main>
        <RouterView />
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
      overflow: hidden;
      flex: 0 1 100%;
      height: 100%;
      padding-right: 0px;
      padding-block: 20px 40px;
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
