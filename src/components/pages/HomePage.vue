<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import BlogCard from '../cards/BlogCard.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    BlogCard,
  },
  setup() {
    const posts = ref([])
    const limit = ref(5)
    const offset = ref(0)

    const recentPosts = computed(() => posts.value.slice(0, limit.value))

    onMounted(() => {
      fetchPosts()
    })

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://482n123.e2.mars-hosting.com/posts?limit=${limit.value}&offset=${offset.value}`,
        )
        posts.value = response.data.data.posts
        console.log(response.data.data.posts)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    }

    return {
      posts,
      limit,
      offset,
      recentPosts,
    }
  },
})
</script>

<template>
  <section class="hero">
    <RouterLink v-if="recentPosts.length > 0" :to="'/blog/' + recentPosts[0].id">
      <div class="hero-image-container">
        <img
          v-if="recentPosts.length > 0"
          :src="recentPosts[0].image"
          class="hero-image"
          alt="Hero Image"
        />
      </div>
      <div class="hero-content">
        <p class="hero-description">{{ recentPosts[0].category_name }}</p>
        <h1 class="hero-title">{{ recentPosts[0].title }}</h1>
      </div>
    </RouterLink>
  </section>

  <section class="blog-cards">
    <h2 class="section-title">DNEVNIK</h2>
    <p class="section-subtitle">Budite u toku</p>
    <div class="blog-cards-container">
      <BlogCard v-for="(post, index) in recentPosts.slice(1)" :key="post.pst_id" :post="post" />
    </div>
  </section>

  <section class="blog">
    <div class="blog-image-container">
      <img src="@/assets/blog.jpg" />
    </div>
    <div class="blog-text-container">
      <h2 class="blog-headline">DOBRODOŠLI NA BLOG</h2>
      <p class="blog-text">
        Svaki dan je nova prilika da naučimo nešto novo i postanemo bolja verzija sebe. Na ovom
        blogu ćemo deliti inspiraciju, savete i priče koje će vas motivisati da preuzmete kontrolu
        nad svojim životom.
      </p>
      <RouterLink to="/blog" class="blog-button">POGLEDAJ BLOGOVE</RouterLink>
    </div>
  </section>

  <section class="promo">
    <div class="text-container">
      <h2 class="text">Pridruži nam se i stekni pristup personalizovanim trening planovima</h2>
      <RouterLink :to="{ name: 'register' }" class="register-button">REGISTRUJ SE</RouterLink>
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
  line-height: 1;
}

.hero-title {
  font-family: EtruscoNowCondensed;
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 30px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
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
  line-height: 1;
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

.blog {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 50px 30px; /* Adjust padding for balanced spacing */
  background: linear-gradient(136.83deg, #033479 17%, #212023 100%);
}

.blog-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blog-image-container img {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: cover;
}

.blog-text-container {
  flex: 1;
  padding-left: 30px;
  text-align: center;
}

.blog-headline {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
}

.blog-button {
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
  margin-top: 20px;
}

.blog-button:hover {
  background-color: #0745a1;
}
.blog-text {
  color: #ffffff;
}

@media (max-width: 768px) {
  .blog {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .blog-text-container {
    padding-left: 0;
    padding-bottom: 30px;
  }

  .blog-headline {
    font-size: 1.5rem;
  }

  .blog-image-container img {
    width: 80%; /* Resize image for smaller screens */
    margin-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
