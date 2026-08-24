<script setup lang="ts">
import { VCheckbox } from '@/shared/ui/VCheckbox'
import { formatDateShort } from '@/shared/lib/formatDate.ts'
import VSvg from '@/shared/ui/VSvg'
import { VButton } from '@/shared/ui/VButton'
import { useId } from 'vue'

const date = formatDateShort()
const checkboxId = useId()

defineProps<{
  isChecked?: boolean
  id: string
  label: string
}>()

defineEmits<{
  'delete-task': [id: string]
}>()
</script>

<template>
  <div
    class="border-stroke last:border-b-none group/row hover:bg-secondary/40 flex items-start justify-between gap-2 border-b p-4 transition-colors duration-100"
  >
    <div>
      <VCheckbox :id="checkboxId" class="mb-1" :label="label" />
      <div class="text-fg-muted mt-1 pl-[34px] text-xs tracking-wider uppercase">{{ date }}</div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-fg-muted/40 mt-0.5 shrink-0 text-xs tabular-nums">01</div>
      <VButton class="group/btn" variant="custom" @click="$emit('delete-task', checkboxId)">
        <template #icon>
          <VSvg
            class="text-fg-muted group-hover/btn:text-accent h-4 w-4 opacity-0 group-hover/row:opacity-100"
            name="delete"
          />
        </template>
      </VButton>
    </div>
  </div>
</template>

<style scoped></style>
