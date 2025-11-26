<template>
    <button @click="onSignOut">signout user</button>
</template>

<script setup>

import { signOut } from '~~/lib/auth-client';

const onSignOut = async () => {

    try {
       await signOut()
        console.log('user signed out')
    } catch (err) {
        console.error(err)
    } finally {
       console.log('signout complete')
    }
  
    
}

</script>
