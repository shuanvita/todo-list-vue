<script setup lang="ts">
import VButton from '@/shared/ui/VButton/VButton.vue'
import { useRoute } from 'vue-router'
import VSvg from '@/shared/ui/VSvg'
import { VInput } from '@/shared/ui/VInput'
import { VModal } from '@/shared/ui/VModal'
import { ref } from 'vue'

const router = useRoute()
const open = ref(false)
</script>

<template>
  <header class="flex items-center justify-between gap-3">
    <div>
      <h2 class="mb-1 text-[30px] font-bold">{{ router.meta.title }}</h2>
      <div class="text-foreground-muted text-[14px]">{{ router.meta.subtitle }}</div>
    </div>
    <div class="flex items-center justify-between gap-3">
      <VInput placeholder="Search tasks..." />
      <VButton icon="bell" />
      <VButton variant="primary" @click="open = true">
        <VModal :is-open="open" />
        <VSvg class="h-4 w-4" name="plus" />
        Add Task</VButton
      >
    </div>
  </header>
</template>

<style scoped></style>
