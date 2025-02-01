<script setup>
import { useAuthUserStore } from '@/stores/auth'
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'

const { role } = useAuthUserStore()

const asyncComponents = {
  admin: defineAsyncComponent(() => import('@/views/AdminDash/PreviewDashContent.vue')),
  user: defineAsyncComponent(() => import('@/views/UserDash.vue')),
}

const currentComponent = computed(() => asyncComponents[role])
</script>

<template>
  <component :is="currentComponent" />
</template>
