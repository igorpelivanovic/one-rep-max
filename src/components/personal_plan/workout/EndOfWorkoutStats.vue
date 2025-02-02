<script setup>
import { ref, onBeforeMount } from 'vue'
import { usePlanStore } from '@/stores/planStore'
import { useRoute, useRouter } from 'vue-router'
import ExerciseInWorkoutStats from './ExerciseInWorkoutStats.vue'
import { getUsedWeightByExeId } from '@/utils/exeInWkoToken'

const props = defineProps({
  challenge: {
    type: Object,
    default: null,
  },
})

const route = useRoute()
const router = useRouter()

const planStore = usePlanStore()
const exercisesData = ref(null)

onBeforeMount(async () => {
  const res = await planStore.getWorkout(+route.params.id)
  exercisesData.value = res.data.data.exercises
  console.log(exercisesData)
})

async function handleWorkoutEnd(event) {
  try {
    event.target.disabled = true
    let usedWeights = []
    exercisesData.value.forEach((exe) => {
      const weight = getUsedWeightByExeId(exe.id)
      usedWeights.push({ exeId: exe.id, weight })
    })
    await planStore.setWorkoutStats(+route.params.id, usedWeights)
    await planStore.finishWorkout(+route.params.id)
    if (props.challenge) {
      await planStore.addChallengeToStats()
    }
    event.target.disabled = false
    router.push({ name: 'user' })
  } catch (error) {
    event.target.disabled = false
    console.log(error)
  }
}
</script>

<template>
  <div class="workout-stats-wrapper">
    <h3>Podaci o tvom treningu</h3>
    <div class="exercises-list-wrapper">
      <div class="list-title">
        <span>VEŽBA</span>
        <span class="align-right">KORIŠĆENA TEŽINA</span>
      </div>
      <div v-for="exe in exercisesData" :key="exe.id">
        <ExerciseInWorkoutStats
          :exe-id="exe.id"
          :exe-name="exe.name"
          :weight="exe.weight"
        ></ExerciseInWorkoutStats>
      </div>
      <ExerciseInWorkoutStats
        v-if="props.challenge"
        :exe-id="challenge.id"
        :exe-name="challenge.name"
        :weight="false"
        :is-challenge="true"
      ></ExerciseInWorkoutStats>
    </div>
    <button class="end-of-workout-button" @click="handleWorkoutEnd">
      UNESI PODATKE O TRENINGU
    </button>
  </div>
</template>

<style scoped>
.workout-stats-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: space-around;
}

.exercises-list-wrapper {
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}

.list-title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--gray-700);
}

.align-right {
  text-align: end;
}

.end-of-workout-button {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
}

.end-of-workout-button:disabled {
  background-color: #0b5ad080;
}
</style>
