<script setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import EditPostDataForm from '@/components/postForm/editPostDataForm.vue'
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import post from '@/api/post'
import { ref } from 'vue'
import { useLoadingViewStore } from '@/stores/loadingView'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import EditPostImageForm from '@/components/postForm/editPostImageForm.vue'
import { computed } from 'vue'
import ModalLayout from '@/components/modal/ModalLayout.vue'
import DeletePostModalContent from '@/components/modal/DeletePostModalContent.vue'
import { useAlertBoxStore } from '@/stores/alertBox'

const route = useRoute()
const router = useRouter()
const postData = ref(null)

const loadingRef = useLoadingViewStore()

const imageFormData = computed(() =>
  postData.value ? (({ id, image }) => ({ id, image }))(postData.value) : null,
)
const postFormData = computed(() =>
  postData.value
    ? (({ title, category_id, text, id }) => ({ title, category_id, text, id }))(postData.value)
    : null,
)

onBeforeMount(() => {
  getPostById()
})

const getPostById = async () => {
  try {
    loadingRef.isLoading = true
    const response = await post.getById(route.params.id)
    postData.value = response.data.data
  } catch (e) {
    console.log(e)
  } finally {
    loadingRef.isLoading = false
  }
}

const { addSuccess, addError } = useAlertBoxStore()
const renderModal = ref(false)

const deletePost = async () => {
  try {
    loadingRef.isLoading = true
    renderModal.value = false
    await post.removeById(postData.value.id)
    addSuccess({ content: 'uspešno obrisan blog' })
    router.replace({ name: 'home' })
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
      @accept="deletePost"
    ></DeletePostModalContent>
  </ModalLayout>
  <SpinnerContainer v-if="loadingRef.isLoading" />
  <PageLayout v-if="postData">
    <template #header>
      <div class="header-container">
        <h1 class="page-main-title">izmeni blog</h1>
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
      <div class="forms-wrapper">
        <EditPostDataForm :initial-form-data="postFormData" />
        <EditPostImageForm :initial-form-data="imageFormData" />
      </div>
    </template>
  </PageLayout>
</template>

<style scoped>
.forms-wrapper {
  display: flex;
  flex-direction: column;
  gap: 80px;
  * {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
}
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
@media screen and (min-width: 769px) {
  .forms-wrapper {
    flex-direction: row;
    gap: 50px;
  }
}
</style>
