<script setup lang="ts">
import { TheHeader } from '@/widgets/the-header'
import { TasksList } from '@/widgets/task-list'
import { VButton } from '@/shared/ui/VButton'
import VSvg from '@/shared/ui/VSvg'
</script>

<template>
  <div class="container">
    <TheHeader class="mb-11" />
    <TasksList />
    <VButton class="h-8" variant="secondary">
      <template #preIcon>
        <VSvg class="h-4 w-4" name="plus" />
        Добавить
      </template>
    </VButton>
  </div>
</template>
