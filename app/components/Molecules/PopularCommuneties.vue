<template>
  <div class="mt-10 border bg-white font-medium rounded-2xl p-3">
    <ul>
      <li
        class="flex space-x-3 items-center mb-4"
        v-for="item in popularCommunities"
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
const popularCommunities = [
  {
    id: 1,
    name: 'r/AskReddit',
    members: 57420865
  },
  {
    id: 2,
    name: 'r/leagueoflegends',
    members: 8137940
  },
  {
    id: 3,
    name: 'r/OutOfTheLoop',
    members: 3638703
  },
  {
    id: 4,
    name: 'r/discordapp',
    members: 1475422
  },
  {
    id: 5,
    name: 'r/Twitch',
    members: 2852001
  }
];
</script>

<style lang="scss" scoped></style>
