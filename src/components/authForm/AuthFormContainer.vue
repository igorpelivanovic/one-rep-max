<script setup>
import { computed } from 'vue'
import { useSlots } from 'vue'

const { title } = defineProps({
  title: {
    type: String,
  },
})

const slot = useSlots()

const showFooter = computed(() => !!slot.footer)
</script>

<template>
  <div class="auth-form-container">
    <RouterLink :to="{ name: 'home' }" class="nav-link-logo">
      <img src="@/assets/logo.png" alt="logo" />
    </RouterLink>
    <div class="auth-form-container-header" v-if="title">
      <h1>{{ title }}</h1>
    </div>
    <div class="auth-form-container-body">
      <slot name="body"></slot>
    </div>
    <div class="auth-form-container-footer" v-if="showFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.auth-form-container {
  overflow: hidden;
  margin: auto;
  width: 100%;
  background-color: var(--gray);
  height: 100%;
  padding-block: 20px;
  padding-inline: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  justify-content: flex-end;
  .nav-link-logo {
    margin: auto;
    display: flex;
    width: 80px;
    aspect-ratio: 1/1;
    padding: 8px;
    background-color: var(--blue);
    border-radius: 50%;
    border: 4px solid var(--blue-600);
    transition: 0.2s;
    &:hover {
      background-color: var(--blue-500);

      img {
        transform: scale(1.05);
      }
    }
    img {
      transition: 0.2s;
      object-fit: contain;
      height: auto;
      width: 100%;
    }
  }
  .auth-form-container-header {
    text-align: center;
    margin-top: auto;
    h1 {
      font-size: 1.6rem;
      &::first-letter {
        text-transform: capitalize;
      }
      margin: 0;
    }
  }
  .auth-form-container-body {
    margin-top: 30px;
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

@media screen and (min-width: 481px) {
  .auth-form-container {
    padding-block: 10px 30px;
    .auth-form-container-header {
      h1 {
        font-size: 1.8rem;
      }
    }
    .auth-form-container-body {
      flex: 1;
    }
    width: 450px;
    padding-inline: 60px;
    border-radius: 20px;
    max-height: 750px;
    height: auto;
  }
}
</style>
