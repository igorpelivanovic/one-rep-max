<script setup lang="ts">
import TableLayout from '@/components/layout/TableLayout.vue'
import Spinner from '@/components/spinner/Spinner.vue'
import PostPreview from '@/components/table/PostPreview.vue'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import Posts from '@/api/post'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import { computed } from 'vue'
import Post from '@/api/post'
import { useAlertBoxStore } from '@/stores/alertBox'
import ModalLayout from '@/components/modal/ModalLayout.vue'
import DeletePostModalContent from '@/components/modal/DeletePostModalContent.vue'
import AdminDashContentLayout from '@/components/layout/AdminDashContentLayout.vue'

const isLoading = ref(false)
const errMessage = ref(null)
const params = {}

const loadMoreRender = ref(true)
const disableLoadBtn = ref(false)

const { addSuccess, addError } = useAlertBoxStore()
const renderModal = ref(false)

const responseSuccess = computed(() => !isLoading.value && !errMessage.value)

const postsData = ref([])
const deleteId = ref(null)

onBeforeMount(async () => {
  isLoading.value = true
  await getPosts()
  isLoading.value = false
  return true
})

const getPosts = async () => {
  try {
    disableLoadBtn.value = true
    if (!loadMoreRender.value) return
    const response = await Posts.getPosts(params)
    const { posts, limit, offset, count } = response.data.data
    if (count <= posts.length + offset) {
      loadMoreRender.value = false
    }
    postsData.value = [...postsData.value, ...posts]
    Object.assign(params, { limit, offset: offset + limit })
    return true
  } catch (e) {
    console.log(e)
  } finally {
    disableLoadBtn.value = false
  }
}

const removePost = async () => {
  try {
    isLoading.value = true
    renderModal.value = false
    await Post.removeById(deleteId.value)
    addSuccess({ content: 'uspešno obrisan blog' })
    const index = postsData.value.findIndex((post) => post.id === deleteId.value)
    if (index < 0) return
    postsData.value.splice(index, 1)
    return true
  } catch (e) {
    addError({ content: e.response.data.message })
  } finally {
    deleteId.value = null
    isLoading.value = false
  }
}
</script>

<template>
  <AdminDashContentLayout>
    <ModalLayout v-if="renderModal">
      <DeletePostModalContent
        @denide="renderModal = false"
        @accept="removePost"
      ></DeletePostModalContent>
    </ModalLayout>
    <SpinnerContainer v-if="isLoading"></SpinnerContainer>
    <TableLayout v-if="responseSuccess">
      <template #header>
        <div class="table-header-content">
          <h1 class="table-title">postovi</h1>
          <div class="actions-container">
            <RouterLink :to="{ name: 'addPost' }" class="action-link">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              <span class="title">dodaj post</span>
            </RouterLink>
          </div>
        </div>
      </template>
      <template #body>
        <div class="table-body-content" v-if="postsData.length > 0">
          <ul class="post-list">
            <li v-for="post in postsData" :key="post.id">
              <PostPreview
                :post
                @remove="
                  () => {
                    deleteId = post.id
                    renderModal = true
                  }
                "
              />
            </li>
          </ul>
          <div class="action-container" v-if="loadMoreRender">
            <button type="button" :disabled="disableLoadBtn" @click="getPosts">
              učitaj još<Spinner v-if="disableLoadBtn" class="spinner-custom" />
            </button>
          </div>
          <div class="spinner-container"></div>
        </div>
        <div class="empty-list-container" v-else>
          <p>još uvek nema postova</p>
          <RouterLink :to="{ name: 'addPost' }" class="action-link">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
            <span class="title">dodaj post</span>
          </RouterLink>
        </div>
      </template>
    </TableLayout>
  </AdminDashContentLayout>
</template>

<style scoped>
.empty-list-container {
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  * {
    margin: 0;
  }
}
.table-header-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: end;
  padding: 8px 8px;
  .table-title {
    color: var(--blue-600);
    flex: 1;
    font-size: 1.8rem;
    text-transform: capitalize;
  }
  .actions-container {
    .action-link {
      display: flex;
      gap: 5px;
      text-transform: capitalize;
      background-color: var(--blue-500);
      color: var(--gray);
      align-items: center;
      padding-block: 6px;
      padding-inline: 8px;
      text-decoration: none;
      align-items: center;
      border-radius: 5px;
      font-size: 1.2rem;
      .title {
        display: none;
      }
    }
  }
}
.table-body-content {
  width: 100%;
  overflow: hidden;
  flex: 1 0px;
  overflow-y: auto;
  padding-inline-end: 10px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .spinner-container {
    text-align: center;
    font-size: 1.4rem;
  }
}
.action-container {
  padding-block: 20px;
  text-align: center;
  button {
    font-size: 1.1rem;
    text-transform: capitalize;
    cursor: pointer;
    background-color: var(--blue-500);
    color: var(--gray);
    border: none;
    padding: 10px 25px;
    border-radius: 10px;
    .spinner {
      margin-left: 10px;
      color: var(--gray);
    }
    &:disabled {
      background-color: var(--blue-300);
      cursor: auto;
    }
  }
}

@media screen and (min-width: 481px) {
  .table-header-container {
    .actions-container {
      .action-link {
        padding-block: 2px;
        font-size: 1.05rem;
        .title {
          display: block;
        }
      }
    }
    .table-body-content {
      flex: 1;
      overflow-y: auto;
      padding-block: 20px;
      padding-inline-end: 10px;
      ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }
}

@media screen and (min-width: 1025px) {
  .table-header-content {
    .actions-container {
      .action-link {
        padding-block: 4px;
        font-size: 1rem;
      }
    }
  }
}
</style>
