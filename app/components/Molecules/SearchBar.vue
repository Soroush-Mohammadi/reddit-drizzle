<template>
  <div class="relative">
    <input
      class="w-full border rounded-4xl text-lg pl-10 h-9"
      type="text"
      placeholder="Find Anything"
    />
    <Icon
      class="absolute top-1 left-1"
      icon="logos:reddit-icon"
      width="28"
      height="27"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<style scoped></style>
