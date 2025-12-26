<template>
  <div
    class="absolute right-0 top-18 w-80 bg-white shadow-2xl rounded-lg overflow-hidden text-gray-800"
  >
    <!-- Profile Header -->
    <div
      class="bg-gray-100 px-6 py-4 flex items-center gap-4 border-b border-gray-200"
    >
      <div
        class="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center"
      >
        <!-- Placeholder for user avatar (pink circle with default Reddit-like style) -->
        <svg
          class="w-10 h-10 text-pink-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      </div>
      <div>
        <a href="#" class="text-lg font-medium hover:underline"
          >u/Tricky-Chapter3013</a
        >
        <p class="text-sm text-gray-500">View Profile</p>
      </div>
    </div>

    <!-- Menu Items -->
    <ul class="divide-y divide-gray-200">
      <!-- Edit Avatar -->
      <li v-for="item in menu" :key="item.id">
        <button
          class="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition"
        >
          <Icon :icon="item.icon" width="20" height="20" />
          <span class="text-base">{{ item.name }}</span>
        </button>
      </li>

      <!-- Drafts -->
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const menu = [
  {
    id: 'edit-avatar',
    name: 'Edit Avatar',
    icon: 'mdi:user'
  },
  {
    id: 'drafts',
    name: 'Drafts',
    icon: 'quill:paper'
  },
  {
    id: 'achievements',
    name: 'Achievements',
    icon: 'fluent:hat-graduation-20-regular'
  },
  {
    id: 'earn',
    name: 'Earn',
    icon: 'solar:dollar-linear'
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: 'fluent:premium-20-regular'
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    icon: 'si:moon-line'
  },
  {
    id: 'log-out',
    name: 'Log Out',
    icon: 'ci:log-out'
  },
  {
    id: 'advertise',
    name: 'Advertise On Reddit',
    icon: 'ri:advertisement-line'
  },
  {
    id: 'reddit-pro',
    name: 'Try Reddit Pro',
    icon: 'bytesize:lightning'
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: 'material-symbols-light:settings-outline'
  }
];

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  // Here you could emit an event or use a store to apply dark mode globally
  console.log('Dark Mode:', isDarkMode.value ? 'On' : 'Off');
}
</script>
