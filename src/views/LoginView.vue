<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const { query, path } = useRoute()

const isRegisterForm = computed(() => query.f == 'r')
</script>

<template>
  <RegisterForm v-if="isRegisterForm" />
  <LoginForm v-else />
</template>
