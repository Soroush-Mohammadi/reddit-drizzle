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

      <!-- Skip button -->
      <button
        @click="skipStep"
        class="absolute top-6 right-6 text-gray-400 hover:text-white text-sm font-medium transition"
      >
        Skip
      </button>

      <!-- Title -->
      <h2 class="text-3xl font-bold text-white text-center mt-8 mb-4">
        About you
      </h2>

      <!-- Description -->
      <p class="text-sm text-gray-400 text-center mb-12 px-4">
        Tell us about yourself to improve your experience on Reddit.
      </p>

      <!-- Gender question -->
      <div class="mb-16">
        <p class="text-white text-center mb-6 text-lg">How do you identify?</p>

        <div class="space-y-3">
          <button
            v-for="option in genderOptions"
            :key="option.value"
            @click="selectGender(option.value)"
            class="w-full bg-gray-700 text-white font-medium py-4 rounded-xl hover:bg-gray-600 transition"
            :class="{ 'ring-2 ring-orange-500': gender === option.value }"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Continue button -->
      <button
        @click="onContinue"
        class="w-full bg-gray-700 text-gray-300 font-bold py-4 rounded-full hover:bg-gray-600 transition"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthFlowStore } from '@/stores/authFlow';

const flow = useAuthFlowStore();

const gender = ref<string | null>(null);

const genderOptions = [
  { label: 'Woman', value: 'woman' },
  { label: 'Man', value: 'man' },
  { label: 'Non-binary', value: 'non_binary' },
  { label: 'I prefer not to say', value: 'prefer_not_to_say' }
];

function selectGender(value: string) {
  gender.value = value;
}

function onContinue() {
  // Save gender to store if needed
  // flow.setGender(gender.value);
  console.log('Selected gender:', gender.value);
  flow.setGender(gender.value);

  flow.next();
}

function prevStep() {
  flow.prev();
}

function skipStep() {
  // Skip gender selection (optional)
  flow.next();
}
</script>
