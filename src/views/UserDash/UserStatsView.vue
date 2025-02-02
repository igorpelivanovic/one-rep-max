<script setup>
import { ref, onBeforeMount } from 'vue'
import Stats from '@/api/stats'
import PersonalRecords from '@/components/personal_plan/stats/PersonalRecords.vue'
import UserChallenges from '@/components/personal_plan/stats/UserChallenges.vue'

const loading = ref(true)
const stats = ref(null)

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
  <div class="user-stats-container">
    <div v-if="!stats" class="no-data-wrapper">
      <h2>
        <span><i class="fa-solid fa-trophy"></i> </span> Već posle prvog treninga ovde ćeš moći da
        vidiš svoje uspehe i rekorde!
      </h2>
    </div>
    <div v-else>
      <UserChallenges :num-of-challenges="stats.challenges"></UserChallenges>
      <PersonalRecords
        :records="stats.personalRecords"
        :loaded="!loading"
        :is-on-dash="false"
      ></PersonalRecords>
    </div>
  </div>
</template>

<style scoped>
.user-stats-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-data-wrapper {
  background-color: var(--orange);
  color: var(--blue-600);
  padding: 2rem;
  border-radius: 2rem;
  margin-bottom: 2rem;
}
</style>
