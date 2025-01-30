<script setup>
import AuthFormContainer from '@/components/authForm/AuthFormContainer.vue'
import RegisterForm from '@/components/authForm/RegisterForm.vue'
</script>

<template>
  <AuthFormContainer title="kreiraj nalog">
    <template #body>
      <RegisterForm></RegisterForm>
    </template>
    <template #footer>
      <p class="footer-content">
        imate profil?
        <RouterLink class="auth-page-link" :to="{ name: 'login' }">prijavite se</RouterLink>
      </p>
    </template>
  </AuthFormContainer>
</template>
