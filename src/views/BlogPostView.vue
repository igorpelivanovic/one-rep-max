<script>
export default {
  name: 'BlogPostView',
  props: {
    // id: {
    //   // type: String,
    //   required: true,
    // },
  },
  data() {
    return {
      post: null,
      loading: true,
    }
  },
  mounted() {
    // this.fetchPost()
  },
  methods: {
    async fetchPost() {
      try {
        const response = await fetch(`http://482n123.e2.mars-hosting.com/posts/${this.id}`)
        if (response.ok) {
          this.post = await response.json()
        } else {
          throw new Error('Post not found')
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        this.post = { title: 'Error', content: 'Could not fetch post data.' }
      }
    },
  },
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
