<script setup>
import AuthFormContainer from '@/components/authForm/AuthFormContainer.vue'
import LoginForm from '@/components/authForm/LoginForm.vue'
</script>

<template>
  <div class="auth-page-wrapper">
    <AuthFormContainer title="prijavi se">
      <template #body>
        <LoginForm></LoginForm>
      </template>
      <template #footer>
        <p class="footer-content">
          Nemate profil?
          <RouterLink class="link-content" :to="{ name: 'register' }">registruj se</RouterLink>
        </p>
      </template>
    </AuthFormContainer>
  </div>
</template>

<style scoped>
.auth-page-wrapper {
  background: linear-gradient(136.83deg, var(--blue-600) 17%, var(--blue-900) 100%);
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
p.footer-content {
  margin: 0;
  text-align: center;
  .link-content {
    text-transform: capitalize;
  }
}
</style>
