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

      <!-- Skip link (dev only) -->
      <button
        @click="skipStep"
        class="absolute top-6 right-6 text-gray-400 hover:text-white text-sm font-medium transition"
      >
        Skip
      </button>

      <!-- Title -->
      <h2 class="text-3xl font-bold text-white text-center mt-8 mb-4">
        Verify your email
      </h2>

      <!-- Description -->
      <p class="text-sm text-gray-400 text-center mb-10 px-4">
        Enter the 6-digit code we sent to
        <span class="text-white font-medium">{{ email }}</span>
      </p>

      <!-- Code input -->
      <div class="mb-12">
        <input
          ref="codeInput"
          v-model="code"
          type="text"
          inputmode="numeric"
          pattern="\d*"
          maxlength="6"
          placeholder="000000"
          class="w-full bg-gray-700 text-white px-6 py-4 rounded-xl text-2xl text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-600"
          :class="{ 'ring-2 ring-red-500': error }"
          :disabled="isLoading"
          @input="handleCodeInput"
        />

        <!-- Success message -->
        <p
          v-if="success"
          class="text-green-500 text-sm text-center mt-4 font-medium"
        >
          {{ success }}
        </p>

        <!-- Error message -->
        <p v-if="error" class="text-red-500 text-sm text-center mt-4">
          {{ error }}
        </p>
      </div>

      <!-- Resend -->
      <p class="text-center text-sm text-gray-400 mb-12">
        Didn't get an email?
        <button
          @click="resendCode"
          class="text-gray-300 font-medium hover:underline ml-1 transition"
          :disabled="resendCountdown > 0 || isLoading"
        >
          Resend{{
            resendCountdown > 0
              ? ` in 0:${resendCountdown.toString().padStart(2, '0')}`
              : ''
          }}
        </button>
      </p>

      <!-- Submit button -->
      <button
        @click="verifyCode"
        :disabled="isLoading || code.length !== 6"
        class="w-full font-bold py-4 rounded-full transition disabled:opacity-50"
        :class="
          code.length === 6 && !isLoading
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-gray-700 text-gray-300'
        "
      >
        {{ isLoading ? 'Verifying...' : 'Continue' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  verificationCodeSchema,
  type VerificationCodeInput
} from '~~/schema/auth.schema';
import { useAuthFlowStore } from '#imports';
import { signUp } from '~~/lib/auth-client';

const auth = useAuthFlowStore();

const email = computed(() => auth.email || 'your@email.com');

const code = ref('');
const error = ref<string>('');
const success = ref<string>('');
const isLoading = ref(false);
const resendCountdown = ref(60);

const codeInput = ref<HTMLInputElement | null>(null);

let countdownInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  startCountdown();
  // Auto-focus the input when component mounts
  nextTick(() => codeInput.value?.focus());
});

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval);
});

function startCountdown() {
  countdownInterval = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--;
    } else {
      clearInterval(countdownInterval!);
    }
  }, 1000);
}

function handleCodeInput() {
  // Remove any non-digit characters and limit to 6
  code.value = code.value.replace(/\D/g, '').slice(0, 6);
  error.value = '';
  success.value = '';
}

interface VerifyCodeResponse {
  success: boolean;
  message?: string;
}

async function verifyCode() {
  error.value = '';
  success.value = '';
  isLoading.value = true;

  if (!auth.email) {
    error.value = 'Email is missing. Please restart signup.';
    isLoading.value = false;
    return;
  }

  const input: VerificationCodeInput = {
    email: auth.email,
    code: code.value
  };

  const parsed = verificationCodeSchema.safeParse(input);

  if (!parsed.success) {
    error.value =
      parsed.error.issues[0]?.message || 'Invalid verification code';
    isLoading.value = false;
    return;
  }

  try {
    const response = await $fetch<VerifyCodeResponse>('/api/verify-code', {
      method: 'POST',
      body: parsed.data
    });

    if (!response.success) {
      error.value = response.message || 'Verification failed';
      return;
    }

    // ✅ Code is valid → move to next step
    success.value = 'Email verified!';

    setTimeout(() => {
      auth.next();
    }, 500);
  } catch (err: any) {
    error.value =
      err?.data?.statusMessage || 'Invalid or expired verification code';
  } finally {
    isLoading.value = false;
  }
}

function prevStep() {
  auth.prev();
}

function skipStep() {
  // ⚠️ Only for development/testing — remove in production!
  auth.next();
}
</script>
