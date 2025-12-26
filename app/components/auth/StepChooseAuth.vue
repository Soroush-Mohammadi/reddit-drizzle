<template>
  <div class="max-h-screen bg-gray-900 flex items-center justify-center px-4">
    <div
      class="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 relative"
    >
      <!-- Close button -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        aria-label="Close login modal"
        type="button"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Title -->
      <h2 class="text-3xl font-bold text-white text-center mb-6">Log In</h2>

      <p class="text-sm text-gray-400 text-center mb-8">
        By continuing, you agree to our User Agreement and acknowledge that you
        understand the Privacy Policy.
      </p>

      <!-- Social buttons -->
      <div class="space-y-3 mb-8">
        <button
          type="button"
          class="w-full bg-white text-gray-900 font-medium py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <!-- Google SVG -->
          </svg>
          Continue with Google
        </button>
        <button
          type="button"
          class="w-full bg-white text-gray-900 font-medium py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <!-- Apple SVG -->
          </svg>
          Continue with Apple
        </button>
        <button
          type="button"
          class="w-full bg-white text-gray-900 font-medium py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <!-- Phone SVG -->
          </svg>
          Continue with Phone Number
        </button>
        <button
          type="button"
          class="w-full bg-white text-gray-900 font-medium py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <!-- Email SVG -->
          </svg>
          Email me a one-time link
        </button>
      </div>

      <!-- OR separator -->
      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-gray-800 text-gray-400">OR</span>
        </div>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
        <div>
          <input
            ref="emailInput"
            v-model="form.email"
            type="email"
            placeholder="Email *"
            autocomplete="username"
            class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            :class="{ 'ring-2 ring-red-500': errors.email }"
            @input="errors.email = ''"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Password *"
            autocomplete="current-password"
            class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            :class="{ 'ring-2 ring-red-500': errors.password }"
            @input="errors.password = ''"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">
            {{ errors.password }}
          </p>
        </div>

        <div class="text-right">
          <a href="#" class="text-sm text-orange-500 hover:underline"
            >Forgot password?</a
          >
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 disabled:opacity-70 transition mt-6"
        >
          {{ isSubmitting ? 'Logging in...' : 'Log In' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-400 mt-6">
        New to Reddit?
        <span
          class="text-orange-500 font-medium hover:underline cursor-pointer"
          @click.prevent="nextStep"
        >
          Sign Up
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useAuthFlowStore } from '#imports';
import { signIn } from '~~/lib/auth-client';
import { z } from 'zod';
import { emailSchema, passwordSchema } from '~~/schema/auth.schema';

const auth = useAuthFlowStore();
const nextStep = () => auth.next();
const closeModal = () => auth.toggleModal(false);

// Focus email input on mount
const emailInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  emailInput.value?.focus();
});

// Form state
const form = reactive({
  email: '',
  password: ''
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);

// Schema: email + password only
const loginSchema = z.object({
  email: emailSchema.shape.email,
  password: passwordSchema
});

async function handleSubmit() {
  errors.value = {};
  isSubmitting.value = true;

  try {
    // Validate
    loginSchema.parse({
      email: form.email.trim(),
      password: form.password
    });

    // API call - now correctly uses email only
    const { data, error } = await signIn.email({
      email: form.email.trim(),
      password: form.password,
      rememberMe: true
    });

    if (error) throw error;

    // Success
    closeModal();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const newErrors: Record<string, string> = {};
      err.issues.forEach((issue) => {
        const path = issue.path.join('.');
        if (!newErrors[path]) {
          newErrors[path] = issue.message;
        }
      });
      errors.value = newErrors;
    } else {
      // General auth error (wrong credentials, etc.)
      errors.value.password = 'Invalid email or password';
      console.error('Login error:', err);
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>
