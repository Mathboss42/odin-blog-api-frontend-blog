<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useBlogStore } from '../stores/blog';

const store = useBlogStore();

onMounted(() => {
    localStorage.removeItem('token');
    store.isLoggedIn = false;
});
</script>
<template>
    <p>Logged out successfully.</p> 
    <RouterLink to="/">Home Page</RouterLink>
</template>