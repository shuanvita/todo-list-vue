<script setup lang="ts">
import { useId } from 'vue'
import VSvg from '@/shared/ui/VSvg'

defineProps<{
  disabled?: boolean
  error?: boolean
  errorMessage?: string
}>()

const uniqueId = useId()
const errorId = useId()
const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
  <div class="checkbox-wrapper">
    <div class="inline-flex items-center">
      <input
        :id="uniqueId"
        class="checkbox"
        type="checkbox"
        v-model="modelValue"
        :aria-invalid="error"
        :aria-describedby="error && errorMessage ? errorId : undefined"
        :disabled="disabled"
      />
      <label
        class="checkbox-label"
        :for="uniqueId"
        :class="{ 'is-disabled': disabled, 'is-error': error }"
      >
        <VSvg class="checkbox-icon" name="checked" aria-hidden="true" />
        <slot />
      </label>
    </div>
    <span v-if="error && errorMessage" :id="errorId" class="checkbox-error-text" role="alert">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
.checkbox-wrapper {
  --checkbox-size: 20px;
  --icon-size: 10px;
  --gap: 12px;
}

.checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-label {
  position: relative;
  padding-inline-start: calc(var(--checkbox-size) + var(--gap));
  cursor: pointer;
  font-size: 14px;
  word-break: break-word;
}

.checkbox-label.is-disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

.checkbox-label.is-error {
  color: var(--color-destructive);
}

.checkbox-label.is-error::before {
  box-shadow: inset 0 0 0 1px var(--color-destructive, red);
}

.checkbox-label::before {
  content: '';
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  box-shadow: inset 0 0 0 1px var(--color-stroke);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border-radius: 100%;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease;
}

.checkbox-label:not(.is-disabled):not(.is-error):hover::before {
  box-shadow: inset 0 0 0 1px var(--color-primary);
  background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.checkbox-label.is-error:not(.is-disabled):hover::before {
  box-shadow: inset 0 0 0 1px var(--color-destructive);
  background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
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

.checkbox:checked + .checkbox-label::before {
  box-shadow: none;
  background: var(--color-primary);
}

.checkbox:checked + .checkbox-label.is-error::before {
  box-shadow: none;
  background: var(--color-destructive, red);
}

.checkbox:checked + .checkbox-label .checkbox-icon {
  transform: translateY(-50%) scale(1);
}

.checkbox:focus-visible + .checkbox-label::before {
  outline: 1px solid var(--color-primary);
  outline-offset: 2px;
}

.checkbox:focus-visible + .checkbox-label.is-error::before {
  outline-color: var(--color-destructive);
}

.checkbox-error-text {
  display: block;
  margin-top: 4px;
  margin-inline-start: calc(var(--checkbox-size) + var(--gap));
  font-size: 12px;
  color: var(--color-destructive);
}
</style>
