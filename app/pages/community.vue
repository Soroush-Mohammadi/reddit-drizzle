<template>
    <h1>session</h1>
    {{ data }}
</template>


<script setup>
const { data } = await useFetch('/api/communities')

</script>