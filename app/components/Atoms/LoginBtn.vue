<template>
  <div>
    <button
      v-if="!session?.data"
      @click="ToggleModal"
      class="bg-orange-600 rounded-3xl text-white font-medium text-xs py-3 px-5 cursor-pointer"
    >
      Login
    </button>
    <button
      v-else
      class="bg-orange-600 rounded-3xl text-white font-medium text-xs py-3 px-5 cursor-pointer"
    >
      user
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthFlowStore } from '#imports';
import { authClient } from '~~/lib/auth-client';
const flow = useAuthFlowStore();

const session = authClient.useSession();

const ToggleModal = () => flow.toggleModal(true);
</script>

<style scoped></style>
