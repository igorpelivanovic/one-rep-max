<script setup>
import PersonalPlan from '@/components/personal_plan/PersonalPlan.vue'
import PersonalRecords from '@/components/personal_plan/stats/PersonalRecords.vue'
import { ref, onBeforeMount } from 'vue'
import Stats from '@/api/stats'
import UserChallenges from '@/components/personal_plan/stats/UserChallenges.vue'

const loading = ref(true)
const records = ref([])
const challenges = ref(0)

onBeforeMount(async () => {
  try {
    const res = await Stats.getStats()
    records.value = res.data.data.personalRecords
    challenges.value = res.data.data.challenges
    loading.value = false
  } catch (error) {
    if (error.status === 404) {
      records.value = []
    }
    loading.value = false
  }
})
</script>

<template>
  <PersonalPlan></PersonalPlan>
  <UserChallenges :num-of-challenges="challenges"></UserChallenges>
  <PersonalRecords :records="records" :loaded="!loading"></PersonalRecords>
</template>
