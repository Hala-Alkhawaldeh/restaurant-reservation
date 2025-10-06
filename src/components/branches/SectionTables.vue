<template>
  <div class="bg-gray-200 p-4 rounded-md">
    <div v-if="sections.length === 0" class="text-center text-gray-500">
      No Tables available.
    </div>
    <div
      v-for="section in sections"
      :key="section.id"
      class="mb-6 border-b pb-3 last:border-none"
    >
      <h3 class="text-md font-semibold mb-3 flex items-center gap-2">
        <span v-html="getSectionIcon(section.name)" />
        {{ section.name }}
      </h3>

      <div class="flex flex-wrap gap-3">
        <div
          v-for="table in section.tables"
          :key="table.id"
          :class="[
            'px-4 py-2 cursor-pointer text-sm border rounded-full transition-all duration-200 shadow-sm select-none',
            selected.includes(table.id)
              ? 'bg-primary text-white border-primary scale-105 shadow-md'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-primary/10 hover:scale-105',
          ]"
        >
          {{ table.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Section } from "@/types";


const props = defineProps<{
  sections: Section[];
  selected: string[];
}>();


const emit = defineEmits<{
  (e: "toggle", tableId: string): void;
}>();

const getSectionIcon = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("terrace")) return "🌿";
  if (lower.includes("lounge")) return "🪑";
  if (lower.includes("bar")) return "🍸";
  if (lower.includes("indoor")) return "🍽";
  return "🪑";
};
</script>
