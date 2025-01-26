<script setup lang="ts">
import AdminDashContentLayout from '@/components/layout/AdminDashContentLayout.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import ExerciseForm from '@/components/exercisesForm/ExerciseFrom.vue'
import { ref } from 'vue'
import { useAlertBoxStore } from '@/stores/alertBox'
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import exercises from '@/api/exercises'
import { useLoadingViewStore } from '@/stores/loadingView'
import ModalLayout from '@/components/modal/ModalLayout.vue'
import DeletePostModalContent from '@/components/modal/DeletePostModalContent.vue'

const errorMsg = ref(undefined)
const isLoading = ref(false)
const exerciseData = ref(null)
const loadingRef = useLoadingViewStore()
const renderModal = ref(false)

const { addSuccess, addError } = useAlertBoxStore()
const route = useRoute()
const router = useRouter()
onBeforeMount(() => {
  getExerciseById()
})

const getExerciseById = async () => {
  try {
    loadingRef.isLoading = true
    const response = await exercises.getById(route.params.id)
    exerciseData.value = response.data.data
    return true
  } catch (e) {
    router.replace({ name: 'notfound' })
  } finally {
    loadingRef.isLoading = false
  }
}
const deleteExercise = async () => {
  try {
    loadingRef.isLoading = true
    renderModal.value = false
    await exercises.removeById(exerciseData.value.id)
    addSuccess({ content: 'uspešno obrisana vežba' })
    router.replace({ name: 'home' })
    return true
  } catch (e) {
    addError({ content: e.response.data.message })
  } finally {
    loadingRef.isLoading = false
  }
}
const onSubmit = async (data, resetForm) => {
  try {
    isLoading.value = true
    errorMsg.value = null
    console.log(data)
    await exercises.add(data)
    addSuccess({ content: 'uspešno izmenjen sadržaj vežbe' })
    //resetForm()
    return true
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || 'something wrong'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AdminDashContentLayout class="layout">
    <ModalLayout v-if="renderModal">
      <DeletePostModalContent
        @denide="renderModal = false"
        @accept="deleteExercise"
      ></DeletePostModalContent>
    </ModalLayout>
    <SpinnerContainer v-if="loadingRef.isLoading" />
    <PageLayout v-if="exerciseData">
      <template #header>
        <div class="header-container">
          <h1 class="page-main-title">izmeni vežbu</h1>
          <div class="btns-container">
            <button type="button" class="remove-btn" @click="renderModal = true">
              <span class="icon">
                <i class="fas fa-trash"></i>
              </span>
              <span class="title">obirši</span>
            </button>
          </div>
        </div>
      </template>
      <template #body>
        <SpinnerContainer v-if="isLoading" class="spinner-container body-disable-scroll" />
        <ExerciseForm :errorMsg @submit-form="onSubmit" />
      </template>
    </PageLayout>
  </AdminDashContentLayout>
</template>
