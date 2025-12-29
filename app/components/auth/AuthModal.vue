<!-- components/auth/AuthModal.vue -->
<template>
  <div
    v-if="modal"
    class="fixed inset-0 bg-black/50 flex justify-center items-center"
  >
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { useAuthFlowStore } from '@/stores/authFlow.ts';

import StepChooseAuth from '@/components/auth/StepChooseAuth.vue';
import StepEnterEmail from '@/components/auth/StepEnterEmail.vue';
import StepEmailVerfication from '@/components/auth/StepEmailVerfication.vue';
import CreateUserAndPass from '@/components/auth/CreateUserAndPass.vue';
import StepChooseBirthDate from './StepChooseBirthDate.vue';
import ConfirmBirthday from './ConfirmBirthday.vue';
import AboutYou from './AboutYou.vue';
import ChooseYourInterests from './ChooseYourInterests.vue';
import CustomizeYourFeed from './CustomizeYourFeed.vue';

defineProps({ show: Boolean });

const flow = useAuthFlowStore();

const stepsMap = {
  1: StepChooseAuth,
  2: StepEnterEmail,
  3: StepEmailVerfication,
  4: CreateUserAndPass,
  5: StepChooseBirthDate,
  6: ConfirmBirthday,
  7: AboutYou,
  8: ChooseYourInterests,
  9: CustomizeYourFeed
};

const modal = computed(() => flow.modal);

const currentComponent = computed(() => stepsMap[flow.step]);
</script>
