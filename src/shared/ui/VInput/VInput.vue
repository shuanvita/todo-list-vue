<script setup lang="ts">
const modelValue = defineModel<string>()
</script>

<template>
  <input v-model="modelValue" class="px-4 py-2.5 text-foreground-muted border border-stroke rounded-full" type="text" />
</template>

<style scoped></style>
