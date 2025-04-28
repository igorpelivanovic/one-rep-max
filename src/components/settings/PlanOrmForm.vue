<script setup>
import PlanParamsForm from '../personal_plan/form/plan_params/PlanParamsForm.vue'
import OrmParamsForm from '../personal_plan/form/orm_params/OrmParamsForm.vue'
import { ref, useTemplateRef } from 'vue'
import { usePlanStore } from '@/stores/planStore'
import PopUpLayout from '../popup/PopUpLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const planStore = usePlanStore()

const userPlanData = ref(null)
const userOrmData = ref(null)
const inputErrors = ref([])

const trySubmit = ref(false)
const submitButtonDOM = useTemplateRef('submit-button')

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
        if (!trySubmit.value) {
          await planStore.getPlanData()
          if (planStore.planData) {
            trySubmit.value = true
            return
          }
        }
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
          if (!trySubmit.value) {
            await planStore.getPlanData()
            if (planStore.planData) {
              trySubmit.value = true
              return
            }
          }
          const { bench, squat, barbellrow } = userOrmData.value
          await planStore.setUserOrmParams(bench, squat, barbellrow)
        }
      }
    }
    await planStore.createPlan(new Date().toISOString().slice(0, 19).replace('T', ' '))
    router.push({ name: 'main-dash' })
  } catch (error) {
    if (error.message === 'missing form data') {
      inputErrors.value = error.missingData
      event.target.disabled = false
    }
    console.log(error)
    event.target.disabled = false
  }
}

async function continueSubmit(event) {
  try {
    event.target.disabled = true
    await planStore.deactivatePlan(planStore.planData.id)
    submit(event)
  } catch (error) {
    console.log(error)
  }
}

function abortSubmit() {
  trySubmit.value = false
  submitButtonDOM.value.disabled = false
}
</script>

<template>
  <div class="plan-form-container">
    <h2>Kreiraj svoj plan treninga!</h2>
    <div class="plan-forms-wrapper">
      <PlanParamsForm
        @user-plan-data-change="(value) => (userPlanData = value)"
        :errors="inputErrors"
      ></PlanParamsForm>
      <OrmParamsForm @user-orm-change="(value) => (userOrmData = value)"></OrmParamsForm>
    </div>
    <div class="submit-button">
      <button ref="submit-button" @click="submit">IZMENI PODATKE</button>
    </div>
  </div>
  <PopUpLayout
    v-if="trySubmit"
    :enable-close="true"
    :click-out-side-close="false"
    @close="abortSubmit"
  >
    <div class="warning-wrapper">
      <p>
        Ukoliko trenutno imaš aktivan plan vežbanja, izmena tvojih podataka ili OneRepMax vrednosti
        automatski će deaktivirati tvoj plan i kreirati novi. Potvrdi da želiš da izmeniš podatke
        klikom na dugme ispod.
      </p>
      <button @click="continueSubmit">IZMENI PODATKE</button>
    </div>
  </PopUpLayout>
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

.warning-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  gap: 2rem;
}

@media screen and (min-width: 1281px) {
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
