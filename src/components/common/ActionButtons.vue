<!-- components/common/ActionButton.vue -->
<template>
  <button
    @click.stop="$emit('click')"
    class="relative group  flex items-center justify-center w-8 h-8 bg-white shadow-md rounded-full text-white transition-colors duration-200"

  >
    <!-- Icon -->
    <slot>

    </slot>

    <!-- Tooltip -->
    <span
      v-if="tooltip"
      class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      {{ tooltip }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "blue",
  },
  tooltip: {
    type: String,
    default: "",
  },
})

defineEmits(["click"])

const colorClass = computed(() => {
  switch (props.color) {
    case "red":
      return "bg-red-500 hover:bg-red-600";
    case "green":
      return "bg-green-500 hover:bg-green-600";
    case "gray":
      return "bg-gray-500 hover:bg-gray-600";
      case"blue":
      return "bg-primary hover:bg-blue-600";
    default:
      return "bg-primary hover:bg-blue-600";
  }
})
</script>
