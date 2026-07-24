<script setup lang="ts">
import { useRoute } from 'vue-router'

const router = useRoute()
</script>

<template>
  <header>
    {{ router.meta.title }}
    {{ router.meta.subtitle }}
  </header>
</template>

<style scoped></style>
