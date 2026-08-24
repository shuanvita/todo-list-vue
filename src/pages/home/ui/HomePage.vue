<script setup lang="ts">
import { TheHeader } from '@/widgets/the-header'
import { TasksList } from '@/widgets/task-list'
import { TaskItem } from '@/entities/task'
</script>

<template>
  <div class="container">
    <TheHeader class="mb-11" />
    <TasksList />
    <TaskItem
      id="sdfsdfsd-sdfsdf"
      label="Написать unit-тесты для модуля оплаты"
      @delete-task="() => console.log('delete-task')"
    />
  </div>
</template>
