<template>
  <div class="mt-10 border bg-white font-medium rounded-2xl p-3">
    <ul>
      <li
        class="flex space-x-3 items-center mb-4"
        v-for="item in communities"
        :key="item.id"
      >
        <div class="bg-orange-500 w-10 h-10 rounded-full"></div>
        <div>
          <p>{{ item.name }}</p>
          <span>{{ item.members }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const {
  data: communities,
  pending,
  error
} = await useFetch('/api/getCommunities/');

// const communityChunk = computed(() => communities.value.slice(0, 6));
</script>

<style lang="scss" scoped></style>
