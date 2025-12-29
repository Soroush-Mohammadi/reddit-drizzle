<template>
  <div class="flex min-h-screen flex-col">
    <!-- ================= Header ================= -->
    <header class="flex h-20 items-center gap-4 px-4 text-white">
      <!-- Toggle button (mobile + desktop) -->

      <!-- Logo -->
      <div class="w-60">
        <AtomsLogo />
      </div>

      <!-- Search -->
      <div class="flex flex-1 justify-center">
        <MoleculesSearchBar class="w-full max-w-xl" />
      </div>

      <!-- App menu -->
      <MoleculesAppMenu class="flex items-center" />

      <!-- Login -->
      <AtomsLoginBtn />
    </header>

    <!-- ================= Body ================= -->

    <!-- Overlay (mobile only) -->

    <!-- Sidebar -->

    <!-- Main content -->
    <main
      class="grid grid-cols-17 transform transition-all duration-300 bg-red-400"
      :class="{
        'lg:-translate-x-65': !isSidebarOpen
      }"
    >
      <aside class="col-span-3 border">
        <TemplatesSideMenu @toggle-side-menu="toggleSidebar" />
      </aside>
      <div
        class="col-start-6 col-span-7 transform transition-all duration-300"
        :class="{
          'lg:col-start-7 lg:col-span-8': !isSidebarOpen
        }"
      >
        <slot />
      </div>
      <div
        class="col-start-14 col-span-3 w-70"
        :class="{
          'lg:col-start-16 overflow-x-visible': !isSidebarOpen
        }"
      >
        <MoleculesPopularCommuneties />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
