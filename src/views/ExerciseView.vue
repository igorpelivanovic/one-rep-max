<script setup>
import { usePlanStore } from '@/stores/personal_plan'
import { useRoute, useRouter } from 'vue-router'
import { ref, onBeforeMount, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const planStore = usePlanStore()
const lastExercise = ref(false)

const exerciseData = ref({})

onBeforeMount(async () => {
  try {
    const res = await planStore.getExerciseInWorkout(
      route.params.exerciseId,
      route.params.workoutId,
    )
    exerciseData.value = res.data.data.exerciseData
  } catch (error) {
    console.log(error)
  }
})

onMounted(() => {
  if (
    localStorage.getItem('exercises').indexOf(route.params.exerciseId + '') +
      (route.params.exerciseId + '').length +
      1 ===
    localStorage.getItem('exercises').length
  ) {
    lastExercise.value = true
  }
})

function next() {
  const nextExeIdInd =
    localStorage.getItem('exercises').indexOf(route.params.exerciseId + '') +
    (route.params.exerciseId + '').length +
    1

  const nextExeId = localStorage
    .getItem('exercises')
    .slice(nextExeIdInd, localStorage.getItem('exercises').indexOf(',', nextExeIdInd))
  router.push({
    name: 'exercise',
    params: {
      workoutId: route.params.id,
      exerciseId: nextExeId,
    },
  })
}
</script>

<template>
  <div class="exercise-container">
    <div class="exercise-data-wrapper">
      <h2>{{ exerciseData.name }}</h2>
    </div>
    <button class="next-button" v-if="!lastExercise" @click="next">sledeca</button>
    <button class="next-button" v-else>zavrsi trening</button>
  </div>
</template>

<style scoped>
.exercise-container {
  background-color: white;
}

.next-button {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 0.7rem;
  cursor: pointer;
}

.next-button {
  margin-top: 1rem;
}

.next-button:disabled {
  background-color: #0b5ad080;
}
</style>
