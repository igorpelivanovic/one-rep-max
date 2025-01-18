<script setup>
import AddPostForm from '@/components/postForm/AddPostForm.vue'
</script>
<template>
  <div class="bg-white page-container">
    <div class="container">
      <div class="page-header">
        <h1>kreiraj blog</h1>
      </div>
      <div class="page-body">
        <div class="form-container">
          <AddPostForm />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  .container {
    margin-block: 20px 40px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 60px;
    .page-header {
      h1 {
        text-align: center;
        text-transform: capitalize;
      }
    }
    .page-body {
      flex: 1;
      .form-container {
        margin: auto;
      }
    }
  }
}
@media screen and (min-width: 1025px) {
  .page-container {
    .container {
      .page-header {
        h1 {
          text-align: left;
        }
      }
    }
  }
}
</style>
