<script setup lang="ts">
import type { NavigationMenuItem } from '../model/NavigationMenu.types.ts'
import VSvg from '@/shared/ui/VSvg'
import { computed, type ComputedRef } from 'vue'

const navigationMenu: ComputedRef<NavigationMenuItem[]> = computed(() => [
  {
    path: '/',
    icon: 'dashboard',
    text: 'Dashboard',
  },
  {
    path: '/tasks',
    icon: 'tasks',
    text: 'All Tasks',
  },
  {
    path: '/calendar',
    icon: 'calendar',
    text: 'Calendar',
  },
  {
    path: '/saved',
    icon: 'saved',
    text: 'Saved',
  },
  {
    path: '/settings',
    icon: 'settings',
    text: 'Settings',
  },
])
</script>

<template>
  <nav>
    <ul class="flex flex-col gap-1">
      <li v-for="(item, idx) in navigationMenu" :key="`navigation-menu-item-${idx}`">
        <RouterLink
          exact-active-class="text-primary bg-primary-foreground hover:bg-primary-foreground!"
          class="flex items-center gap-3 rounded-[20px] px-4 py-3 text-sm font-semibold transition hover:bg-white/25"
          :to="item.path"
        >
          <VSvg class="h-4.5 w-4.5" :name="item.icon" />
          <div>{{ item.text }}</div>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
