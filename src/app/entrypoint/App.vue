<script setup lang="ts">
import { SidebarNav } from '@/widgets/sidebarNav'
import { TheHeader } from '@/widgets/theHeader'
</script>

<template>
  <div class="grid h-screen grid-cols-[240px_1fr]">
    <SidebarNav />
    <div class="pt-8 px-10 flex flex-col space-y-8">
      <TheHeader />
      <RouterView />
    </div>
  </div>
</template>
