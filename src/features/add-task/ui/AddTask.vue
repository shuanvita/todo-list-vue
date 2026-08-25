<script setup lang="ts">
import { VInput } from '@/shared/ui/VInput'
import { VButton } from '@/shared/ui/VButton'
import VSvg from '@/shared/ui/VSvg'
import { useTasks, createTask } from '@/entities/task'
import { computed } from 'vue'

const store = useTasks()

const modelValue = defineModel<string>({ default: '' })
const isValid = computed(() => modelValue.value.trim().length > 0)

const onAddTask = () => {
  if (!isValid.value) return
  store.addTask(createTask(modelValue.value.trim()))
  modelValue.value = ''
}
</script>

<template>
  <form
    class="focus-within:border-primary border-stroke flex border transition-colors duration-200"
    @submit.prevent="onAddTask"
  >
    <VInput
      class="border-none focus:border-transparent"
      v-model="modelValue"
      placeholder="Новая задача..."
    />
    <VButton type="submit" :disabled="!isValid">
      <template #preIcon>
        <VSvg class="h-4 w-4" name="plus" />
      </template>
      <span>Добавить</span>
    </VButton>
  </form>
</template>

<style scoped></style>
