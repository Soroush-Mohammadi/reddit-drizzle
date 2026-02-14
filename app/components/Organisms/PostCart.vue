<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div
      v-for="post in posts"
      :key="post.id"
      class="bg-white rounded-2xl shadow-sm border p-4"
    >
      <!-- Header -->
      <div class="flex items-center justify-between text-sm text-gray-500">
        <div class="flex items-center gap-2">
          <img
            class="w-6 h-6 rounded-full"
            src="https://placehold.co/40"
            alt=""
          />
          <span class="font-semibold text-gray-700">{{
            post.community?.name
          }}</span>
          <span>• {{ post.createdAt }}</span>
        </div>

        <button class="text-gray-500">•••</button>
      </div>

      <!-- Title -->
      <h1 class="text-lg font-semibold mt-2">
        {{ post.title }}
      </h1>

      <!-- Image -->
      <img
        class="mt-3 rounded-xl w-full object-cover"
        src="https://placehold.co/1000x600"
        alt=""
      />

      <!-- Actions -->
      <div class="flex gap-2 mt-4">
        <!-- Votes -->
        <div class="flex bg-gray-100 gap-1 rounded-full items-center px-3 py-1">
          <Icon icon="memory:arrow-up-bold" width="18" height="18" />
          <span class="font-medium">{{ post.score }}</span>
          <Icon icon="memory:arrow-down-bold" width="18" height="18" />
        </div>

        <!-- Comments -->
        <div class="flex bg-gray-100 rounded-full items-center px-3 py-1 gap-1">
          <Icon icon="ep:chat-round" width="18" height="18" />
          <span>{{ post.commentCount }}</span>
        </div>

        <!-- Award -->
        <div class="flex bg-gray-100 rounded-full items-center px-3 py-1">
          <Icon icon="cil:badge" width="18" height="18" />
        </div>

        <!-- Share -->
        <div class="flex bg-gray-100 rounded-full items-center px-3 py-1">
          <Icon icon="mdi-light:share" width="18" height="18" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { data: posts } = await useFetch('/api/feed', {
  key: 'feed'
});
</script>
