<script setup>
import { Icon } from '@iconify/vue';
const emit = defineEmits(['toggle-sideMenu']);
const collapseMenu = () => emit('toggle-sideMenu');
</script>

<template>
  <div class="flex flex-col gap-y-5 px-6 mt-5 relative">
    <MoleculesDropDown />
    <OrganismsSidebarSection>
      <template #title> RESOURCES </template>
    </OrganismsSidebarSection>
    <OrganismsSidebarSection>
      <template #title> COMMUNITIES </template>
    </OrganismsSidebarSection>
    <OrganismsSidebarSection>
      <template #title> CUSTOME FEEDS </template>
    </OrganismsSidebarSection>
    <button
      @click="collapseMenu"
      class="absolute top-5 -right-4 bg-white rounded-full border-2 shadow-lg p-1 hover:bg-gray-100 transition z-50"
      aria-label="Close sidebar"
    >
      <Icon icon="material-symbols:menu-rounded" width="20" height="20" />
    </button>
  </div>
</template>
