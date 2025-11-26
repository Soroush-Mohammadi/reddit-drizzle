<template>
    <h1>User Page</h1>
    <div v-if="session">
        {{ session.user.name }}
    </div>
    <div v-else>
        no session
    </div>
</template>

<script setup>
import { useSession } from '~~/lib/auth-client';
const { data: session } = await useSession(useFetch);


</script>