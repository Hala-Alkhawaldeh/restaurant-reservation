<template>
  <div
    class="add_branch_modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded w-96">
      <h2 class="text-xl font-bold mb-4">Enable Branch Reservations</h2>
      <div v-if="disabledBranches.length === 0" class="text-gray-500">
        All branches already have reservations enabled.
      </div>
      <div v-else class="space-y-2 max-h-64 overflow-auto">
        <div v-for="branch in disabledBranches" :key="branch.id">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="selectedIds" :value="branch.id" />
            <span>{{ branch.name }} ({{ branch.reference }})</span>
          </label>
        </div>
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="enableBranches"
          class="px-4 py-2 rounded bg-primary text-white hover:bg-primary"
          :class="{ 'opacity-50 cursor-not-allowed': selectedIds.length === 0 }"
          :disabled="selectedIds.length === 0"
        >
          Enable
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { ref, computed } from "vue";
import { useBranchStore } from "../../stores/branches";

const emit = defineEmits(["close", "added"]);

const store = useBranchStore();
const selectedIds = ref<string[]>([]);

const disabledBranches = computed(() =>
  store.branches.filter((b) => !b.accepts_reservations)
);
const pagination = {
  page: store.meta.current_page,
  per_page: store.meta.per_page,
};


const enableBranches = async () => {
  store.loadingMessage = "Adding branchs ...";
  for (const id of selectedIds.value) {
    await store.enableReservation(id);
  }
  await store.loadBranches(pagination.page , pagination.per_page);
  emit("added");
  emit("close");

  store.loadingMessage = "";
  store.loading = false;
};
</script>
