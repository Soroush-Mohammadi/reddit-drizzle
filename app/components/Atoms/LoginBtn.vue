<template>
  <div>
    <button
      @click="ToggleModal"
      class="bg-orange-600 rounded-3xl text-white font-medium text-xs py-3 px-5 cursor-pointer"
    >
      Login
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthFlowStore } from '#imports';
const flow = useAuthFlowStore();

const ToggleModal = () => flow.toggleModal(true);
</script>

<style scoped></style>
