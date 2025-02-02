<script setup>
import { ref, onBeforeMount } from 'vue'
import { usePlanStore } from '@/stores/planStore'

defineEmits(['challengeDone'])

const { getChallengeExercise } = usePlanStore()

const loading = ref(true)
const challengeData = ref(null)

async function getChallengeData() {
  try {
    const res = await getChallengeExercise()
    challengeData.value = res.data.data.challenge
  } catch (error) {
    console.log(error)
  }
}

onBeforeMount(async () => {
  await getChallengeData()
  console.log(challengeData)
  loading.value = false
})
</script>

<template>
  <div class="challenge-container">
    <SpinnerContainer v-if="loading"></SpinnerContainer>
    <div v-else class="challenge-data-wrapper">
      <div class="challenge-title">
        <h2>{{ challengeData.name }}</h2>
      </div>
      <div class="challenge-params-wrapper">
        <span
          >{{ challengeData.series }} serije x {{ challengeData.reps }} ponavljanja{{
            challengeData.unilateral ? ' po strani' : ''
          }}</span
        >
      </div>
      <div v-if="challengeData.video" class="video-example-wrapper">
        <iframe
          width="100%"
          height="100%"
          :src="challengeData.video + '&mute=1'"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <div class="challenge-desc-wrapper">
        <span>Instrukcije</span>
        <p v-for="(row, ind) in challengeData.desc.split('\n')" :key="ind">{{ row }}</p>
      </div>
      <button
        class="finish-challenge-button"
        @click="$emit('challengeDone', { id: challengeData.id, name: challengeData.name })"
      >
        ZAVRŠI TRENING
      </button>
    </div>
  </div>
</template>

<style scoped>
.challenge-container {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.challenge-data-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.challenge-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.challenge-title > i {
  font-size: 1.5rem;
}

.challenge-params-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--gray-600);
  border-radius: 1rem;
}

.challenge-params-wrapper > span {
  font-size: 1.5rem;
}

.video-example-wrapper {
  width: 100%;
  max-width: 560px;
  aspect-ratio: 16 / 9;
}

.challenge-desc-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.2rem;
  max-width: 620px;
}

.challenge-desc-wrapper > span {
  align-self: center;
}

.finish-challenge-button {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 1rem;
}

.finish-challenge-button:disabled {
  background-color: #0b5ad080;
}

@media screen and(min-width: 360px) {
  .challenge-params-wrapper {
    align-items: center;
  }
}

@media screen and (min-width: 481px) {
  .challenge-data-wrapper {
    align-items: center;
  }

  .challenge-title {
    justify-content: center;
  }
}

@media screen and (min-width: 601px) {
  .challenge-data-wrapper {
    margin: 0 auto;
  }

  .challenge-params-wrapper {
    flex-direction: row;
  }
}
</style>
