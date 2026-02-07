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
      <h2 class="text-3xl font-bold text-white text-center mt-8 mb-6">
        Create your username and password
      </h2>

      <!-- Description -->
      <p class="text-sm text-gray-400 text-center mb-10 px-4">
        Reddit is anonymous, so your username is what you’ll go by here. Choose
        wisely—because once you get a name, you can’t change it.
      </p>

      <!-- Username field -->
      <div class="mb-6">
        <div
          class="flex items-center bg-gray-700 rounded-xl px-4 py-4 focus-within:ring-2 focus-within:ring-orange-500 transition"
        >
          <span class="text-gray-500 mr-3 text-sm">Username *</span>
          <input
            v-model="username"
            @input="handleUsernameInput"
            type="text"
            placeholder="Username"
            class="flex-1 bg-transparent text-white outline-none text-base"
          />
          <!-- Regenerate suggestion -->
          <button
            v-if="canRegenerate"
            @click="generateSuggestion"
            class="text-green-500 hover:text-green-400 transition ml-3"
            title="Generate new suggestion"
          >
            🔄
          </button>
          <!-- Status indicators -->
          <span v-if="isCheckingUsername" class="ml-3 text-gray-400">⏳</span>
          <span v-if="usernameAvailable" class="ml-3 text-green-500 text-xl"
            >✓</span
          >
          <span v-if="usernameTaken" class="ml-3 text-red-500 text-xl">✗</span>
        </div>

        <!-- Username feedback -->
        <p v-if="usernameError" class="text-red-500 text-sm mt-2 ml-1">
          {{ usernameError }}
        </p>
        <p
          v-if="usernameAvailable && !usernameError"
          class="text-green-500 text-sm mt-2 ml-1"
        >
          Nice! Username available
        </p>
      </div>

      <!-- Password field -->
      <div class="mb-12">
        <input
          v-model="password"
          type="password"
          placeholder="Password *"
          class="w-full bg-gray-700 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
          :class="{ 'ring-2 ring-red-500': passwordError }"
        />
        <p v-if="passwordError" class="text-red-500 text-sm mt-2 ml-1">
          {{ passwordError }}
        </p>
      </div>

      <!-- Continue button -->
      <button
        @click="onContinue"
        :disabled="!isFormValid || isCheckingUsername"
        class="w-full bg-orange-500 text-white font-bold py-4 rounded-full hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthFlowStore } from '@/stores/authFlow';
import { useUsernameSuggestion } from '@@/composables/useUsernameSuggestion';
import { usernameSchema, passwordSchema } from '~~/schema/auth.schema';
import { signUp } from '~~/lib/auth-client';

const flow = useAuthFlowStore();

const password = ref('');

// Use your existing username suggestion composable
const {
  username,
  status,
  isAvailable: usernameAvailable,
  isChecking: isCheckingUsername,
  canRegenerate,
  generateSuggestion,
  handleInput: handleSuggestionInput
} = useUsernameSuggestion();

// Local validation errors
const usernameError = ref<string>('');
const passwordError = ref<string>('');

// Computed: username is taken (from server check)
const usernameTaken = computed(() => status.value?.status === 'taken');

// Handle username input: client validation + trigger suggestion check
function handleUsernameInput() {
  usernameError.value = '';
  passwordError.value = '';

  const trimmed = username.value.trim();

  if (!trimmed) {
    handleSuggestionInput();
    return;
  }

  const result = usernameSchema.safeParse(trimmed);
  if (!result.success) {
    usernameError.value = result.error.issues[0]?.message || 'Invalid username';
  }

  // Only trigger server check if client validation passes
  if (result.success) {
    handleSuggestionInput();
  }
}

// Real-time password validation
watch(password, (newVal) => {
  passwordError.value = '';
  if (!newVal) return;

  const result = passwordSchema.safeParse(newVal);
  if (!result.success) {
    passwordError.value = result.error.issues[0]?.message || 'Invalid password';
  }
});

// Form is valid only if:
// - Username passes client + server validation
// - Password passes validation
const isFormValid = computed(() => {
  return (
    username.value.trim().length > 0 &&
    usernameAvailable.value &&
    !usernameError.value &&
    password.value.length >= 8 &&
    !passwordError.value &&
    !isCheckingUsername.value
  );
});

async function onContinue() {
  if (!isFormValid.value) return;

  usernameError.value = '';
  passwordError.value = '';

  const usernameResult = usernameSchema.safeParse(username.value.trim());
  const passwordResult = passwordSchema.safeParse(password.value);

  if (!usernameResult.success || !passwordResult.success) return;

  // Save credentials in flow
  flow.setUsername(username.value.trim());
  flow.setPassword(password.value);

  try {
    const result = await signUp.email({
      email: flow.email,
      password: flow.password,
      name: flow.username
    });

    if (result.error) {
      passwordError.value = result.error.message || 'Sign-up failed';
      return;
    }

    // Clear password from memory after signup
    flow.setPassword('');

    // Move to onboarding
    flow.next();
  } catch (err) {
    passwordError.value = 'Network error. Please try again.';
  }
}

function prevStep() {
  flow.prev();
}
</script>
