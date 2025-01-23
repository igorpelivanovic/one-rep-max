<script>
import axios from 'axios'

import BlogCard from '../cards/BlogCard.vue'

export default {
  name: 'HomePage',
  components: {
    BlogCard,
  },
  data() {
    return {
      posts: [],
      limit: 4,
      offset: 0,
    }
  },
  computed: {
    recentPosts() {
      return this.posts.slice(0, this.limit)
    },
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          `http://482n123.e2.mars-hosting.com/posts?limit=${this.limit}&offset=${this.offset}`,
        )
        this.posts = response.data.data.posts
        console.log(response.data.data.posts)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    },
  },
}
</script>

<template>
  <section class="hero">
    <div class="hero-image-container">
      <img src="@/assets/hero.jpg" class="hero-image" />
    </div>
    <div class="hero-content">
      <h1 class="hero-title">POČNI DANAS</h1>
      <p class="hero-description">Sve što ti je potrebno da postaneš bolja verzija sebe</p>
    </div>
  </section>
  <section class="blog-cards">
    <h2 class="section-title">DNEVNIK</h2>
    <p class="section-subtitle">Budite u toku</p>
    <div class="blog-cards-container">
      <BlogCard v-for="post in posts" :key="post.pst_id" :post="post" />
    </div>
  </section>
  <section class="promo">
    <div class="text-container">
      <h2 class="text">Pridruži nam se i stekni pristup personalizovanim trening planovima</h2>
      <RouterLink to="/register" class="register-button">REGISTRUJ SE</RouterLink>
    </div>
    <div class="image-container">
      <img src="@/assets/kartica.png" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.hero-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  padding: 0 20px;
}

.hero-title {
  font-family: EtruscoNowCondensed;
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }
}

.blog-cards {
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
}

.blog-cards-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.section-title,
.section-subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
}

.section-title {
  margin-top: 20px;
}
.section-subtitle {
  margin-bottom: 20px;
}

@media (max-width: 1024px) {
  .blog-cards-container {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .blog-cards-container {
    justify-content: center;
    gap: 15px;
  }

  .blog-card {
    width: 100%;
    max-width: 300px;
  }
}

.promo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 50px;
  background-color: #ffffff;
}

.text-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 10px;
}

.register-button {
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  background-color: #0b5ad0;
  padding: 15px 25px;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
}

.register-button:hover {
  background-color: #0745a1;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.promo-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

@media (max-width: 768px) {
  .promo {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .text-container {
    margin-bottom: 20px;
    padding-right: 0;
    justify-content: center;
    align-items: center;
  }

  .text {
    font-size: 1.5rem;
  }

  .image-container {
    justify-content: center;
    align-items: center;
  }

  .promo-image {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
