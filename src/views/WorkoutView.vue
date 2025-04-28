<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlanStore } from '@/stores/planStore'
import ExerciseInWorkout from '@/components/personal_plan/workout/ExerciseInWorkout.vue'
import PopUpLayout from '@/components/popup/PopUpLayout.vue'
import ExerciseInPopUp from '@/components/personal_plan/workout/ExerciseInPopUp.vue'
import {
  setExercises,
  nextExercise,
  currExerciseId,
  removeExercises,
  removeUsedWeights,
} from '@/utils/exeInWkoToken'

const route = useRoute()
const router = useRouter()
const planStore = usePlanStore()
const workoutData = ref({})
const exercisesDesc = ref([])
const swapExercises = ref([])
const showPopup = ref(false)
const oldExeId = ref(null)
const newExeId = ref(null)

async function getWorkoutData(id) {
  try {
    const res = await planStore.getWorkout(id)
    workoutData.value = res.data.data
    workoutData.value.exercises.forEach((element) => {
      exercisesDesc.value.push(element.descr.split('\n'))
    })
  } catch (error) {
    console.log(error)
  }
}

function handleSwapRequest(data) {
  oldExeId.value = data[0]
  swapExercises.value = data[1]
  showPopup.value = !showPopup.value
}

async function handleSwap(event) {
  try {
    event.target.children[0].disabled = true
    if (!oldExeId.value || !newExeId.value) {
      event.target.children[0].disabled = false
      return
    }
    await planStore.swapExercise(oldExeId.value, newExeId.value, workoutData.value.id)
    await getWorkoutData(route.params.id)
    showPopup.value = false
  } catch (error) {
    event.target.children[0].disabled = false
    console.log(error)
  }
}

function startWorkout(event) {
  event.target.disabled = true
  let exercisesIds = []
  for (let exe of workoutData.value.exercises) {
    exercisesIds.push(exe.id)
  }
  removeExercises()
  removeUsedWeights()
  setExercises(exercisesIds)
  nextExercise()
  router.push({
    name: 'exercise',
    params: {
      workoutId: route.params.id,
      exerciseId: currExerciseId(),
    },
  })
}

onMounted(async () => getWorkoutData(route.params.id))
</script>

<template>
  <div :class="{ 'no-scroll': showPopup }" class="container">
    <h3>{{ workoutData.name }}</h3>
    <ExerciseInWorkout
      v-for="(exe, ind) in workoutData.exercises"
      :key="exe.id"
      :workout-id="workoutData.id"
      :exe-id="exe.id"
      :exe-name="exe.name"
      :exe-desc="exercisesDesc.length ? exercisesDesc[ind] : exe.descr"
      :exe-weight="exe.weight"
      @swap="handleSwapRequest"
    ></ExerciseInWorkout>
    <PopUpLayout v-if="showPopup" @close="showPopup = !showPopup">
      <div class="pop-up-content">
        <div class="pop-up-list">
          <ExerciseInPopUp
            v-for="exe in swapExercises"
            :key="exe.id"
            :exercise="exe"
            @selected="(id) => (newExeId = id)"
          ></ExerciseInPopUp>
        </div>
        <div class="swap-button-wrapper" @click="handleSwap">
          <button class="swap-button">IZMENI</button>
        </div>
      </div>
    </PopUpLayout>
    <button class="start-workout-button" @click="startWorkout">ZAPOCNI TRENING</button>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--white);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.container > h3 {
  align-self: center;
}

.pop-up-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}

.pop-up-list {
  align-self: baseline;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.no-scroll {
  height: 100vh;
  overflow: hidden;
}

.swap-button-wrapper {
  cursor: pointer;
}

.swap-button-wrapper > * {
  pointer-events: none;
}

.swap-button,
.start-workout-button {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 0.7rem;
  cursor: pointer;
}

.start-workout-button {
  margin-top: 1rem;
  width: fit-content;
  align-self: center;
}

.swap-button:disabled,
.start-workout-button:disabled {
  background-color: #0b5ad080;
}

@media screen and (min-width: 601px) {
  .start-workout-button {
    align-self: center;
  }
}
</style>
