<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(false)

defineProps({
  isOpen: Boolean,
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="bg-card modal w-full max-w-md rounded-2xl p-6 shadow-lg">
        <p>Привет из модального окна!</p>
        <button @click="open = false">Закрыть</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
