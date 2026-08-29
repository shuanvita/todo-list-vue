<script setup lang="ts">
import { useId } from 'vue'

withDefaults(
  defineProps<{
    label?: string
    type?: 'text' | 'number' | 'password' | 'email'
    name?: string
    disabled?: boolean
  }>(),
  {
    type: 'text',
    disabled: false,
  },
)

const modelValue = defineModel<string>()

defineOptions({
  inheritAttrs: false,
})

const uniqueId = useId()
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <label v-if="label" class="text-fg" :for="uniqueId">{{ label }}</label>
    <input
      class="placeholder:text-fg-muted focus:border-primary border-stroke h-full w-full border bg-transparent px-3 py-2 text-sm transition-colors duration-200 outline-none"
      v-bind="$attrs"
      :id="uniqueId"
      :name="name"
      v-model="modelValue"
      :type="type"
      :disabled="disabled"
    />
  </div>
</template>
