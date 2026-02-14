<template>
  <div
    class="flex items-center gap-x-3 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
  >
    <Icon :icon="icon" width="20" height="20" class="text-gray-600" />
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  icon: string;
  label: string;
}>();
</script>
