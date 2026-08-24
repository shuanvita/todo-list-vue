<script setup lang="ts">
import { TheHeader } from '@/widgets/the-header'
import { TasksList } from '@/widgets/task-list'
import { VCheckbox } from '@/shared/ui/VCheckbox'
</script>

<template>
  <div class="container">
    <TheHeader class="mb-11" />
    <TasksList />
    <VCheckbox label="dfsdfds" />
  </div>
</template>
