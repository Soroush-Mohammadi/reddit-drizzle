<template>
  <aside class="flex flex-col px-4 py-3 gap-y-4 text-sm text-gray-800 relative">
    <!-- TOP NAV -->
    <nav class="flex flex-col gap-y-1">
      <MoleculesSideBarItem icon="material-symbols:home-rounded" label="Home" />
      <MoleculesSideBarItem
        icon="material-symbols:trending-up-rounded"
        label="Popular"
      />
      <MoleculesSideBarItem
        icon="material-symbols:explore-rounded"
        label="Explore"
      />
      <MoleculesSideBarItem
        icon="material-symbols:format-list-bulleted-rounded"
        label="All"
      />
    </nav>

    <AtomsDivider />

    <!-- ACTION -->
    <MoleculesSideBarItem
      icon="material-symbols:add-rounded"
      label="Start a community"
      class="font-medium"
    />

    <AtomsDivider />

    <!-- GAMES -->
    <OrganismsSidebarSection title="GAMES ON REDDIT" />

    <!-- CUSTOM FEEDS -->
    <OrganismsSidebarSection title="CUSTOM FEEDS">
      <MoleculesSideBarItem
        icon="material-symbols:add-rounded"
        label="Create Custom Feed"
      />
    </OrganismsSidebarSection>

    <!-- COMMUNITIES -->
    <OrganismsSidebarSection title="COMMUNITIES">
      <MoleculesSideBarItem
        icon="material-symbols:settings-outline-rounded"
        label="Manage Communities"
      />
    </OrganismsSidebarSection>

    <!-- RESOURCES -->
    <OrganismsSidebarSection title="RESOURCES">
      <MoleculesSideBarItem
        v-for="item in resources"
        :key="item.id"
        :icon="item.icon"
        :label="item.title"
      />
    </OrganismsSidebarSection>

    <!-- COLLAPSE BUTTON -->
    <button
      @click="collapseMenu"
      class="absolute top-4 -right-4 bg-white border rounded-full p-1 shadow hover:bg-gray-100"
    >
      <Icon icon="material-symbols:menu-rounded" width="20" height="20" />
    </button>
  </aside>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const emit = defineEmits(['toggle-sideMenu']);
const collapseMenu = () => emit('toggle-sideMenu');

const resources = [
  { id: 1, title: 'About Reddit', icon: 'material-symbols:info-outline' },
  { id: 2, title: 'Advertise', icon: 'material-symbols:campaign-outline' },
  { id: 3, title: 'Developer Platform', icon: 'material-symbols:code-rounded' },
  {
    id: 4,
    title: 'Reddit Pro',
    icon: 'material-symbols:workspace-premium-outline'
  }
];
</script>
