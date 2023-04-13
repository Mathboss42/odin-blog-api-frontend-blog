<script setup>
import PostComponent from '../components/PostComponent.vue';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const posts = ref();

onMounted(async () => {
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
        <ul>
            <li v-for="post in posts" :key="post._id">
                <RouterLink :to="{ name: 'post', params: { id: post._id }}">{{ post.title }}</RouterLink>
            </li>
        </ul>
        <div >
            <PostComponent />
        </div>
    </main>
</template>
