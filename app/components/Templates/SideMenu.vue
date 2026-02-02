<template>
  <div class="flex flex-col gap-y-5 px-6 mt-5 relative">
    <MoleculesDropDown />
    <OrganismsSidebarSection :sub-items="resources">
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

<script setup>
import { Icon } from '@iconify/vue';
const emit = defineEmits(['toggle-sideMenu']);
const collapseMenu = () => emit('toggle-sideMenu');

const resources = ref([
  {
    id: 1,
    title: 'About Reddit',
    icon: 'teapot', // Or e.g., "InfoOutlineIcon"
    link: '/about'
  },
  {
    id: 2,
    title: 'Advertise',
    icon: 'megaphone', // Announcement/speaker icon
    link: '/advertise'
  },
  {
    id: 3,
    title: 'Developer Platform',
    icon: 'code-brackets', // Cube or API-like icon
    link: '/developers'
  },
  {
    id: 4,
    title: 'Reddit Pro BETA',
    icon: 'gift', // Gift/box icon with BETA tag
    link: '/pro'
  },
  {
    id: 5,
    title: 'Help',
    icon: 'question-mark', // Help/question circle
    link: '/help'
  },
  {
    id: 6,
    title: 'Blog',
    icon: 'book-open', // Open book icon
    link: '/blog'
  },
  {
    id: 7,
    title: 'Careers',
    icon: 'briefcase', // Suitcase/briefcase icon
    link: '/careers'
  },
  {
    id: 8,
    title: 'Press',
    icon: 'microphone', // Mic/press icon
    link: '/press'
  }
]);
</script>
