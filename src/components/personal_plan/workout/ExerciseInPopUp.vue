<script setup>
import { ref } from 'vue'

const props = defineProps({
  exercise: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['selected'])

const exercisesDesc = ref(props.exercise.descr.split('\\n'))

const showDesc = ref(false)
const showDescButton = ref(true)
function toggleDesc(e) {
  e.target.disabled = true
  showDesc.value = !showDesc.value
}

const selected = ref(false)
function toggleSelected(e) {
  const alreadySelectedDOM = document.getElementsByClassName('selected')
  for (let el of alreadySelectedDOM) {
    if (e.target != el.children[0].children[1]) {
      el.children[0].children[1].click()
    }
    el.classList.remove('selected')
  }
  selected.value = !selected.value
  if (selected.value) {
    emit('selected', props.exercise.id)
  } else {
    emit('selected', null)
  }
}
</script>

<template>
  <div class="swap-exercise-wrapper" :class="{ selected: selected }">
    <div class="swap-exercise-title-wrapper">
      <div>
        <span>{{ props.exercise.name }}</span>
        <span><i v-if="props.exercise.weight" class="fa-solid fa-dumbbell"></i></span>
        <button class="arrow-button" @click="toggleDesc" v-if="showDescButton">
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <button class="arrow-button" @click="toggleDesc" v-else>
          <i class="fa-solid fa-chevron-up"></i>
        </button>
      </div>
      <div class="select-buttons-wrapper" @click="toggleSelected">
        <button v-if="!selected" class="select-swap-exercise-button">
          <i class="fa-solid fa-check"></i>
        </button>
        <button v-else class="select-swap-exercise-button">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    <Transition
      name="slide-fade"
      @after-enter="showDescButton = !showDescButton"
      @after-leave="showDescButton = !showDescButton"
    >
      <div v-if="showDesc" class="exercise-desc-wrapper">
        <p v-for="(row, ind) in exercisesDesc" :key="ind">{{ row }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.swap-exercise-wrapper {
  border-radius: 1rem;
  padding: 0.5rem;
}

.selected {
  background-color: var(--blue);
}

.selected * {
  color: var(--white);
}

.swap-exercise-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.swap-exercise-title-wrapper > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
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

.arrow-button,
.select-swap-exercise-button {
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

.select-buttons-wrapper {
  cursor: pointer;
}

.select-buttons-wrapper > * {
  pointer-events: none;
}
</style>
