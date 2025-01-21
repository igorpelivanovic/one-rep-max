<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="container">
    <div class="icon-container">
      <i class="fas fa-magnifying-glass"></i>
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  .icon-container {
    display: flex;
    font-size: 2.5rem;
    padding: 25px;
    border-radius: 50%;
    border: 2px solid;
    color: var(--blue-600);
  }
  .message-container {
    text-align: center;
    h1 {
      &::first-letter {
        text-transform: capitalize;
      }
      margin-bottom: 0;
    }
    p {
      color: var(--gray-700);

      margin-top: 10px;
      font-size: 0.95rem;
      &::first-letter {
        text-transform: capitalize;
      }
    }
  }
  .actions-btn-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: fit-content;
    .nav-element {
      cursor: pointer;
      text-decoration: none;
      text-transform: uppercase;
      background-color: transparent;
      width: 200px;
      padding: 8px 20px;
      border-radius: 5px;
      border: 2px solid var(--blue-700);
      color: var(--blue-700);
      position: relative;
      &::before {
        z-index: -1;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0%;
        background-color: var(--blue-700);
        transition: 0.3s;
      }
      &:hover {
        border-color: var(--blue);
        color: var(--gray);
        &::before {
          height: 100%;
        }
      }
    }
  }
}
</style>
