<template>
  <form @submit.prevent="handleSignUp">
    <input
      type="email"
      v-model="email"
      placeholder="Email"
      required
      :disabled="isLoading"
    />
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      required
      :disabled="isLoading"
    />
    <input
      type="text"
      v-model="name"
      placeholder="Name (optional)"
      :disabled="isLoading"
    />
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Signing Up...' : 'Sign Up' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Account created successfully!</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { signUp } from '~~/lib/auth-client';

// Component state
const email = ref('');
const password = ref('');
const name = ref('');
const error = ref('');
const isLoading = ref(false);
const success = ref(false);

// Handle sign-up
const handleSignUp = async () => {
  // Reset previous states
  error.value = '';
  success.value = false;
  isLoading.value = true;

  try {
    await signUp.email({
      email: email.value,
      password: password.value,
      name: name.value || undefined, // Only send name if provided
    });

  } catch (err) {
    error.value = 'Network error. Please try again.';
    console.error('Sign-up error:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>



