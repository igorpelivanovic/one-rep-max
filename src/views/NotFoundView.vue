<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="container error-page">
    <div class="icon-container">
      <span class="icon">
        <i class="fas fa-magnifying-glass"></i>
      </span>
    </div>
    <div class="message-container">
      <h1>404 Sadržaj nije pronadjen</h1>
      <p>sadržaj koji ste tražili je obrisan ili premešten.</p>
    </div>
    <div class="actions-btn-container">
      <button @click="router.back()" class="nav-element">vrati se nazad</button>
      <button @click="router.replace({ name: 'home' })" class="nav-element">
        vrati se na početnu
      </button>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 481px) {
  .container {
    .actions-btn-container {
      .nav-element {
        width: 200px;
        padding-inline: 20px;
      }
    }
  }
}
</style>
