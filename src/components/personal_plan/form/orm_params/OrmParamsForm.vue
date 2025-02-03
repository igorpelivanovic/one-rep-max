<script setup>
import OrmParamInput from './OrmParamInput.vue'
import { usePlanStore } from '@/stores/planStore'
import { ref, watch, onBeforeMount } from 'vue'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'

const planStore = usePlanStore()

const emit = defineEmits(['userOrmChange'])

let loading = ref(true)
const deactivated = ref(false)
const benchIn = ref(null)
const squatIn = ref(null)
const barbellrowIn = ref(null)
const userOrmParams = ref({
  bench: null,
  squat: null,
  barbellrow: null,
})

function handleInput(data) {
  if (deactivated.value) {
    deactivated.value = false
  }
  if (data[1].weight && data[1].reps) {
    let oneRepMax = Math.round(data[1].weight / (1.0278 - 0.0278 * data[1].reps))
    switch (data[0]) {
      case 'bench':
        if (oneRepMax <= 0 || oneRepMax > 300) {
          oneRepMax = 20
        }
        userOrmParams.value.bench = oneRepMax
        benchIn.value = oneRepMax
        break
      case 'squat':
        if (oneRepMax <= 0 || oneRepMax > 250) {
          oneRepMax = 25
        }
        userOrmParams.value.squat = oneRepMax
        squatIn.value = oneRepMax
        break
      case 'barbellrow':
        if (oneRepMax <= 0 || oneRepMax > 150) {
          oneRepMax = 15
        }
        userOrmParams.value.barbellrow = oneRepMax
        barbellrowIn.value = oneRepMax
        break
      default:
        break
    }
  } else {
    switch (data[0]) {
      case 'bench':
        benchIn.value = 0
        break
      case 'squat':
        squatIn.value = 0
        break
      case 'barbellrow':
        barbellrowIn.value = 0
        break
    }
    userOrmParams.value[data[0]] = 0
  }
}

watch(userOrmParams.value, () => {
  if (loading.value) {
    loading.value = false
  }
  emit('userOrmChange', userOrmParams.value)
})

async function handleDeactivate(event) {
  try {
    event.target.disabled = true
    benchIn.value = 0
    squatIn.value = 0
    barbellrowIn.value = 0
    userOrmParams.value.bench = 0
    userOrmParams.value.squat = 0
    userOrmParams.value.barbellrow = 0
    deactivated.value = true
    await planStore.deactivateUserOrmParams()
    console.log(benchIn, squatIn, barbellrowIn)
    event.target.disabled = false
  } catch (error) {
    if (error.status === 404) {
      event.target.disabled = false
      return
    }
  }
}

onBeforeMount(async () => {
  try {
    const res = await planStore.getUserOrmParams()
    const { bench, squat, barbellrow } = res.data.data.ormParams
    benchIn.value = bench
    squatIn.value = squat
    barbellrowIn.value = barbellrow
    userOrmParams.value.bench = bench
    userOrmParams.value.squat = squat
    userOrmParams.value.barbellrow = barbellrow
    planStore.userOrmData = {
      bench,
      squat,
      barbellrow,
    }
  } catch (error) {
    console.log(error)
    if (error.status === 404) {
      planStore.userOrmData = {
        bench: 0,
        squat: 0,
        barbellrow: 0,
      }
      benchIn.value = 0
      squatIn.value = 0
      barbellrowIn.value = 0
      userOrmParams.value.bench = 0
      userOrmParams.value.squat = 0
      userOrmParams.value.barbellrow = 0
    }
  }
})
</script>

<template>
  <SpinnerContainer v-if="loading"></SpinnerContainer>
  <div v-else class="orm-params-form-wrapper">
    <h3>Tvoje OneRepMax vrednosti</h3>
    <p>
      Ako želiš da saznaš više o OneRepMax parametrima, kako se mere i koriste u izradi plana
      treninga, pogledaj
      <RouterLink :to="{ name: 'BlogPostView', params: { id: 51 } }">članak</RouterLink>.
    </p>
    <div class="orm-param-wrapper">
      <h4>Potisak na ravnoj klupi</h4>
      <OrmParamInput
        exercise="bench"
        :weight="benchIn"
        :deactivated="deactivated"
        @orm-param-data-change="handleInput"
      ></OrmParamInput>
    </div>
    <div class="orm-param-wrapper">
      <h4>Čučanj</h4>
      <OrmParamInput
        exercise="squat"
        :weight="squatIn"
        :deactivated="deactivated"
        @orm-param-data-change="handleInput"
      ></OrmParamInput>
    </div>
    <div class="orm-param-wrapper">
      <h4>Veslanje u pretklonu</h4>
      <OrmParamInput
        exercise="barbellrow"
        :weight="barbellrowIn"
        :deactivated="deactivated"
        @orm-param-data-change="handleInput"
      ></OrmParamInput>
    </div>
    <p>
      *** Nepotpuno uneti OneRepMax parametri neće se uzimati u obzir pri kreiranju plana, te ti
      savetujemo da, ukoliko želiš da ih koristiš u izradi svog plana, popuniš sva polja. Takođe,
      bitno je da uneseš lično tvoje, prethodno izmerene parametre, da bi tvoj plan vežbanja bio baš
      po tvojoj meri!
    </p>
    <div class="deactivate-orm-button">
      <button @click="handleDeactivate">NE ŽELIM DA KORISTIM OneRepMax</button>
    </div>
  </div>
</template>

<style scoped>
.orm-params-form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: var(--gray);
  border-radius: 2rem;
  padding: 1rem;
}

.orm-param-wrapper {
  width: 90%;
}

.orm-param-wrapper > h4 {
  margin-bottom: 0.5rem;
}

p {
  text-align: center;
}
</style>
