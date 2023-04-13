<script setup>
import { onMounted, ref } from 'vue';

const post = ref();

const props = defineProps({
    id: String
})

const loading = ref(true);

onMounted(async function() {
    console.log(props.id);
    try {
        const data = await fetch(`http://localhost:8092/api/posts/${props.id}`)
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
        post.value = result.post;  
        loading.value = false;
    } catch (err) {
        console.log(err);
        post.value = 'posts couldnt be fetched';
    }
});
</script>

<template>
  <main>
    <div v-if="loading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <h2>{{ post.title }}</h2>
        <p>{{ post.text }}</p>
        <p>-Written by {{ post.author.username }}</p>
    </div>
  </main>
</template>
