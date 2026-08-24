<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  label: string
  disabled?: boolean
}>()

const uniqueId = useId()
const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
  <div class="inline-flex items-center">
    <input
      :id="uniqueId"
      v-model="modelValue"
      class="checkbox"
      type="checkbox"
      :disabled="disabled"
    />
    <label class="custom-checkbox" :for="uniqueId" :class="{ 'is-disabled': disabled }">
      <svg
        class="checkbox-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<style scoped>
.checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.custom-checkbox {
  --checkbox-size: 18px;
  --icon-size: 13px;
  --gap: 16px;

  position: relative;
  padding-inline-start: calc(var(--checkbox-size) + var(--gap));
  cursor: pointer;
  font-size: 14px;
  word-break: break-word;
}

.custom-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.custom-checkbox::before {
  content: '';
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  box-shadow: inset 0 0 0 1px var(--color-stroke);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease;
}

.custom-checkbox:not(.is-disabled):hover::before {
  box-shadow: inset 0 0 0 1px var(--color-primary);
}

.checkbox-icon {
  position: absolute;
  top: 50%;
  left: calc((var(--checkbox-size) - var(--icon-size)) / 2);
  width: var(--icon-size);
  height: var(--icon-size);
  transform: translateY(-50%) scale(0);
  transition: transform 0.15s ease;
  color: var(--color-fg-primary);
  pointer-events: none;
}

.checkbox:checked + .custom-checkbox::before {
  box-shadow: none;
  background: var(--color-primary);
}

.checkbox:checked + .custom-checkbox .checkbox-icon {
  transform: translateY(-50%) scale(1);
}

.checkbox:focus-visible + .custom-checkbox::before {
  outline: 1px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
