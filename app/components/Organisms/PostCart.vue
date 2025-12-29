<template>
  <div class="m-6" v-for="post in posts" :key="post.id">
    <div>
      <h1 class="text-xl text-left font-bold">{{ post.title }}</h1>
      <img class="mt-3 rounded-xl" src="https://placehold.co/1000x600" alt="" />
    </div>
    <div class="flex gap-x-2 my-4">
      <div class="flex bg-gray-300 gap-x-1 rounded-xl items-center p-1 px-3">
        <Icon icon="memory:arrow-up-bold" width="18" height="18" />
        <span>{{ post.score }}</span>
        <Icon icon="memory:arrow-down-bold" width="18" height="18" />
      </div>
      <div class="flex bg-gray-300 rounded-xl items-center px-4">
        <Icon icon="ep:chat-round" width="18" height="18" />
        <span class="ms-2">{{ post.commentCount }}</span>
      </div>
      <div class="flex bg-gray-300 rounded-xl items-center px-3">
        <Icon icon="cil:badge" width="22" height="22" />
      </div>
      <div class="flex bg-gray-300 rounded-xl items-center px-3">
        <Icon icon="mdi-light:share" width="22" height="22" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { data: posts } = await useFetch('/api/posts');
</script>

<style scoped></style>
