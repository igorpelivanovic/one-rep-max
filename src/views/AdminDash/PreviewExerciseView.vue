<script setup>
import exercises from '@/api/exercises'
import AdminDashContentLayout from '@/components/layout/AdminDashContentLayout.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import DeletePostModalContent from '@/components/modal/DeletePostModalContent.vue'
import ModalLayout from '@/components/modal/ModalLayout.vue'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import ExercisePreview from '@/preview/ExercisePreview.vue'
import { useAlertBoxStore } from '@/stores/alertBox'
import { useLoadingViewStore } from '@/stores/loadingView'
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const renderModal = ref(false)
const exerciseData = ref(null)
const loadingRef = useLoadingViewStore()
const { addSuccess, addError } = useAlertBoxStore()

onBeforeMount(() => {
  getExercise()
})

const getExercise = async () => {
  try {
    loadingRef.isLoading = true
    const response = await exercises.getById(route.params.id)
    exerciseData.value = response.data.data
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
    router.replace({ name: 'dash-exercises' })
    return true
  } catch (e) {
    addError({ content: e.response.data.message })
  } finally {
    loadingRef.isLoading = false
  }
}
</script>

<template>
  <ModalLayout v-if="renderModal">
    <DeletePostModalContent
      @denide="renderModal = false"
      @accept="deleteExercise"
    ></DeletePostModalContent>
  </ModalLayout>
  <AdminDashContentLayout>
    <PageLayout v-if="exerciseData">
      <template #header>
        <div class="header-container">
          <h1 class="page-main-title">{{ exerciseData.title }}</h1>
          <div class="btns-container">
            <RouterLink
              :to="{ name: 'editExercise', params: { id: exerciseData.id } }"
              class="nav-link"
            >
              <span class="icon">
                <i class="fas fa-pen"></i>
              </span>
              <span class="title">izmeni</span>
            </RouterLink>
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
        <ExercisePreview :data="exerciseData" />
      </template>
    </PageLayout>
    <SpinnerContainer v-if="loadingRef.isLoading" />
  </AdminDashContentLayout>
</template>

<style scoped>
.page-main-title {
  text-transform: lowercase;
  &::first-letter {
    text-transform: capitalize;
  }
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .btns-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    gap: 10px;
    background-color: var(--white);
    padding: 20px 60px;
    justify-content: center;
    border-top: 1px solid var(--gray);
    .nav-link {
      text-decoration: none;
    }
    .nav-link,
    button {
      cursor: pointer;
      background-color: var(--blue-500);
      color: var(--gray);
      border: none;
      font-size: 1.2rem;
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
      .nav-link,
      button {
        span.title {
          display: block;
        }
      }
    }
  }
}
@media screen and (min-width: 769px) {
  .header-container {
    .btns-container {
      position: initial;
      background-color: transparent;
      padding: 0;
      width: initial;
      border: none;
      .nav-link,
      button {
        span.title {
          display: none;
        }
      }
    }
  }
}
@media screen and (min-width: 1025px) {
  .header-container {
    .btns-container {
      .nav-link,
      button {
        font-size: 0.9rem;

        span.title {
          display: block;
        }
      }
    }
  }
}
</style>
