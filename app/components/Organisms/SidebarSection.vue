<template>
  <div class="flex flex-col gap-y-1">
    <div
      class="flex items-center justify-between text-xs font-semibold text-gray-500 px-3"
    >
      <span>{{ title }}</span>
      <Icon icon="material-symbols:expand-more-rounded" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
defineProps<{ title: string }>();
</script>
