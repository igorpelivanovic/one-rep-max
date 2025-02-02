<script setup>
import { ref } from 'vue'
import { usePlanStore } from '@/stores/planStore'

const props = defineProps({
  workoutId: {
    type: Number,
    required: true,
  },
  exeId: {
    type: Number,
    required: true,
  },
  exeName: {
    type: String,
    required: true,
  },
  exeDesc: {
    type: Array,
    required: true,
    default: () => {
      return []
    },
  },
  exeWeight: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['swap'])

const planStore = usePlanStore()

const showDesc = ref(false)
const showDescButton = ref(true)
function toggleDesc(e) {
  e.target.disabled = true
  showDesc.value = !showDesc.value
}

async function handleExrSwapRequest(event) {
  try {
    event.target.disabled = true
    const res = await planStore.swapExerciseRequest(props.exeId, props.workoutId)
    event.target.disabled = false
    emit('swap', [props.exeId, res.data.data.substituteExercises])
  } catch (error) {
    console.log(error)
    event.target.disabled = false
  }
}
</script>

<template>
  <div class="exercise-container">
    <div class="exercise-title-wrapper">
      <div>
        <h4>{{ props.exeName }}</h4>
        <i v-if="props.exeWeight" class="fa-solid fa-dumbbell"></i>
      </div>
      <button class="arrow-button" @click="toggleDesc" v-if="showDescButton">
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <button class="arrow-button" @click="toggleDesc" v-else>
        <i class="fa-solid fa-chevron-up"></i>
      </button>
    </div>
    <Transition
      name="slide-fade"
      @after-enter="showDescButton = !showDescButton"
      @after-leave="showDescButton = !showDescButton"
    >
      <div v-if="showDesc" class="exercise-desc-wrapper">
        <p v-for="(row, ind) in exeDesc" :key="ind">{{ row }}</p>
        <button class="swap-button" @click="handleExrSwapRequest">ZAMENI VEŽBU</button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.exercise-container {
  display: flex;
  flex-direction: column;
}

.exercise-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.exercise-title-wrapper > div {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.exercise-desc-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exercise-desc-wrapper > p {
  align-self: baseline;
  margin: 0.5rem 0;
}

.exercise-desc-wrapper > button {
  margin-top: 2rem;
}

.slide-fade-enter-active {
  transition: all 0.8s ease-in-out;
  overflow: hidden;
}

.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 100vh;
}

.swap-button {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 0.7rem;
  cursor: pointer;
}

.swap-button:disabled {
  background-color: #0b5ad080;
}

.arrow-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  color: #000;
}

.arrow-button:disabled,
.arrow-button[disabled] {
  color: #000;
}

.arrow-button > * {
  pointer-events: none;
}

@media screen and (min-width: 601px) {
  .exercise-container {
    align-items: center;
  }
}
</style>
