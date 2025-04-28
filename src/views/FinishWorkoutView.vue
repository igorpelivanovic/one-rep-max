<script setup>
import { ref } from 'vue'
import ChallengeExercise from '@/components/personal_plan/workout/ChallengeExercise.vue'
import EndOfWorkoutStats from '@/components/personal_plan/workout/EndOfWorkoutStats.vue'

const question = ref(true)
const challenge = ref(false)
let challengeDone = false
const challengeData = ref(null)
const stats = ref(false)

function showQuestion() {
  challenge.value = false
  challengeDone = false
  stats.value = false
  question.value = true
}

function showChallenge(event) {
  event.target.disabled = true
  question.value = false
  challenge.value = true
}

function handleChallengeDone(data) {
  challengeDone = true
  challengeData.value = data
  challenge.value = false
  stats.value = true
}

function showStats() {
  question.value = false
  stats.value = true
}
</script>

<template>
  <div class="finish-workout-container">
    <button class="back-button" @click="showQuestion" v-if="!question">
      <i class="fa-solid fa-arrow-left-long"></i>
    </button>
    <div class="finish-workout-content-wrapper">
      <div v-if="question" class="question-wrapper">
        <h1>Bravo za uspešno završen trening!</h1>
        <p>Da li želiš da odradiš izazov?</p>
        <div class="question-buttons-wrapper">
          <button class="question-button" @click="showChallenge">DA</button>
          <button class="question-button" @click="showStats">NE</button>
        </div>
      </div>
      <ChallengeExercise v-if="challenge" @challenge-done="handleChallengeDone"></ChallengeExercise>
      <EndOfWorkoutStats
        v-if="stats"
        :challenge="challengeDone ? challengeData : null"
      ></EndOfWorkoutStats>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.finish-workout-container {
  position: relative;
  display: flex;
  flex-direction: column;
}

.back-button {
  display: inline-block;
  position: absolute;
  padding: 1rem;
  border: none;
  background: none;
  font-size: 1.2rem;
  color: #000;
}

.finish-workout-content-wrapper {
  margin-top: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.question-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.question-buttons-wrapper {
  display: flex;
  gap: 3rem;
}

.question-wrapper > p {
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
}

.question-button {
  background-color: var(--blue);
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
}
</style>
