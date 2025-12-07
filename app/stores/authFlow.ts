// stores/authFlow.ts
import { defineStore } from 'pinia';

export const useAuthFlowStore = defineStore('authFlow', () => {
  // ---- STATE ----
  const step = ref(1);

  const email = ref('');
  const password = ref('');
  const interests = ref<string[]>([]);

  // ---- ACTIONS ----
  const next = () => step.value++;
  const prev = () => step.value--;
  const goTo = (n: number) => {
    step.value = n;
  };

  const setEmail = (val: string) => {
    email.value = val;
  };
  const setPassword = (val: string) => {
    password.value = val;
  };

  const toggleInterest = (name: string) => {
    if (interests.value.includes(name)) {
      interests.value = interests.value.filter((i) => i !== name);
    } else {
      interests.value.push(name);
    }
  };

  const finalizeSignup = async () => {
    console.log('Collected:', {
      email: email.value,
      password: password.value,
      interests: interests.value
    });

    // Example API call:
    // await $fetch("/api/signup", {
    //   method: "POST",
    //   body: { email: email.value, password: password.value, interests: interests.value }
    // });
  };

  return {
    // state
    step,
    email,
    password,
    interests,

    // actions
    next,
    prev,
    goTo,
    setEmail,
    setPassword,
    toggleInterest,
    finalizeSignup
  };
});
