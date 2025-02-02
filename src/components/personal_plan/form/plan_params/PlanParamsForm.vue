<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import PlanParamsFormInput from './PlanParamsFormInput.vue'
import { InputProps, InputData } from '../validation/propValidation'
import { usePlanStore } from '@/stores/planStore'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'

const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['userPlanDataChange'])

const planStore = usePlanStore()
let loading = ref(true)

const userPlanData = ref({})

function handleSelected(data) {
  if (!isNaN(data[1])) {
    if (data[0] === 'isInGym') {
      userPlanData.value[data[0]] = !!+data[1]
      return
    }
    userPlanData.value[data[0]] = +data[1]
    return
  }
  if (data[0] === 'goal' && data[1] === 'get-stronger') {
    userPlanData.value.isInGym = true
  }
  userPlanData.value[data[0]] = data[1]
}

watch(userPlanData.value, () => {
  if (loading.value) {
    loading.value = false
  }
  emit('userPlanDataChange', userPlanData.value)
})

onBeforeMount(async () => {
  try {
    const res = await planStore.getUserPlanParams()
    const userExistingData = res.data.data.planParams
    userPlanData.value.fitnessLvl = userExistingData.fitnessLevelId
    userPlanData.value.goal = userExistingData.goal
    userPlanData.value.isInGym = userExistingData.isInGym
    userPlanData.value.weeklyWkoNum = userExistingData.numOfWeeklyWorkouts
    userPlanData.value.wkoType = userExistingData.workoutType
    planStore.userPlanData = {
      fitnessLvl: userExistingData.fitnessLevelId,
      goal: userExistingData.goal,
      isInGym: userExistingData.isInGym,
      weeklyWkoNum: userExistingData.numOfWeeklyWorkouts,
      wkoType: userExistingData.workoutType,
    }
  } catch (error) {
    if (error.status === 404) {
      userPlanData.value = {
        fitnessLvl: null,
        weeklyWkoNum: null,
        goal: null,
        wkoType: null,
        isInGym: null,
      }
    }
  }
})
</script>

<template>
  <SpinnerContainer v-if="loading"></SpinnerContainer>
  <div v-else class="plan-params-form-wrapper">
    <h3>Unesi ili izmeni svoje podatke, i već danas započni svoj fintes put.</h3>
    <PlanParamsFormInput
      id="fitness-level-input"
      title="Koliko često treniraš?"
      :input-props="
        new InputProps('radio', 'fitnessLvl', [
          new InputData(0, 'nikad', userPlanData.fitnessLvl === 0),
          new InputData(1, 'povremeno', userPlanData.fitnessLvl === 1),
          new InputData(2, 'redovno', userPlanData.fitnessLvl === 2),
        ])
      "
      @selected="handleSelected"
      :error="props.errors.includes('fitnessLvl')"
    ></PlanParamsFormInput>
    <PlanParamsFormInput
      id="weekly-workouts-input"
      title="Koliko puta nedeljno želiš da treniraš?"
      :input-props="
        new InputProps('radio', 'weeklyWkoNum', [
          new InputData(3, 'tri', userPlanData.weeklyWkoNum === 3),
          new InputData(4, 'četiri', userPlanData.weeklyWkoNum === 4),
          new InputData(5, 'pet', userPlanData.weeklyWkoNum === 5),
        ])
      "
      @selected="handleSelected"
      :error="props.errors.includes('weeklyWkoNum')"
    ></PlanParamsFormInput>
    <PlanParamsFormInput
      id="goal-input"
      title="Unesi svoj cilj"
      :special-style="true"
      :input-props="
        new InputProps('radio', 'goal', [
          new InputData('lose-weight', 'mršavljenje', userPlanData.goal === 'lose-weight'),
          new InputData('gain-muscle', 'izgradnja mišića', userPlanData.goal === 'gain-muscle'),
          new InputData('get-stronger', 'jačanje mišića', userPlanData.goal === 'get-stronger'),
        ])
      "
      @selected="handleSelected"
      :error="props.errors.includes('goal')"
    ></PlanParamsFormInput>
    <PlanParamsFormInput
      id="workout-type-input"
      title="Unesi željeni tip treninga"
      :input-props="
        new InputProps('radio', 'wkoType', [
          new InputData('fullbody', 'za celo telo', userPlanData.wkoType === 'fullbody'),
          new InputData('split', 'split', userPlanData.wkoType === 'split'),
        ])
      "
      @selected="handleSelected"
      :error="props.errors.includes('wkoType')"
    ></PlanParamsFormInput>
    <PlanParamsFormInput
      id="is-in-gym-input"
      title="Da li ćeš trenirati u teretani ili kod kuće?"
      :disabled="userPlanData.goal === 'get-stronger'"
      :input-props="
        new InputProps('radio', 'isInGym', [
          new InputData(1, 'teretana', +userPlanData.isInGym === 1),
          new InputData(0, 'kod kuće', +userPlanData.isInGym === 0 && userPlanData.isInGym != null),
        ])
      "
      @selected="handleSelected"
      :error="props.errors.includes('isInGym')"
    ></PlanParamsFormInput>
    <p>(Za cilj "JAČANJE MIŠIĆA", automatski će biti izabrana opcija "TERETANA".)</p>
  </div>
</template>

<style scoped>
.plan-params-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
