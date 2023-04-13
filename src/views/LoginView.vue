<script setup>
import { useBlogStore } from '../stores/blog';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useBlogStore();

async function handleLogin(e) {
    e.preventDefault();
    const form = document.getElementById('theform');
    const data = new FormData(form);
    let values = [];
    // eslint-disable-next-line no-unused-vars
    for (const [name, value] of data) {
        values.push(value);
    }

    const user = {
        username: values[0],
        password: values[1]
    };

    const response = await postData(user);
    console.log('response', response);

    if (response.token) {
        localStorage.setItem('token', response.token);
        store.isLoggedIn = true;
        router.push('/');
    }
}

async function postData(data) {
    const response = await fetch('http://localhost:8092/auth', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const result = await response.json();
    return result;
}

</script>
<template>
    <form :onsubmit="handleLogin" id="theform">
        <div>
            <label for="username">Username:</label>
            <input type="text" name="username" id="username">
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password">
        </div>
        <button type="submit">Log In</button>
    </form>
</template>