<script setup>
import { useAuthFlowStore } from '@/stores/authFlow';
definePageMeta({
  layout: 'dashboard' // matches the filename without .vue
});

const flow = useAuthFlowStore();
</script>
<template>
  <div class="col-start-3 col-span-8">
    <!-- Your page content goes here -->
    <AuthModal :show="flow.modal" />

    <div class="border mt-10 rounded-xl flex flex-col items-start">
      <OrganismsPostCart />
    </div>
  </div>
</template>
