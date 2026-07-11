<script setup lang="ts">
import { SidebarNav } from '@/widgets/sidebarNav'
</script>

<template>
  <div class="grid grid-cols-[240px_1fr] h-screen">
    <SidebarNav />
    <RouterView />
  </div>
</template>
