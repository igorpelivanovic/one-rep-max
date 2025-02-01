<script setup>
import { useRouter } from 'vue-router'

const emit = defineEmits(['remove'])
const { post, customClass } = defineProps({
  post: {
    type: Object,
    required: true,
  },
  customClass: {
    type: [String, Object],
    default: '',
  },
})

const router = useRouter()
</script>

<template>
  <RouterLink
    :to="{
      name: 'BlogPostView',
      params: {
        id: post.id,
      },
    }"
  >
    <div class="post-container preview-content" :class="customClass">
      <div class="img-container">
        <div class="img-wrapper">
          <img :src="post.image" alt="" />
        </div>
      </div>
      <div class="contnet-container">
        <div class="info-container">
          <p class="category">{{ post.category_title }}</p>
          <h2>
            {{ post.title }}
          </h2>
        </div>
        <div class="action-btns-container">
          <button type="button" @click.prevent="emit('remove')">
            <span class="icon">
              <i class="fas fa-trash-can"></i>
            </span>
          </button>
          <button
            type="button"
            @click.prevent="() => router.push({ name: 'editPost', params: { id: post.id } })"
          >
            <span class="icon">
              <i class="fas fa-pencil"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--black);
}
.post-container {
  background-color: var(--white);
  display: flex;
  gap: 0;
  flex-direction: column;
  &:hover {
    h2 {
      color: var(--blue-700);
    }
    .img-container {
      .img-wrapper {
        img {
          transform: scale(1.1);
        }
      }
    }
    .contnet-container .action-btns-container button {
      color: var(--blue-500);
    }
  }
  .img-container {
    /*padding: 10px 0 10px 10px;*/
    padding: 10px;
    flex: 0 0 250px;
    aspect-ratio: 3/2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    .img-wrapper {
      overflow: hidden;
      border-radius: 5px;
      background-color: var(--gray);
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: 0.2s;
    }
  }
  .contnet-container {
    overflow: hidden;
    flex: 0 1 100%;
    padding: 10px 10px 5px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    .info-container {
      width: 100%;
      overflow: hidden;
      p {
        font-size: 0.95rem;
        margin: 0;
        text-transform: capitalize;
      }
      h2 {
        transition: 0.2s;
        width: 100%;
        margin-top: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &::first-letter {
          text-transform: capitalize;
        }
      }
    }
  }
}
@media screen and (min-width: 481px) {
  .post-container {
    .contnet-container {
      gap: 10px;
    }
  }
}
@media screen and (min-width: 769px) {
  .post-container {
    gap: 10px;
    flex-direction: row;
    .img-container {
      padding: 10px 0 10px 10px;
    }
    .contnet-container {
      padding: 10px 10px 5px 0;
      gap: 0px;
    }
  }
}
@media screen and (min-width: 1025px) {
  .post-container {
    .contnet-container {
      .action-btns-container {
        gap: 20px;
        button {
          padding: 0;
          font-size: 1.25rem;
        }
      }
    }
  }
}
</style>
