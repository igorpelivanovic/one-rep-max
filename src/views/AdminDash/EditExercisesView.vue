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
import { computed } from 'vue'

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

const formData = computed(() =>
  exerciseData.value ? (({ id, ...data }) => ({ ...data }))(exerciseData.value) : null,
)

const getExerciseById = async () => {
  try {
    loadingRef.isLoading = true
    const response = await exercises.getById(route.params.id)
    exerciseData.value = (({ videoUrl, primaryGroup, seconderyGroup, ...data }) => ({
      videoUrl: videoUrl ? videoUrl : '',
      primaryGroup: primaryGroup.mgr_id,
      seconderyGroups: seconderyGroup.map((group) => group.mgr_id),
      ...data,
    }))(response.data.data)
    return true
  } catch (_) {
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
    const formatData = (({ videoUrl, ...formdata }) => ({
      videoUrl: videoUrl ? videoUrl : null,
      ...formdata,
      id: exerciseData.value.id,
    }))(data)
    await exercises.update(formatData)
    addSuccess({ content: 'uspešno izmenjen sadržaj vežbe' })
    router.push({ name: 'preview-exercise', params: { id: exerciseData.value.id } })
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
        <ExerciseForm title-btn="izmeni" :data="formData" :errorMsg @submit-form="onSubmit" />
      </template>
    </PageLayout>
  </AdminDashContentLayout>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .btns-container {
    button {
      cursor: pointer;
      background-color: var(--blue-500);
      color: var(--gray);
      border: none;
      font-size: 1rem;
      border-radius: 5px;
      text-transform: capitalize;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 5px 15px;

      span {
        &.icon {
          display: flex;
          font-size: 0.9rem;
        }
        &.title {
          display: none;
        }
      }
      &:hover {
        background-color: var(--blue-700);
      }
    }
  }
}

@media screen and (min-width: 481px) {
  .header-container {
    .btns-container {
      button {
        span.title {
          display: block;
        }
      }
    }
  }
}
</style>
