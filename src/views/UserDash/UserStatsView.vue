<script setup>
import { ref, onBeforeMount } from 'vue'
import Stats from '@/api/stats'
import PersonalRecords from '@/components/personal_plan/stats/PersonalRecords.vue'
import UserChallenges from '@/components/personal_plan/stats/UserChallenges.vue'
import PlanRecords from '@/components/personal_plan/stats/PlanRecords.vue'
import OrmRecords from '@/components/personal_plan/stats/OrmRecords.vue'

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
    <div class="user-stats-wrapper" v-else>
      <div class="achievements-container">
        <UserChallenges :num-of-challenges="stats.challenges"></UserChallenges>
        <PersonalRecords
          :records="stats.personalRecords"
          :loaded="!loading"
          :is-on-dash="false"
        ></PersonalRecords>
      </div>
      <div class="plan-stats-container">
        <h2>Istorija planova vežbanja</h2>
        <PlanRecords :loaded="!loading" :plans="stats.plansStats"></PlanRecords>
      </div>
      <div class="orm-stats-container margin-bottom">
        <h2>OneRepMax istorija</h2>
        <OrmRecords :loaded="!loading" :orm-groups="stats.ormStats.groups"></OrmRecords>
      </div>
      <div class="orm-stats-container">
        <h2>OneRepMax rekordi</h2>
        <OrmRecords
          :loaded="!loading"
          :orm-groups="[[stats.ormStats.record]]"
          :navigation="false"
          :pagination="false"
          :is-personal-record="true"
        ></OrmRecords>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-stats-container {
  height: 300vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.achievements-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.no-data-wrapper {
  background-color: var(--orange);
  color: var(--blue-600);
  padding: 2rem;
  border-radius: 2rem;
  margin-bottom: 2rem;
}

.user-stats-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.plan-stats-container,
.orm-stats-container {
  position: relative;
  height: auto;
}

.margin-bottom {
  margin-bottom: 2rem;
}
</style>
