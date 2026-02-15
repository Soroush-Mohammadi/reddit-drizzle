<template>
  <div class="max-w-2xl mx-auto p-4 space-y-6 cursor-pointer">
    <!-- Post Header -->
    <div class="flex items-center justify-between text-sm text-gray-500">
      <div class="flex items-center gap-2">
        <img
          class="w-8 h-8 rounded-full"
          :src="post.author?.image || 'https://placehold.co/40'"
          alt=""
        />
        <div>
          <p class="font-semibold text-gray-700">{{ post.author?.name }}</p>
          <p class="text-gray-400 text-xs">{{ post.createdAt }}</p>
        </div>
      </div>
      <button class="text-gray-500">•••</button>
    </div>

    <!-- Post Content -->
    <div class="space-y-4">
      <h1 class="text-xl font-bold">{{ post.title }}</h1>
      <p v-if="post.content">{{ post.content }}</p>

      <!-- Poll Component -->
      <div
        v-if="post.poll"
        class="bg-purple-700 text-white p-4 rounded-xl space-y-4"
      >
        <p class="font-semibold">{{ post.poll.question }}</p>
        <div class="flex flex-col gap-2 mt-2">
          <button
            v-for="(option, idx) in post.poll.options"
            :key="idx"
            class="bg-purple-600 hover:bg-purple-500 rounded-md py-2 text-sm"
            @click="vote(idx)"
          >
            {{ option }}
          </button>
        </div>
        <p class="text-xs text-purple-200 mt-2">
          Vote to see what others chose.
        </p>
      </div>

      <!-- Actions -->
      <div class="flex gap-4 mt-4">
        <div class="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
          <button @click="upvote">▲</button>
          <span>{{ post.score }}</span>
          <button @click="downvote">▼</button>
        </div>
        <div class="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
          💬 {{ post.comments?.length || 0 }}
        </div>
        <div class="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
          🏆
        </div>
        <div class="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
          🔗
        </div>
      </div>
    </div>

    <!-- Comments -->
    <div v-if="post.comments?.length" class="mt-6 space-y-4">
      <h2 class="text-lg font-semibold">Comments</h2>
      <div
        v-for="comment in post.comments"
        :key="comment.id"
        class="p-3 bg-gray-50 rounded-lg"
      >
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <img
            class="w-6 h-6 rounded-full"
            :src="comment.author?.image || 'https://placehold.co/40'"
            alt=""
          />
          <span class="font-semibold text-gray-700">{{
            comment.author?.name
          }}</span>
          <span>• {{ comment.createdAt }}</span>
        </div>
        <p class="mt-2 text-gray-800">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard' // matches the filename without .vue
});

import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const { data: post } = await useFetch(`/api/posts/${route.params.id}`);

// Dummy reactive poll votes (for frontend)
const voteIndex = ref<number | null>(null);

const vote = (idx: number) => {
  voteIndex.value = idx;
  alert(`You voted for option ${idx + 1}`);
};

const upvote = () => {
  if (post.value) post.value.score++;
};

const downvote = () => {
  if (post.value) post.value.score--;
};
</script>

<style scoped>
/* Optional: simple hover effect for poll buttons */
button:hover {
  cursor: pointer;
}
</style>
