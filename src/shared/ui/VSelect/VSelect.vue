<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useId, useTemplateRef } from 'vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'
import VSvg from '@/shared/ui/VSvg'

export interface VSelectOption {
  label: string
  value: string
}

/**
 * Кастомный select с поддержкой клавиатурной навигации и accessible-паттерном combobox.
 *
 * @example
 * <VSelect
 *   v-model="status"
 *   label="Статус"
 *   :options="[{ label: 'Открыта', value: 'open' }, { label: 'Закрыта', value: 'closed' }]"
 * />
 */
const props = withDefaults(
  defineProps<{
    options: VSelectOption[]
    label?: string
    placeholder?: string
    error?: boolean
    errorMessage?: string
    disabled?: boolean
  }>(),
  {
    placeholder: 'Выберите значение',
    disabled: false,
  },
)

const modelValue = defineModel<string | null>({ default: null })

const uniqueId = useId()
const errorId = useId()
const listboxId = useId()

const isOpen = ref(false)
const highlightedIndex = ref(-1)

const rootRef = useTemplateRef<HTMLElement>('root')
const triggerRef = useTemplateRef<HTMLButtonElement>('trigger')
const optionRefs = ref<(HTMLLIElement | null)[]>([])

const selectedOption = computed(
  () => props.options.find((o) => o.value === modelValue.value) ?? null,
)

const triggerClass = computed(() =>
  twMerge(
    'flex w-full items-center justify-between gap-2 rounded-lg border bg-transparent px-4 py-2.5 text-sm text-fg transition-colors duration-200 outline-none border-stroke focus-visible:ring-2 focus-visible:ring-primary/10 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-40',
    props.error &&
      'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10',
  ),
)

function open() {
  if (props.disabled) return
  isOpen.value = true
  highlightedIndex.value = Math.max(
    0,
    props.options.findIndex((o) => o.value === modelValue.value),
  )
  nextTick(() => scrollHighlightedIntoView())
}

function close() {
  isOpen.value = false
  highlightedIndex.value = -1
}

function toggle() {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

function selectOption(option: VSelectOption) {
  modelValue.value = option.value
  close()
  triggerRef.value?.focus()
}

function scrollHighlightedIntoView() {
  optionRefs.value[highlightedIndex.value]?.scrollIntoView({ block: 'nearest' })
}

function moveHighlight(delta: number) {
  if (!isOpen.value) {
    open()
    return
  }
  const count = props.options.length
  if (count === 0) return

  highlightedIndex.value = (highlightedIndex.value + delta + count) % count
  nextTick(() => scrollHighlightedIntoView())
}

function confirmHighlighted() {
  if (!isOpen.value) {
    open()
    return
  }
  const option = props.options[highlightedIndex.value]
  if (option) selectOption(option)
}

onClickOutside(rootRef, () => close())

onKeyStroke('ArrowDown', (e) => {
  if (document.activeElement !== triggerRef.value) return
  e.preventDefault()
  moveHighlight(1)
})

onKeyStroke('ArrowUp', (e) => {
  if (document.activeElement !== triggerRef.value) return
  e.preventDefault()
  moveHighlight(-1)
})

onKeyStroke('Enter', (e) => {
  if (document.activeElement !== triggerRef.value) return
  e.preventDefault()
  confirmHighlighted()
})

onKeyStroke(' ', (e) => {
  if (document.activeElement !== triggerRef.value) return
  e.preventDefault()
  confirmHighlighted()
})

onKeyStroke('Escape', () => {
  if (isOpen.value) close()
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) close()
  },
)
</script>

<template>
  <div ref="root" class="flex w-full flex-col gap-2">
    <label v-if="label" class="text-fg text-sm" :for="uniqueId">{{ label }}</label>

    <div class="relative">
      <button
        ref="trigger"
        :id="uniqueId"
        type="button"
        role="combobox"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        :aria-controls="listboxId"
        :aria-invalid="error || undefined"
        :aria-describedby="error && errorMessage ? errorId : undefined"
        :disabled="disabled"
        :class="triggerClass"
        @click="toggle"
      >
        <span :class="selectedOption ? 'text-fg' : 'text-fg-muted'">
          {{ selectedOption?.label ?? placeholder }}
        </span>
        <VSvg
          name="chevron-down"
          class="h-4 w-4 shrink-0 transition-transform duration-150"
          :class="{ 'rotate-180': isOpen }"
        />
      </button>

      <ul
        v-if="isOpen"
        :id="listboxId"
        role="listbox"
        :aria-activedescendant="
          highlightedIndex >= 0 ? `${listboxId}-${highlightedIndex}` : undefined
        "
        class="border-stroke bg-bg absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border py-1 shadow-lg"
      >
        <li
          v-for="(option, index) in options"
          :id="`${listboxId}-${index}`"
          :key="option.value"
          :ref="(el) => (optionRefs[index] = el as HTMLLIElement)"
          role="option"
          :aria-selected="option.value === modelValue"
          class="text-fg cursor-pointer px-4 py-2 text-sm"
          :class="{
            'bg-primary/10': index === highlightedIndex,
            'font-medium': option.value === modelValue,
          }"
          @click="selectOption(option)"
          @mouseenter="highlightedIndex = index"
        >
          {{ option.label }}
        </li>

        <li v-if="options.length === 0" class="text-fg-muted px-4 py-2 text-sm">Нет вариантов</li>
      </ul>
    </div>

    <span v-if="error && errorMessage" :id="errorId" class="text-destructive text-xs" role="alert">
      {{ errorMessage }}
    </span>
  </div>
</template>
