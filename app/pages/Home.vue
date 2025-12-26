<template>
  <div class="grid grid-cols-12 border border-b">
    <div class="bg-pink-100 flex justify-center items-center">
      <AtomsLogo />
    </div>

    <div class="col-start-5 col-span-4 py-2">
      <MoleculesSearchBar />
    </div>
    <div class="col-start-10 col-span-2 bg-emerald-400 flex justify-around">
      <MoleculesAppMenu />
    </div>
    <div
      class="col-start-12 col-span-1 bg-blue-300 flex items-center justify-center"
    >
      <AtomsLoginBtn @toggle-modal="onToggleModal" />
    </div>
    <div v-if="false" class="bg-blue-600 flex items-center justify-end pr-3">
      <AtomsUserAvatar @toggle-profile="onToggleProfile" />
    </div>

    <OrganismsUserProfileMenu v-if="false" />
  </div>
  <div class="grid grid-cols-7">
    <div class="bg-red-100">
      <TemplatesSideMenu />
    </div>
    <div class="col-start-3 col-span-3">
      <TemplatesMainContent />
      <AuthModal :show="modal" />
    </div>
    <div class="bg-red-300">03</div>
    <div class="bg-red-400">04</div>
  </div>
</template>

<script setup>
import AuthModal from '@/components/auth/AuthModal.vue';

defineOptions({
  components: {
    AuthModal
  }
});

const modal = ref(false);
const profile = ref(false);

const onToggleModal = () => (modal.value = true);
const onToggleProfile = () => (profile.value = !profile.value);
</script>
