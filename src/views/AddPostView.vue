<script setup>
import AdminDashContentLayout from '@/components/layout/AdminDashContentLayout.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import AddPostForm from '@/components/postForm/AddPostForm.vue'
</script>
<template>
  <AdminDashContentLayout>
    <PageLayout>
      <template #header>
        <h1 class="page-main-title">kreiraj blog</h1>
      </template>
      <template #body>
        <AddPostForm />
      </template>
    </PageLayout>
  </AdminDashContentLayout>
</template>

<style scoped></style>
