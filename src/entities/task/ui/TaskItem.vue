<script setup lang="ts">
import type { TaskItemProps } from '@/entities/task'

defineProps<TaskItemProps>()
</script>

<template>
  <div>{{ text }}</div>
</template>

<style scoped></style>
