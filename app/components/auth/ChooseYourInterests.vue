<template>
  <div class="max-h-screen flex items-center justify-center px-4">
    <div
      class="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 relative"
    >
      <!-- Back button -->
      <button
        @click="prevStep"
        class="absolute top-6 left-6 text-gray-400 hover:text-white transition"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Title -->
      <h2 class="text-3xl font-bold text-white text-center mt-8 mb-4">
        Choose your interests
      </h2>

      <!-- Description -->
      <p class="text-sm text-gray-400 text-center mb-10 px-4">
        Your choices will determine the options you see next.
      </p>

      <!-- Loading state -->
      <div
        v-if="pending"
        class="flex flex-col items-center justify-center py-16"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"
        ></div>
        <p class="text-gray-400 mt-4 text-lg">Loading interests...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500 mb-6">Failed to load interests</p>
        <button
          @click="refresh"
          class="px-8 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition"
        >
          Try Again
        </button>
      </div>

      <!-- Interests grid -->
      <div v-else class="grid grid-cols-4 gap-5 mb-12">
        <button
          v-for="item in chunkInterest"
          :key="item.id"
          @click="toggleInterest(item)"
          class="flex flex-col items-center justify-center py-5 rounded-2xl transition-all duration-200"
          :class="[
            selectedSlugs.includes(item.slug)
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          ]"
        >
          <!-- Icon (emoji) -->
          <div class="text-3xl mb-2">{{ item.icon }}</div>
          <!-- Name -->
          <span class="text-xs font-medium px-2 text-center leading-tight">
            {{ item.name }}
          </span>
        </button>
      </div>

      <!-- Continue button -->
      <button
        @click="flow.next()"
        :disabled="flow.interests.length === 0"
        class="w-full bg-gray-700 text-gray-300 font-bold py-4 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
        :class="{
          'bg-orange-500 hover:bg-orange-600 text-white':
            flow.interests.length > 0
        }"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthFlowStore } from '@/stores/authFlow';

const flow = useAuthFlowStore();

// Switch to useLazyFetch → non-blocking, no global Nuxt loading indicator
const { data, pending, error, refresh } = useLazyFetch('/api/interests', {
  key: 'interests',
  // Provide empty array while loading to avoid undefined errors
  default: () => ({ data: [] })
});

const interests = computed(() => data.value?.data || []);

// Show only first 15 interests
const chunkInterest = computed(() => interests.value.slice(0, 15));

// Quick lookup for selected interests
const selectedSlugs = computed(() => flow.interests);

function toggleInterest(item: any) {
  if (flow.interests.includes(item.slug)) {
    flow.interests = flow.interests.filter((i: string) => i !== item.slug);
  } else {
    flow.interests.push(item.slug);
  }
}

function prevStep() {
  flow.prev();
}
</script>
