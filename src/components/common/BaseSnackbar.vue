<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white text-sm z-50',
        colorClass,
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useSnackbar } from "@/composables/useSnackbar"

const { visible, message, color } = useSnackbar()

const colorClass = computed(() => {
  switch (color.value) {
    case "error":
      return "bg-red-600"
    case "warning":
      return "bg-yellow-600"
    case "info":
      return "bg-blue-600"
    default:
      return "bg-green-600"
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
