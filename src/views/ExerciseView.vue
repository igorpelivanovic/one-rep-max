<script setup>
import { usePlanStore } from '@/stores/planStore'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import MuscleGroupsExercise from '@/components/muscle_group_selector/MuscleGroupsExercise.vue'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import {
  currExerciseId,
  nextExercise,
  getExercises,
  addUsedWeightForExe,
  getUsedWeightByExeId,
} from '@/utils/exeInWkoToken'

const loading = ref(true)

const route = useRoute()
const router = useRouter()
const planStore = usePlanStore()
const lastExercise = ref(false)

const exerciseData = ref()
const usedWeight = ref('')
const usedWeightInputError = ref(false)

watch(usedWeight, () => {
  usedWeightInputError.value = false
})

async function getExeData(exeId, wkoId) {
  try {
    const res = await planStore.getExerciseInWorkout(exeId, wkoId)
    exerciseData.value = res.data.data.exerciseData
    checkIfLastExercise(exeId)
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

function checkIfLastExercise(exeId) {
  if (getExercises().indexOf(exeId) + exeId.length === getExercises().length) {
    lastExercise.value = true
  } else {
    lastExercise.value = false
  }
}

onMounted(async () => {
  await getExeData(route.params.exerciseId, route.params.workoutId)
  checkIfLastExercise(route.params.exerciseId)
  usedWeight.value = getUsedWeightByExeId(route.params.exerciseId)
})

function focusUsedWeightInput(event) {
  event.target.children[1].children[0].children[0].focus()
}

function setUsedWeight() {
  if (!usedWeight.value) {
    addUsedWeightForExe(route.params.exerciseId, exerciseData.value.recomendedWeight + '')
    return
  }
  const usedWeightCheck = +usedWeight.value
  if (usedWeightCheck > 3 * exerciseData.value.recomendedWeight && Number.isNaN(usedWeightCheck)) {
    throw 'invalid used weight'
  }
  addUsedWeightForExe(route.params.exerciseId, usedWeight.value)
}

function next(event) {
  try {
    event.target.disabled = true
    setUsedWeight()
    currExerciseId(route.params.exerciseId)
    nextExercise()
    loading.value = true
    usedWeight.value = ''
    usedWeightInputError.value = false
    router.push({
      name: 'exercise',
      params: {
        workoutId: route.params.workoutId,
        exerciseId: currExerciseId(),
      },
    })
  } catch (error) {
    if (error === 'invalid used weight') {
      usedWeightInputError.value = true
      event.target.disabled = false
    }
  }
}

function finishWorkout() {
  try {
    setUsedWeight()
    router.push({ name: 'workout-finish', params: { id: route.params.workoutId } })
  } catch (error) {
    if (error === 'invalid used weight') {
      usedWeightInputError.value = true
      event.target.disabled = false
    }
  }
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.exerciseId !== from.params.exerciseId) {
    await getExeData(to.params.exerciseId, to.params.workoutId)
    checkIfLastExercise(to.params.exerciseId)
    usedWeight.value = getUsedWeightByExeId(to.params.exerciseId)
      ? getUsedWeightByExeId(to.params.exerciseId)
      : ''
  }
})
</script>

<template>
  <div class="exercise-container">
    <SpinnerContainer v-if="loading"></SpinnerContainer>
    <div v-else class="exercise-data-wrapper">
      <div class="exercise-title">
        <h2>{{ exerciseData.name }}</h2>
        <i v-if="exerciseData.withWeights" class="fa-solid fa-dumbbell"></i>
      </div>
      <div class="exercise-params-wrapper">
        <span
          >{{ exerciseData.series }} serije x {{ exerciseData.reps }} ponavljanja{{
            exerciseData.unilateral ? ' po strani' : ''
          }}</span
        >
        <span v-if="exerciseData.recomendedWeight"
          >{{ exerciseData.multipleWeights ? 'Tegovi' : 'Teg' }}:
          {{ exerciseData.recomendedWeight }}kg</span
        >
      </div>
      <div v-if="exerciseData.video" class="video-example-wrapper">
        <iframe
          width="100%"
          height="100%"
          :src="exerciseData.video + '&mute=1'"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <div class="exercise-desc-wrapper">
        <span class="bold">Instrukcije</span>
        <p v-for="(row, ind) in exerciseData.desc.split('\n')" :key="ind">{{ row }}</p>
      </div>
      <div class="muscle-groups-wrapper">
        <MuscleGroupsExercise
          :active-muscle-groups="{
            primary: exerciseData.muscleGroups.primary,
            secondary: exerciseData.muscleGroups.secondary,
          }"
        ></MuscleGroupsExercise>
      </div>
      <div
        v-if="exerciseData.recomendedWeight"
        class="used-weight-wrapper"
        @click="focusUsedWeightInput"
      >
        <p>Ukoliko si koristio/la tegove različite težine od preporučene, unesi tu težinu.</p>
        <div>
          <div class="used-weight-input-wrapper" :class="{ 'input-error': usedWeightInputError }">
            <input type="text" v-model="usedWeight" />
          </div>
          <span v-if="usedWeightInputError">Unesite ispravnu vrednost za težinu</span>
        </div>
      </div>
      <button class="next-button" v-if="!lastExercise" @click="next">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
      <button class="next-button" v-else @click="finishWorkout">KRAJ</button>
    </div>
  </div>
</template>

<style scoped>
.exercise-container {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.exercise-data-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.exercise-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.exercise-title > i {
  font-size: 1.5rem;
}

.exercise-params-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--gray-600);
  border-radius: 1rem;
}

.exercise-params-wrapper > span {
  font-size: 1.5rem;
}

.video-example-wrapper {
  width: 100%;
  max-width: 560px;
  aspect-ratio: 16 / 9;
}

.exercise-desc-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.2rem;
  max-width: 620px;
}

.bold {
  font-weight: 700;
}

.exercise-desc-wrapper > span {
  align-self: center;
}

.muscle-groups-wrapper {
  max-width: 450px;
}

.used-weight-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.used-weight-wrapper > * {
  pointer-events: none;
}

.used-weight-wrapper > p {
  text-align: center;
}

.used-weight-wrapper > div > span {
  font-size: 0.8rem;
  color: var(--red);
}

.used-weight-input-wrapper {
  border: 1px solid var(--gray-700);
  border-radius: 1rem;
  cursor: text;
  padding: 0.5rem;
  width: fit-content;
}

.used-weight-input-wrapper > input {
  border: none;
  background: none;
}

.input-error {
  border: 2px solid var(--red);
}

.next-button {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  align-self: flex-end;
}

.next-button {
  margin-top: 1rem;
}

.next-button:disabled {
  background-color: #0b5ad080;
}

@media screen and(min-width: 360px) {
  .exercise-params-wrapper {
    align-items: center;
  }
}

@media screen and (min-width: 481px) {
  .exercise-data-wrapper {
    align-items: center;
  }

  .exercise-title {
    justify-content: center;
  }
}

@media screen and (min-width: 601px) {
  .exercise-data-wrapper {
    margin: 0 auto;
  }

  .exercise-params-wrapper {
    flex-direction: row;
  }
}
</style>
