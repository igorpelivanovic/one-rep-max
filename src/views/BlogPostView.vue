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
    <p class="blog-type">{{ post.category_title }}</p>
    <h1 class="blog-title">{{ post.title }}</h1>
    <img :src="post.image" class="blog-image" />
    <!-- <p v-if="post.content">{{ post.content }}</p>
    <p v-else>Loading post...</p> -->
    <p class="blog-text">{{ post.text }}</p>
  </div>
</template>

<style scoped>
.blog-post {
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.blog-title {
  width: 50%;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 15px;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}
.post-title {
  text-align: center;
}

.blog-image {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 2rem;
  max-width: 80%;
}

.blog-text {
  padding: 20px;
}
</style>
