<script setup>
import { onMounted, ref } from 'vue';

const post = ref();
const comments = ref();

const props = defineProps({
    id: String
})

const loading = ref(true);
const formAction = ref(`http://localhost:8092/api/comments/new`);

onMounted(async function() {
    console.log(props.id);
    try {
        const postData = await fetch(`http://localhost:8092/api/posts/${props.id}`)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Not 2xx response", {cause: response});
                } else {
                    return response;
                }
            }).catch(function(err) {
                console.log(err);
            });
        const postResult = await postData.json();
        post.value = postResult.post;  
        
        const commentData = await fetch(`http://localhost:8092/api/posts/${props.id}/comments`)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Not 2xx response", {cause: response});
                } else {
                    return response;
                }
            }).catch(function(err) {
                console.log(err);
            });
        const commentResult = await commentData.json();
        comments.value = commentResult.comments;  

        console.log(comments.value);
        
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
    <form :action="formAction" method="POST">
        <p>Write A Comment</p>
        <textarea name="text" id="text" cols="100" rows="5"></textarea>
        <input type="hidden" name="postid" :value="props.id">
        <button type="submit">Submit</button>
    </form>
    <ul>
        <li v-for="comment in comments" :key="comment._id">
            <p>{{ comment.text }}</p>
            <p>- {{ comment.author.username }}</p>
        </li>
    </ul>
  </main>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px 50px;
    border: 2px black solid;
}
</style>
