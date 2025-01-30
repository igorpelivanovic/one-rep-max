<script setup>
import PlanParamsForm from './plan_params/PlanParamsForm.vue'
import OrmParamsForm from './orm_params/OrmParamsForm.vue'
import { ref } from 'vue'
import { usePlanStore } from '@/stores/personal_plan'

const emit = defineEmits(['planCreated'])

const planStore = usePlanStore()

const userPlanData = ref(null)
const userOrmData = ref(null)

async function submit(event) {
  try {
    event.target.disabled = true
    let userPlanDataChanged = false
    if (userPlanData.value) {
      let missingData = []
      for (let property of Object.keys(userPlanData.value)) {
        if (userPlanData.value[property] === null) {
          missingData.push(property)
        }
      }
      if (missingData.length > 0) {
        throw { message: 'missing form data', missingData }
      }
      for (let property of Object.keys(userPlanData.value)) {
        if (userPlanData.value[property] != planStore.userPlanData[property]) {
          userPlanDataChanged = true
          break
        }
      }
      if (userPlanDataChanged) {
        const { fitnessLvl, weeklyWkoNum, goal, wkoType, isInGym } = userPlanData.value
        await planStore.changeUserPlanParams(fitnessLvl, weeklyWkoNum, goal, wkoType, isInGym)
      }
    }
    let userOrmDataChanged = false
    if (userOrmData.value) {
      for (let property of Object.keys(userOrmData.value)) {
        if (userOrmData.value[property] === 0) {
          userOrmData.value = null
          break
        }
      }
      if (userOrmData.value != null) {
        for (let property of Object.keys(userOrmData.value)) {
          if (userOrmData.value[property] != planStore.userOrmData[property]) {
            userOrmDataChanged = true
            break
          }
        }
        if (userOrmDataChanged) {
          const { bench, squat, barbellrow } = userOrmData.value
          await planStore.setUserOrmParams(bench, squat, barbellrow)
        }
      }
    }
    await planStore.createPlan(new Date().toISOString().slice(0, 19).replace('T', ' '))
    await planStore.getPlanData()
    event.target.disabled = false
    emit('planCreated')
  } catch (error) {
    if (error.message === 'missing form data') {
      console.log(error.missingData)
      event.target.disabled = false
    }
    event.target.disabled = false
  }
}
</script>

<template>
  <div class="plan-form-container">
    <h2>Kreiraj svoj plan treninga!</h2>
    <div class="plan-forms-wrapper">
      <PlanParamsForm @user-plan-data-change="(value) => (userPlanData = value)"></PlanParamsForm>
      <OrmParamsForm @user-orm-change="(value) => (userOrmData = value)"></OrmParamsForm>
    </div>
    <div class="submit-button">
      <button @click="submit">KREIRAJ PLAN</button>
    </div>
  </div>
</template>

<style scoped>
.plan-form-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plan-forms-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

h2 {
  margin-bottom: 2rem;
}

.submit-button {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .plan-form-container {
    max-width: 85%;
  }
}

@media screen and (min-width: 1025px) {
  .plan-form-container {
    align-items: baseline;
  }

  .plan-forms-wrapper {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  }

  .submit-button {
    justify-content: flex-end;
  }
}
</style>
