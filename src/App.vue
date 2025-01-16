<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useLoadingRouteStore } from './stores/loadingRoute'
import { toRefs } from 'vue'
import AlertsLayout from './components/alerts/AlertLayout.vue'

const { isLoading } = toRefs(useLoadingRouteStore())
</script>

<template>
  <template v-if="isLoading"> loading.... </template>
  <template v-else>
    <RouterView />
  </template>
</template>

<style scoped></style>
