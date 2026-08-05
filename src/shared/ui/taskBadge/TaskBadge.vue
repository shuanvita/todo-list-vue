<script setup lang="ts">
defineProps({
  project: String,
  priority: String,
  dueDate: Date,
})
</script>

<template>
  <div class="font-body text-primary-foreground rounded-xl px-3 py-1 text-xs font-bold bg-primary">
    <slot />
  </div>
</template>

<style scoped></style>
