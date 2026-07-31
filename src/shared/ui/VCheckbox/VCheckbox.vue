<script setup lang="ts">
defineProps<{
  id: string
  label?: string
  disabled?: boolean
}>()

const modelValue = defineModel<boolean>()
</script>

<template>
  <input :id="id" v-model="modelValue" class="checkbox" type="checkbox" :disabled="disabled" />
  <label class="custom-checkbox" :for="id" :class="{ 'is-disabled': disabled }">
    <svg class="checkbox-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3.6923076923076925"
        d="M20 6L9 17l-5-5"
      />
    </svg>
    <span v-if="label" class="checkbox-label">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.custom-checkbox {
  position: relative;
  padding-inline-start: 30px;
  cursor: pointer;
}

.custom-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.custom-checkbox::before {
  content: '';
  width: 22px;
  height: 22px;
  box-shadow: inset 0 0 0 2px var(--color-stroke);
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease;
}

.checkbox-icon {
  position: absolute;
  top: 50%;
  left: 5px;
  width: 13px;
  height: 13px;
  transform: translateY(-50%) scale(0);
  transition: transform 0.15s ease;
  color: white;
  pointer-events: none;
}

.checkbox:checked + .custom-checkbox::before {
  box-shadow: none;
  background: linear-gradient(135deg, #7c3aed, #f72585);
}

.checkbox:checked + .custom-checkbox .checkbox-icon {
  transform: translateY(-50%) scale(1);
}

.checkbox:focus-visible + .custom-checkbox::before {
  outline: 2px solid var(--color-stroke);
  outline-offset: 2px;
}
</style>
