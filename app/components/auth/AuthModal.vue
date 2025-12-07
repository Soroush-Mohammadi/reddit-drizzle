<!-- components/auth/AuthModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex justify-center items-center"
  >
    <div class="bg-white rounded-xl p-6 w-full max-w-md">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { useAuthFlowStore } from '@/stores/authFlow.ts';

import StepChooseAuth from '@/components/auth/StepChooseAuth.vue';
import StepEnterEmail from '@/components/auth/StepEnterEmail.vue';
import StepEmailVerfication from '@/components/auth/StepEmailVerfication.vue';
import StepChooseInterests from '@/components/auth/StepChooseAuth.vue';

defineProps({ show: Boolean });

const flow = useAuthFlowStore();

const stepsMap = {
  1: StepChooseAuth,
  2: StepEnterEmail,
  3: StepEmailVerfication,
  4: StepChooseInterests
};

const currentComponent = computed(() => stepsMap[flow.step]);
</script>
