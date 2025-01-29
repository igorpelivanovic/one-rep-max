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
  <div class="blog-post">
    <p class="blog-type">{{ post.category_name }}</p>
    <h1>{{ post.title }}</h1>
    <img :src="post.image" class="blog-image" />
    <!-- <p v-if="post.content">{{ post.content }}</p>
    <p v-else>Loading post...</p> -->
  </div>
</template>

<style scoped>
.blog-post {
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 15px;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}
</style>
