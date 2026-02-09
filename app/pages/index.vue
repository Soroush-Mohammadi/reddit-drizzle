<script setup>
import { useAuthFlowStore } from '@/stores/authFlow';
definePageMeta({
  layout: 'dashboard' // matches the filename without .vue
});

const flow = useAuthFlowStore();
</script>
<template>
  <div>
    <!-- Your page content goes here -->

    <div class="border mt-10 rounded-xl flex flex-col items-start">
      <OrganismsPostCart />
    </div>
    <div class="absolute">
      <AuthModal :show="flow.modal" />
    </div>
  </div>
</template>
