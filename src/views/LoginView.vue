<script setup>
import AuthFormContainer from '@/components/authForm/AuthFormContainer.vue'
import LoginForm from '@/components/authForm/LoginForm.vue'
</script>

<template>
  <div class="auth-page-wrapper">
    <AuthFormContainer title="dobrodošli nazad">
      <template #body>
        <LoginForm></LoginForm>
      </template>
      <template #footer>
        <p class="footer-content">
          Nemate profil?
          <RouterLink class="auth-page-link" :to="{ name: 'register' }">registrujte se</RouterLink>
        </p>
      </template>
    </AuthFormContainer>
  </div>
</template>

<style scoped></style>
