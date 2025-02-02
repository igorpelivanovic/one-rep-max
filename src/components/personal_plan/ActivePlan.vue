<script setup>
import { ref, onBeforeMount } from 'vue'
import { usePlanStore } from '@/stores/planStore'
import DeactivatePlanButton from './DeactivatePlanButton.vue'
import WorkoutInWeeklyPlan from './workout/WorkoutInWeeklyPlan.vue'

const props = defineProps({
  deactivate: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['loadingDone'])

const planStore = usePlanStore()

const weeklyPlan = ref(null)
const workouts = ref([])

async function getActivePlan() {
  try {
    const res1 = await planStore.checkActiveWeek(planStore.planData.id)
    const res2 = await planStore.getActiveWeeklyPlan(res1.data.data.id)
    weeklyPlan.value = res2.data.data
    workouts.value = res2.data.data.workouts
  } catch (e) {
    console.log(e)
  }
}

onBeforeMount(async () => {
  await getActivePlan()
  emit('loadingDone', false)
})
</script>

<template>
  <div class="weekly-plan-wrapper">
    <div class="title">
      <h2>Plan vežbanja</h2>
      <DeactivatePlanButton v-if="props.deactivate"></DeactivatePlanButton>
    </div>
    <div class="workouts">
      <WorkoutInWeeklyPlan
        v-for="wko in workouts"
        :key="wko.id"
        :workout-data="wko"
      ></WorkoutInWeeklyPlan>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 2rem;
}

.weekly-plan-wrapper .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weekly-plan-wrapper .workouts {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media screen and (min-width: 601px) {
  .weekly-plan-wrapper .workouts {
    grid-template-columns: repeat(3, 1fr);
  }

  .weekly-plan-wrapper .workouts:has(> :last-child:nth-child(4)) {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1024px) {
  .weekly-plan-wrapper .workouts:has(> :last-child:nth-child(4)) {
    grid-template-columns: repeat(4, 1fr);
  }

  .weekly-plan-wrapper .workouts:has(> :last-child:nth-child(5)) {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
