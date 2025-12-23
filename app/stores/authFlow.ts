// stores/authFlow.ts
import { defineStore } from 'pinia';

export const useAuthFlowStore = defineStore('authFlow', () => {
  // ---- STATE ----
  const step = ref(1);

  const email = ref('');
  const username = ref('');
  const password = ref('');
  const birthDate = ref('');
  const gender = ref<string | null>('');
  const interests = ref<string[]>([]);

  // modal

  const modal = ref(false);

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

  const setUsername = (val: string) => {
    username.value = val;
  };
  const setBirthDate = (val: string) => {
    birthDate.value = val;
  };
  const setGender = (val: string | null) => {
    gender.value = val;
  };

  const toggleModal = (val: boolean) => {
    modal.value = val;
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
      interests: interests.value,
      birthDate: birthDate.value,
      gender: gender.value
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
    birthDate,
    username,
    modal,

    // actions
    next,
    prev,
    goTo,
    setEmail,
    setUsername,
    setPassword,
    setGender,
    setBirthDate,
    toggleInterest,
    finalizeSignup,
    toggleModal
  };
});
