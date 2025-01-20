<script setup>
import { RouterView } from 'vue-router'
import { useLoadingRouteStore } from './stores/loadingRoute'
import { toRefs } from 'vue'
import AlertsLayout from './components/alerts/AlertLayout.vue'
import SpinnerContainer from './components/spinner/SpinnerContainer.vue'

const { isLoading } = toRefs(useLoadingRouteStore())
</script>

<template>
  <AlertsLayout />
  <template v-if="isLoading">
    <SpinnerContainer />
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>

<style scoped></style>
