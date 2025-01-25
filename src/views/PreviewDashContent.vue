<script setup lang="ts">
import BlogContent from '@/components/dash/BlogContent.vue'
import ExercisesContent from '@/components/dash/ExercisesContent.vue'
import HellowContent from '@/components/dash/HellowContent.vue'
import StatsContent from '@/components/dash/StatsContent.vue'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import { onBeforeMount } from 'vue'
import Stats from '@/api/stats'
import Post from '@/api/post'
import Exercises from '@/api/exercises'
import { ref } from 'vue'
import { reactive } from 'vue'
import { computed } from 'vue'
import { useAlertBoxStore } from '@/stores/alertBox'
import ErrorContainer from '@/components/error/ErrorContainer.vue'
import AdminDashContentLayout from '@/components/layout/AdminDashContentLayout.vue'

const isLodaing = ref(false)
const isError = ref(false)
const responseData = reactive({ stats: null, post: null, exercise: null })

const { addError } = useAlertBoxStore()

const post = computed(() => responseData.post)
const exercise = computed(() => responseData.exercise)
const stats = computed(() => responseData.stats)

onBeforeMount(async () => {
  try {
    isLodaing.value = true
    isError.value = false
    const [responseStats, responsePosts, responseExercises] = await Promise.all([
      Stats.getStats(),
      Post.getPosts({ limit: 1, orderBy: 'desc' }),
      Exercises.getExercises({ limit: 1, orderBy: 'desc' }),
    ])

    responseData.stats = responseStats.data.data
    responseData.post = responsePosts.data.data.posts[0]
    responseData.exercise = responseExercises.data.data.exercises[0]
  } catch (_) {
    isError.value = true
    addError()
  } finally {
    isLodaing.value = false
  }
})

// stats,
</script>

<template>
  <AdminDashContentLayout class="home-dash-content">
    <div class="dash-content-wrapper">
      <template v-if="isLodaing">
        <SpinnerContainer class="spinner-custom" />
      </template>
      <ErrorContainer v-else-if="isError" />
      <div class="dash-content-container" v-else>
        <StatsContent :stats />
        <HellowContent :plans="stats.num_of_active_plans" :users="stats.num_of_register_users" />
        <BlogContent :post />
        <ExercisesContent :exercise />
      </div>
    </div>
  </AdminDashContentLayout>
</template>

<style scoped>
.home-dash-content {
  background-color: transparent;
}
.dash-content-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .spinner-custom {
    position: absolute;
  }
  .dash-content-container {
    display: grid;
    width: 100%;
    height: 100%;
    gap: 30px 40px;
    grid-template-columns: 3fr 2fr;
    > * {
      background-color: var(--gray);
      border-radius: 20px;
    }
  }
}
</style>
