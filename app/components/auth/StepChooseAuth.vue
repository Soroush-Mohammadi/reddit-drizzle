<template>
  <div class="max-h-screen bg-gray-900 flex items-center justify-center px-4">
    <div
      class="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 relative"
    >
      <!-- Close button (optional, adjust if not needed) -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
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

      <!-- Agreement text -->
      <p class="text-sm text-gray-400 text-center mb-8">
        By continuing, you agree to our User Agreement and acknowledge that you
        understand the Privacy Policy.
      </p>

      <!-- Social/Login buttons -->
      <div class="space-y-3 mb-8">
        <button
          class="w-full bg-white text-gray-900 font-medium py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.742-5.445,3.742c-3.301,0-6.013-2.731-6.013-6.08 c0-3.35,2.712-6.08,6.013-6.08c1.928,0,3.337,0.669,4.584,1.765l3.123-3.123C18.188,2.139,15.343,0,12.545,0 C6.677,0,2,5.677,2,12s4.677,12,10.545,12c6.068,0,10.027-4.263,10.027-10.267c0-0.692-0.073-1.219-0.199-1.75h-9.828 L12.545,10.239z"
            />
          </svg>
          Continue with Google
        </button>

        <button
          class="w-full bg-white text-gray-900 font-medium py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M22.686 12.293c0-5.427-4.402-9.828-9.829-9.828s-9.828 4.401-9.828 9.828c0 4.885 3.564 8.938 8.227 9.71v-6.867h-2.474v-2.843h2.474v-2.164c0-2.446 1.497-3.785 3.682-3.785 1.046 0 1.941.078 2.203.113v2.555h-1.512c-1.183 0-1.413.563-1.413 1.389v1.823h2.826l-.368 2.843h-2.458v6.867c4.663-.772 8.227-4.825 8.227-9.71"
            />
          </svg>
          Continue with Apple
        </button>

        <button
          class="w-full bg-white text-gray-900 font-medium py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.252 1.052l-2.48 2.48a1 1 0 00-.284 1.132c1.395 3.944 4.652 7.195 8.596 8.596a1 1 0 001.132-.284l2.48-2.48a1 1 0 011.052-.252l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Continue with Phone Number
        </button>

        <button
          class="w-full bg-white text-gray-900 font-medium py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
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

      <!-- Email/Username and Password fields -->
      <form class="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Email or username *"
            class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password *"
            class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div class="text-right">
          <a href="#" class="text-sm text-orange-500 hover:underline"
            >Forgot password?</a
          >
        </div>

        <button
          type="submit"
          class="w-full bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 transition mt-6"
        >
          Log In
        </button>
      </form>

      <!-- Sign up link (integrated with your auth flow store) -->
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

<script setup>
import { useAuthFlowStore } from '#imports';

const auth = useAuthFlowStore();
const nextStep = () => auth.next();

const closeModal = () => auth.toggleModal(false);
</script>
