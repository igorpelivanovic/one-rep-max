<script setup>
import { useAuthUserStore } from '@/stores/auth'
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'

const { role } = useAuthUserStore()

const dynamicComponents = {
  admin: defineAsyncComponent(() => import('@/views/AdminDash/StatsView.vue')),
  user: defineAsyncComponent(() => import('@/views/UserDash/UserStatsView.vue')),
}

const activeComponent = computed(() => dynamicComponents[role])
</script>

<template>
  <component :is="activeComponent" />
</template>
