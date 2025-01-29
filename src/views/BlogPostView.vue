<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/post'

const route = useRoute()
const blogId = computed(() => route.params.id)
const post = ref({})

onMounted(() => fetchPosts())

async function fetchPosts() {
  try {
    const res = await api.getById(blogId.value)
    post.value = res.data.data
  } catch {
    console.log('error')
  }
}
</script>

<template>
  <div class="">{{ post }}</div>
</template>
