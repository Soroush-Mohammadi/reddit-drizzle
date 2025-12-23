<template>
  <div class="max-h-screen bg-gray-900 flex items-center justify-center px-4">
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
      <h2 class="text-3xl font-bold text-white text-center mt-8 mb-6">
        Confirm your birthday
      </h2>

      <!-- Description with formatted date -->
      <p class="text-sm text-gray-300 text-center mb-12 leading-relaxed px-4">
        You're setting your birthday to
        <span class="text-white font-semibold">{{ formattedBirthday }}</span
        >. This will be used to improve your experience on Reddit and ensure
        your account complies with our User Agreement. Make sure you provide an
        accurate date.
      </p>

      <!-- Confirm button (Reddit orange) -->
      <button
        @click="onConfirm"
        class="w-full bg-orange-500 text-white font-bold py-4 rounded-full hover:bg-orange-600 transition"
      >
        Yes, Confirm
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthFlowStore } from '@/stores/authFlow';

const flow = useAuthFlowStore();

// Assuming birthday is stored as ISO string 'YYYY-MM-DD' from previous step
const birthday = computed(() => flow.birthDate || '');

// Format as "Month DD, YYYY" (e.g., May 31, 1991)
const formattedBirthday = computed(() => {
  if (!birthday.value) return '';

  const date = new Date(birthday.value);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
});

function onConfirm() {
  // Final confirmation – proceed to next step (e.g., gender or completion)
  flow.next();
}

function prevStep() {
  // Go back to birthday input step
  flow.prev();
}
</script>
