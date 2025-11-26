
<script setup>
import { signIn } from '~~/lib/auth-client';
const email = ref('')
const password = ref('')

const login = async () => {
   await signIn.email({
    email: email.value, // required
    password: password.value, // required
    rememberMe: true,
});
}

</script>

<template>
    <form @submit.prevent="login">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit">login</button>
        
    </form>
</template>


<style>
input {
padding: 10px;
font-size: 18px;
}
</style>
