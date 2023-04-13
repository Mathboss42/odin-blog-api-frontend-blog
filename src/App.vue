<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useBlogStore } from './stores/blog';

const store = useBlogStore();

onMounted(() => {
  const token = localStorage.getItem('token');

  if (token) {
    store.isLoggedIn = true;
  }
});

</script>

<template>
  <RouterLink to="/"><h1>Blog</h1></RouterLink>
  <RouterView />
</template>

<style scoped>

</style>
