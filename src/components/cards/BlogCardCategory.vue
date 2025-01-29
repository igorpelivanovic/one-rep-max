<script>
export default {
  name: 'BlogCardCategory',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
}
</script>

<template>
  <div class="blog-card-category">
    <img :src="post.image" alt="Blog Image" class="blog-card-category-img" />
    <div class="blog-card-category-content">
      <h3 class="blog-card-category-title">{{ post.title }}</h3>
      <p class="blog-card-category-excerpt">{{ post.excerpt }}</p>
      <router-link :to="'/post/' + post.id" class="read-more">Read More</router-link>
    </div>
  </div>
</template>

<style scoped>
.blog-card-category {
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 380px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s ease;
}

.blog-card-category:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.blog-card-category-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 2px solid #ddd;
}

.blog-card-category-content {
  padding: 15px;
  color: #333;
}

.blog-card-category-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.blog-card-category-excerpt {
  font-size: 1rem;
  margin-bottom: 15px;
  color: #777;
}

.read-more {
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
