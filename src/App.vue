<script setup>
import { RouterView } from 'vue-router'
import { useLoadingRouteStore } from './stores/loadingRoute'
import { toRefs } from 'vue'
import AlertsLayout from './components/alerts/AlertLayout.vue'
import SpinnerContainer from './components/spinner/SpinnerContainer.vue'
import HomeView from './views/HomeView.vue'

const { isLoading } = toRefs(useLoadingRouteStore())
</script>

<template>
  <HomeView />
  <AlertsLayout />
  <template v-if="isLoading">
    <SpinnerContainer />
  </template>
  <RouterView />
</template>

<style scoped></style>
