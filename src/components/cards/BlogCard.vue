<script>
export default {
  name: 'BlogCard',
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
  <div class="blog-card">
    <img :src="post.image" alt="Blog Image" class="blog-card-img" />
    <div class="blog-card-content">
      <!-- <p class="blog-card-category">{{ post.category_name }}</p> -->
      <h3 class="blog-card-title">{{ post.title }}</h3>
      <router-link :to="'/post/' + post.id" class="read-more">Pročitaj više</router-link>
    </div>
  </div>
</template>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  border-radius: 25px;
  overflow: hidden;
  background: linear-gradient(136.83deg, #033479 17%, #212023 100%);
  transition:
    transform 0.2s,
    box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.blog-card-img {
  padding: 20px;
  width: 100%;
  height: 200px;
  border-radius: 25px;
  object-fit: cover;
}

.blog-card-content {
  flex-grow: 1;

  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.blog-card-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.blog-card-excerpt {
  font-size: 1rem;
  margin-bottom: 15px;
}

.read-more {
  display: inline-block;
  margin-top: auto;

  color: #f2f2f2;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
