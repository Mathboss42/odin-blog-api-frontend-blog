<script setup>
import { onMounted, ref } from 'vue';
import { useBlogStore } from '../stores/blog';

const store = useBlogStore();

const post = ref();
const comments = ref();

const token = ref(localStorage.getItem('token'));

const props = defineProps({
    id: String
})

const loading = ref(true);

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


async function handleNewComment(e) {
    // e.preventDefault();
    const form = document.getElementById('theform');
    const data = new FormData(form);
    let values = [];
    // eslint-disable-next-line no-unused-vars
    for (const [name, value] of data) {
        values.push(value);
    }

    const newData = {
        text: values[0],
        post: values[1]
    };

    console.log(newData);

    const response = await postData(newData);
    console.log('response', response);
}

async function postData(data) {
    const response = await fetch('http://localhost:8092/api/comments/new', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Authorization": `Bearer ${token.value}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const result = await response.json();
    return result;
}
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
    <form :onsubmit="handleNewComment" id="theform">
        <p>Write A Comment</p>
        <textarea name="text" id="text" cols="100" rows="5"></textarea>
        <input type="hidden" name="post" :value="props.id">
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
