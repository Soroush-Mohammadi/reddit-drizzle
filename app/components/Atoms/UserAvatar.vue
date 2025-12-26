<template>
  <div
    @click="() => emit('toggle-profile')"
    class="cursor-pointer w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center"
  >
    <!-- Placeholder for user avatar (pink circle with default Reddit-like style) -->
    <svg
      class="w-10 h-10 text-pink-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggle-profile']);
</script>

<style scoped></style>
