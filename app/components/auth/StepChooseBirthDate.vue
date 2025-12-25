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

      <!-- Birthday inputs -->
      <div class="flex justify-center gap-3 mb-16">
        <!-- Month -->
        <div class="flex-1 max-w-[120px]">
          <input
            v-model="month"
            type="text"
            inputmode="numeric"
            maxlength="2"
            placeholder="MM"
            class="w-full bg-gray-700 text-white text-center px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-lg"
            :class="{ 'ring-2 ring-red-500': monthError }"
            @input="handleMonthInput"
          />
          <label class="block text-gray-500 text-xs text-center mt-2"
            >Month</label
          >
        </div>

        <!-- Day -->
        <div class="flex-1 max-w-[120px]">
          <input
            v-model="day"
            type="text"
            inputmode="numeric"
            maxlength="2"
            placeholder="DD"
            class="w-full bg-gray-700 text-white text-center px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-lg"
            :class="{ 'ring-2 ring-red-500': dayError }"
            @input="handleDayInput"
          />
          <label class="block text-gray-500 text-xs text-center mt-2"
            >Day</label
          >
        </div>

        <!-- Year -->
        <div class="flex-1 max-w-40">
          <input
            v-model="year"
            type="text"
            inputmode="numeric"
            maxlength="4"
            placeholder="YYYY"
            class="w-full bg-gray-700 text-white text-center px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-lg"
            :class="{ 'ring-2 ring-red-500': yearError }"
            @input="handleYearInput"
          />
          <label class="block text-gray-500 text-xs text-center mt-2"
            >Year</label
          >
        </div>
      </div>

      <!-- Error message -->
      <p v-if="dateError" class="text-red-500 text-sm text-center mb-6">
        {{ dateError }}
      </p>

      <!-- Continue button -->
      <button
        @click="onContinue"
        :disabled="!isFormValid"
        class="w-full bg-gray-700 text-gray-300 font-bold py-4 rounded-full hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthFlowStore } from '@/stores/authFlow';
import { birthdaySchema } from '~~/schema/auth.schema';

// Zod schema for birthday

const flow = useAuthFlowStore();

const month = ref('');
const day = ref('');
const year = ref('');

const monthError = ref(false);
const dayError = ref(false);
const yearError = ref(false);
const dateError = ref('');

// Restrict to numbers only
function handleMonthInput() {
  month.value = month.value.replace(/\D/g, '').slice(0, 2);
  validateForm();
}

function handleDayInput() {
  day.value = day.value.replace(/\D/g, '').slice(0, 2);
  validateForm();
}

function handleYearInput() {
  year.value = year.value.replace(/\D/g, '').slice(0, 4);
  validateForm();
}

function validateForm() {
  monthError.value = false;
  dayError.value = false;
  yearError.value = false;
  dateError.value = '';

  if (!month.value && !day.value && !year.value) {
    return; // empty, no error
  }

  const result = birthdaySchema.safeParse({
    month: month.value,
    day: day.value,
    year: year.value
  });

  if (!result.success) {
    // Find which field caused the error
    const issues = result.error.issues;
    for (const issue of issues) {
      if (issue.path[0] === 'month') monthError.value = true;
      if (issue.path[0] === 'day') dayError.value = true;
      if (issue.path[0] === 'year') yearError.value = true;
    }
    // Global errors (invalid date or age)
    dateError.value = issues[0]?.message || 'Please enter a valid date';
  }
}

const isFormValid = computed(() => {
  if (!month.value || !day.value || !year.value) return false;

  const result = birthdaySchema.safeParse({
    month: month.value,
    day: day.value,
    year: year.value
  });

  return result.success;
});

function onContinue() {
  if (!isFormValid.value) return;

  const parsed = birthdaySchema.parse({
    month: month.value,
    day: day.value,
    year: year.value
  });

  const birthDate = `${parsed.year}-${String(parsed.month).padStart(
    2,
    '0'
  )}-${String(parsed.day).padStart(2, '0')}`;

  // Save to store if needed
  // flow.setBirthday(birthDate);
  console.log('Birthday saved:', birthDate);
  flow.setBirthDate(birthDate);

  flow.next();
}

function prevStep() {
  flow.prev();
}

function skipStep() {
  flow.next();
}
</script>
