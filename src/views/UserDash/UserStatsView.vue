<script setup>
import { ref, onBeforeMount } from 'vue'
import Stats from '@/api/stats'
import PersonalRecords from '@/components/personal_plan/stats/PersonalRecords.vue'
import UserChallenges from '@/components/personal_plan/stats/UserChallenges.vue'

const loading = ref(true)
const stats = ref([])

onBeforeMount(async () => {
  try {
    const res = await Stats.getStats()
    stats.value = res.data.data
    console.log(stats.value)
    loading.value = false
  } catch (error) {
    if (error.status === 404) {
      stats.value = null
    }
    loading.value = false
  }
})
</script>

<template>
  <UserChallenges :num-of-challenges="stats.challenges"></UserChallenges>
  <PersonalRecords
    :records="stats.personalRecords"
    :loaded="!loading"
    :is-on-dash="false"
  ></PersonalRecords>
</template>

<style scoped></style>
