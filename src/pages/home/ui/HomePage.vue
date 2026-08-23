<script setup lang="ts">
import { TheHeader } from '@/widgets/the-header'
import { TasksList } from '@/widgets/task-list'
import { VInput } from '@/shared/ui/VInput'
</script>

<template>
  <div class="container">
    <TheHeader class="mb-11" />
    <TasksList />
  </div>
</template>
