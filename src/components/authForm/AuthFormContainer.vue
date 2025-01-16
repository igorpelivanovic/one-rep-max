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
.auth-page-wrapper {
  background: linear-gradient(136.83deg, var(--blue-600) 17%, var(--blue-900) 100%);
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  .auth-form-container {
    overflow: hidden;
    border-radius: 20px;
    width: 450px;
    background-color: var(--gray);
    min-height: 500px;
    max-height: 600px;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    .auth-form-container-header {
      text-transform: capitalize;
      text-align: center;
      h1 {
        margin: 0;
      }
    }
    .auth-form-container-body {
      margin-top: 30px;
      flex: 1;
    }
  }
}
</style>
