<template>
    <ul class="bg-blue-500">
        <li class="flex justify-between">
            <slot name="title">
                <span>header</span>
            </slot>
            <Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" @click="toggleMenu" />
        </li>
        <ul class="flex flex-col gap-y-1 list-none" v-if="showMenu">
            <li v-for="item in subMenu" :key="item">{{ item }}</li>
        </ul>
    </ul>
</template>


<script setup>
import { Icon } from "@iconify/vue"
import { ref } from 'vue'
const subMenu = ['item-1', 'item-2', 'item-3']
const showMenu = ref(false)

const toggleMenu = () => showMenu.value = !showMenu.value

</script>