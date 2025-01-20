<script setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import AddPostForm from '@/components/postForm/AddPostForm.vue'
</script>
<template>
  <PageLayout>
    <template #header>
      <h1>kreiraj blog</h1>
    </template>
    <template #body>
      <div class="form-container">
        <AddPostForm />
      </div>
    </template>
  </PageLayout>
</template>

<style scoped></style>
