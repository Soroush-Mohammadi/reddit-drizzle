<template>
  <div class="flex min-h-screen flex-col">
    <!-- ================= Header ================= -->
    <header
      class="flex justify-between border-b h-16 items-center gap-4 px-4 sticky top-0 bg-white"
    >
      <!-- Toggle button (mobile + desktop) -->

      <div class="xl:hidden">
        <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
      </div>

      <!-- Logo -->
      <div class="hidden lg:block xl:justify-self-start ml-3 xl:ml-0">
        <AtomsLogo />
      </div>

      <!-- Search -->
      <div class="md:flex md:flex-1 justify-center">
        <MoleculesSearchBar class="w-full max-w-xl" />
      </div>

      <!-- App menu -->
      <MoleculesAppMenu class="md:flex items-center hidden" />

      <!-- Login -->
      <AtomsLoginBtn />
    </header>

    <!-- ================= Body ================= -->

    <!-- Overlay (mobile only) -->

    <!-- Sidebar -->

    <!-- Main content -->
    <main
      class="grid grid-cols-12 transform transition-all duration-300"
      :class="{
        'lg:-translate-x-65': !isSidebarOpen
      }"
    >
      <aside
        class="hidden md:col-start-1 xl:block xl:col-start-1 xl:col-span-2 border-r h-screen sticky left-0 top-16"
      >
        <TemplatesSideMenu @toggle-side-menu="toggleSidebar" />
      </aside>
      <div
        class="col-start-1 col-end-18 md:col-span-12 lg:col-start-1 lg:col-span-7 xl:col-start-4 xl:col-span-6 transform transition-all duration-300"
        :class="{
          'lg:col-start-7 lg:col-span-8': !isSidebarOpen
        }"
      >
        <slot />
      </div>
      <div
        class="hidden md:col-start-14 md:col-span-3 w-70 bg-yellow-300"
        :class="{
          'lg:col-start-16 overflow-x-visible': !isSidebarOpen
        }"
      ></div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
