<script setup lang="ts">
import AdminDashContentLayout from '@/components/layout/AdminDashContentLayout.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import ExerciseForm from '@/components/exercisesForm/ExerciseFrom.vue'
import { ref } from 'vue'
import exercises from '@/api/exercises'
import { useAlertBoxStore } from '@/stores/alertBox'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import { useRouter } from 'vue-router'

const errorMsg = ref(undefined)
const isLoading = ref(false)
const router = useRouter()

const { addSuccess } = useAlertBoxStore()

const onSubmit = async (data, resetForm) => {
  try {
    isLoading.value = true
    errorMsg.value = null
    const formatData = (({ videoUrl, ...formdata }) => ({
      videoUrl: videoUrl ? videoUrl : null,
      ...formdata,
    }))(data)
    const response = await exercises.add(formatData)
    addSuccess({ content: 'uspešno dodat post' })
    router.push({ name: 'preview-exercise', params: { id: response.data.data.id } })
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
    <PageLayout>
      <template #header>
        <h1 class="page-main-title">dodaj vežbu</h1>
      </template>
      <template #body>
        <SpinnerContainer v-if="isLoading" class="spinner-container body-disable-scroll" />
        <ExerciseForm :errorMsg @submit-form="onSubmit" />
      </template>
    </PageLayout>
  </AdminDashContentLayout>
</template>

<style scoped>
.layout {
  position: relative;
}
.spinner-container {
  position: absolute;
}
</style>
