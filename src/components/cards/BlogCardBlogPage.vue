<script setup>
defineProps(['post'])
</script>

<template>
  <router-link :to="'/blog/' + post.id">
    <div class="blog-card">
      <img :src="post.image" alt="Blog Image" class="blog-card-img" />
      <div class="blog-card-content">
        <p class="blog-type">{{ post.category_name }}</p>
        <h3 class="blog-card-title">{{ post.title }}</h3>
        <span class="read-more">Pročitaj više</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
.blog-card {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(136.83deg, #033479 17%, #212023 100%);
  padding: 15px;
  transition:
    transform 0.2s,
    box-shadow 0.3s ease;
  margin-bottom: 20px;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.blog-card-img {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 15px;
}

.blog-card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.blog-card-title {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: white;
}

.read-more {
  color: #f2f2f2;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
