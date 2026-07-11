<script setup lang="ts">
import VSvg from '@/shared/ui/VSvg'
import { NavigationMenu } from '@/features/navigationMenu'
</script>

<template>
  <aside class="gradient px-3 py-8 text-white">
    <div class="mb-10 flex items-center gap-3 px-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/25">
        <VSvg class="h-5.5 w-5.5" name="logo" />
      </div>
      <div class="text-[20px]/[1.4] font-bold tracking-[-0.5px]">DoIt!</div>
    </div>
    <NavigationMenu />
  </aside>
</template>

<style scoped>
.gradient {
  background: linear-gradient(180deg, #7c3aed 0%, #a21caf 60%, #f72585 100%);
}
</style>
