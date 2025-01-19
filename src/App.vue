<script setup>
import { RouterView } from 'vue-router'
import { useLoadingRouteStore } from './stores/loadingRoute'
import { toRefs } from 'vue'
import AlertsLayout from './components/alerts/AlertLayout.vue'
import UserProfileView from './views/UserProfileView.vue'
const { isLoading } = toRefs(useLoadingRouteStore())
</script>

<template>
  <AlertsLayout />
  <template v-if="isLoading"> loading.... </template>
  <template v-else>
    <RouterView />
  </template>
  <UserProfileView></UserProfileView>
</template>

<style scoped></style>
