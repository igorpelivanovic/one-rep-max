<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import api from '@/api/post'
import BlogCardBlogPage from '@/components/cards/BlogCardBlogPage.vue'
defineProps(['limit'])
const posts = ref([])
const loading = ref(false)
const error = ref(null)
const offset = ref(0)
const itemCount = ref(0)
const canLoadMore = computed(() => itemCount.value !== 0 && offset.value !== itemCount.value)
const categories = ref([
  { pct_id: 1, pct_name: 'Trening' },
  { pct_id: 2, pct_name: 'Ishrana' },
  { pct_id: 3, pct_name: 'Lifestyle' },
])

const selected_category = ref(null)

async function fetchPosts() {
  try {
    const res = await api.getPosts({ offset: offset.value })
    posts.value = posts.value.concat(res.data.data.posts)
    offset.value = posts.value.length
    itemCount.value = res.data.data.count
  } catch (error) {
    console.log(error)
  }
}

function callApi() {
  if (selected_category.value) {
    fetchByCategory()
  } else {
    fetchPosts()
  }
}

watch(selected_category, () => {
  posts.value = []
  offset.value = 0
  itemCount.value = 0
  callApi()
})

async function fetchByCategory() {
  try {
    const res = await api.getPostsByCategory(selected_category.value.pct_name, {
      offset: offset.value,
    })
    posts.value = posts.value.concat(res.data.data.posts)
    offset.value = posts.value.length
    itemCount.value = res.data.data.count
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="blog-view">
    <h2>BLOGOVI</h2>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="loading" class="loading">Loading...</div>
    <div class="category-list">
      <div
        class="category-item"
        :class="{ active: selected_category === null }"
        @click="selected_category = null"
      >
        Prikaži sve
      </div>
      <div
        class="category-item"
        :class="{ active: selected_category === category }"
        @click="selected_category = category"
        v-for="category in categories"
        :key="category.pct_id"
      >
        {{ category.pct_name }}
      </div>
    </div>
    <div class="blog-list">
      <BlogCardBlogPage v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <div v-if="canLoadMore" class="load-more">
      <button @click="callApi">LOAD MORE</button>
    </div>
  </div>
</template>

<style scoped>
.blog-view {
  padding: 20px;
  background-color: #f9f9f9;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.error {
  color: red;
  font-weight: bold;
}

.loading {
  font-size: 1.2rem;
  color: #666;
}

.load-more {
  margin-top: 20px;
  text-align: center;
}

.load-more button {
  padding: 10px 20px;
  font-size: 1rem;
  font-family: DexaPro;
  font-weight: 700;
  background-color: #0b5ad0;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.load-more button:hover {
  background-color: #212023;
}

.category-list {
  display: flex;
  gap: 10px;
}

.category-item {
  cursor: pointer;
}
.active {
  color: #033479;
}
</style>
