<script>
import axios from 'axios'
import BlogCardCategory from '../cards/BlogCardCategory.vue'

export default {
  name: 'BlogView',
  props: {
    category: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      posts: [],
      isLoading: true,
      errorMessage: null,
    }
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        const categoryQuery = this.category ? `?category=${this.category}` : ''
        const limit = 10
        const offset = 0

        const response = await axios.get(
          `http://482n123.e2.mars-hosting.com/posts/category/${this.category}${categoryQuery}&limit=${limit}&offset=${offset}`,
        )

        this.posts = response.data.data.posts
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        this.errorMessage = 'Failed to load posts.'
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<template>
  <div class="blog-view">
    <h1>Blog</h1>
    <div v-if="isLoading">Loading posts...</div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!isLoading && !errorMessage">
      <div v-if="category" class="category-title">
        <h2>Posts in Category: {{ category }}</h2>
      </div>
      <div class="blog-cards-container">
        <BlogCardCategory v-for="post in posts" :key="post.pst_id" :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-view {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.category-title {
  margin-top: 20px;
  font-size: 1.5rem;
}

.blog-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
