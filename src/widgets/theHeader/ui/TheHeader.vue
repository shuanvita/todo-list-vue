<script setup lang="ts">
import VButton from '@/shared/ui/VButton/VButton.vue'
import { useRoute } from 'vue-router'

const router = useRoute()
</script>

<template>
  <header class="flex items-center justify-between gap-3">
    <div>
      <h2 class="mb-1 text-[30px] font-bold">{{ router.meta.title }}</h2>
      <div class="text-foreground-muted text-[14px]">{{ router.meta.subtitle }}</div>
    </div>
    <div class="flex items-center justify-between gap-3">
      <input placeholder="Search tasks..." type="text" />
      <VButton>+</VButton>
      <VButton>Add Task</VButton>
    </div>
  </header>
</template>

<style scoped></style>
