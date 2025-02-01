<script setup>
import { useAuthUserStore } from '@/stores/auth'
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'

const { role } = useAuthUserStore()

const asyncComponents = {
  admin: defineAsyncComponent(() => import('@/views/AdminDash/AdminDashView.vue')),
}

const currentComponent = computed(() => asyncComponents[role])
</script>

<template>
  <template v-if="currentComponent">
    <component :is="currentComponent" />
  </template>
  <RouterView v-else />
</template>
