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
        Customize your feed
      </h2>

      <!-- Description -->
      <p class="text-sm text-gray-400 text-center mb-8 px-4">
        Every selection you make improves your feed.
      </p>

      <!-- Loading state -->
      <div
        v-if="pending"
        class="flex flex-col items-center justify-center py-16"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"
        ></div>
        <p class="text-gray-400 mt-4 text-lg">Loading topics...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500 mb-6">Failed to load topics</p>
        <button
          @click="refresh"
          class="px-8 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition"
        >
          Try Again
        </button>
      </div>

      <!-- Main content (only show when data is loaded) -->
      <div v-else>
        <!-- Search bar -->
        <div class="relative mb-8">
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Find more of your interests"
            class="w-full bg-gray-700 text-white pl-12 pr-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
          />
        </div>

        <!-- Topics grid -->
        <div class="mb-12 max-h-96 overflow-y-auto">
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="topic in filteredTopics"
              :key="topic.id"
              @click="toggle(topic)"
              class="py-3 px-4 rounded-xl text-left text-sm font-medium transition-all duration-200"
              :class="[
                flow.interests.includes(topic.slug)
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              ]"
            >
              {{ topic.name }}
            </button>
          </div>

          <!-- Show More Topics button (when not searching and more exist) -->
          <button
            v-if="searchQuery === '' && allTopics.length > visibleCount"
            @click="visibleCount += 30"
            class="w-full mt-6 py-3 px-4 rounded-xl bg-gray-700 text-gray-300 hover:bg-gray-600 transition font-medium"
          >
            Show More Topics
          </button>
        </div>

        <!-- Continue button -->
        <button
          @click="finalizeSignup"
          class="w-full bg-gray-700 text-gray-300 font-bold py-4 rounded-full hover:bg-gray-600 transition"
          :class="{
            'bg-orange-500 hover:bg-orange-600 text-white':
              flow.interests.length > 0
          }"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthFlowStore } from '@/stores/authFlow';

const flow = useAuthFlowStore();

// Switch to useLazyFetch → non-blocking, avoids global Nuxt loading indicator
const { data, pending, error, refresh } = useLazyFetch('/api/interests', {
  key: 'interests',
  default: () => ({ data: [] })
});

const allTopics = computed(() => data.value?.data || []);

const searchQuery = ref('');
const visibleCount = ref(40); // initial number of topics to show

const filteredTopics = computed(() => {
  let topics = allTopics.value;

  // Apply search filter
  if (searchQuery.value) {
    topics = topics.filter((t: any) =>
      t.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Apply "Show More" pagination only when not searching
  if (searchQuery.value === '') {
    return topics.slice(0, visibleCount.value);
  }

  return topics;
});

function toggle(topic: any) {
  if (flow.interests.includes(topic.slug)) {
    flow.interests = flow.interests.filter((i: string) => i !== topic.slug);
  } else {
    flow.interests.push(topic.slug);
  }
}

function prevStep() {
  flow.prev();
}

async function finalizeSignup() {
  console.log('Submitting onboarding...', flow.interests);

  try {
    const res = await $fetch('/api/onboarding', {
      method: 'POST',
      body: {
        interests: flow.interests
      }
    });

    console.log('Onboarding saved:', res);

    window.location.href = '/';
  } catch (err) {
    console.error('Onboarding failed:', err);
  }
}
</script>
