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

    <div class="mt-10">
      <OrganismsPostCart />
    </div>
    <div class="absolute">
      <AuthModal :show="flow.modal" />
    </div>
  </div>
</template>
