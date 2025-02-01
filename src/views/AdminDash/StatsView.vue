<script setup>
import { onBeforeMount } from 'vue'
import Stats from '@/api/stats'
import { ref } from 'vue'
import { useAlertBoxStore } from '@/stores/alertBox'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import ErrorContainer from '@/components/error/ErrorContainer.vue'
import AdminDashContentLayout from '@/components/layout/AdminDashContentLayout.vue'
import StatsContent from '@/components/dash/StatsContent.vue'
const isError = ref(false)
const stats = ref(null)
const isLodaing = ref(false)
onBeforeMount(() => {
  getStats()
})
const { addError } = useAlertBoxStore()

const getStats = async () => {
  try {
    isLodaing.value = true
    isError.value = false
    const response = await Stats.getStats()
    stats.value = response.data.data
  } catch (e) {
    isError.value = true
    addError()
  } finally {
    isLodaing.value = false
  }
}
</script>

<template>
  <AdminDashContentLayout>
    <template v-if="isLodaing">
      <SpinnerContainer class="spinner-custom" />
    </template>
    <ErrorContainer v-else-if="isError" />
    <StatsContent class="stats-page-container" v-else :stats />
  </AdminDashContentLayout>
</template>

<style scoped>
.stats-page-container {
  height: 100%;
}
</style>
