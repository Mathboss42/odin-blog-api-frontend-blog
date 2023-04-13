<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useBlogStore } from '../stores/blog';

const store = useBlogStore();

const posts = ref();

onMounted(async () => {
    console.log(store.isLoggedIn)
    try {
        const data = await fetch('http://localhost:8092/api/posts')
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Not 2xx response", {cause: response});
            } else {
                return response;
            }
        }).catch(function(err) {
            console.log(err);
        });
        const result = await data.json();
        posts.value = result.posts;  
    } catch (err) {
        console.log(err);
        posts.value = 'posts couldnt be fetched';
    }
});

</script>

<template>
    <main>
        <RouterLink v-if="!store.isLoggedIn.valueOf()" to="/login">Log In</RouterLink>
        <RouterLink v-else to="/logout">Log Out</RouterLink>
        <ul>
            <li v-for="post in posts" :key="post._id">
                <RouterLink :to="{ name: 'post', params: { id: post._id }}"><h2>{{ post.title }}</h2></RouterLink>
                <p>- By {{ post.author.username }}</p>
            </li>
        </ul>
    </main>
</template>
