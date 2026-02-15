<template>
  <div class="relative">
    <input
      class="w-full border text-black border-gray-500 rounded-4xl text-xs pl-10 h-10"
      type="text"
    />
    <Icon
      class="absolute top-2 left-1"
      icon="logos:reddit-icon"
      width="28"
      height="27"
    />

    <div
      class="absolute top-1 right-1 flex justify-between gap-x-2 mx-2 items-center"
    >
      <Icon
        icon="clarity:blocks-group-line"
        width="28"
        height="28"
        color="#fc6203"
        class="border-l border-gray-500 pl-1"
      />
      <span class="font-medium text-black">Ask</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<style scoped></style>
