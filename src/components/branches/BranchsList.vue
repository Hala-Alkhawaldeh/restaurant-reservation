<template>
  <section id="reservations_table" class="w-full overflow-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th
            v-for="col in columns"
            :key="col.key"
            class="p-2 border bg-primary text-white text-start md:text-base text-sm"
          >
            {{ col.label }}
          </th>
          <th
            class="p-2 border bg-primary text-white text-start md:text-base text-sm"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="branch in branches"
          :key="branch.id"
          class="hover:bg-gray-100"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="p-2 border md:text-base text-sm min-w-[100px]"
          >
            {{ resolveValue(branch, col.key) }}
            {{ col.key === "reservation_duration" ? "Minutes" : "" }}
          </td>
          <td class="px-6 py-2 border flex gap-6">
            <action-buttons
              icon="edit"
              color="green"
              tooltip="Edit"
              @click="editBranch(branch)"
            >
              <img src="@/assets/icons/edit.svg" alt="Edit" class="w-6 h-6" />
            </action-buttons>
            <action-buttons
              icon="delete"
              color="red"
              tooltip="Disable Branch"
              @click="disable(branch.id)"
            >
              <img
                src="@/assets/icons/delete.svg"
                alt="Delete"
                class="w-6 h-6"
              />
            </action-buttons>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <!-- Pagination -->
  <div class="flex mt-4 space-x-2 items-center justify-center">
    <button
      @click="prevPage"
      :disabled="!prevLink || loading"
      class="px-3 py-1 border rounded disabled:opacity-50 bg-primary text-white"
    >
      Prev
    </button>
    <span class="px-3 py-1 border rounded text-primary"
      >Page {{ currentPage }}</span
    >
    <button
      @click="nextPage"
      :disabled="!nextLink || loading"
      class="px-3 py-1 border bg-primary text-white rounded disabled:opacity-50"
    >
      Next
    </button>

    <ReservationSettingsForm
      v-if="selectedBranch"
      :branch="selectedBranch"
      @close="selectedBranch = null"
      @saved="loadBranches"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBranchStore } from "../../stores/branches";
import ReservationSettingsForm from "./ReservationSettingsForm.vue";
import ActionButtons from "../common/ActionButtons.vue";
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const store = useBranchStore();
const selectedBranch = ref(null);
const loading = ref(false);
const currentPage = ref(Number(route.query.page) || 1);
const nextLink = ref(null);
const prevLink = ref(null);


const columns = [
  { key: "name", label: "Branch" },
  { key: "reference", label: "Reference" },
  { key: "tablesCount", label: "Number of Tables" },
  { key: "reservation_duration", label: "Reservation Duration" },
];


const branches = computed(() =>
  store.branches
    .filter((branch) => branch.accepts_reservations) // keep only branches that accept reservations
    .map((branch) => ({
      ...branch,
      tablesCount: branch.sections
        .flatMap((s) => s.tables)
        .filter((t) => t.accepts_reservations).length,
    }))
);

const resolveValue = (obj, key) => obj[key] ?? "";


const loadBranches = async (page =currentPage.value) => {
  store.loading = true;
  const res = await store.loadBranches(page);
  currentPage.value = res?.meta?.current_page ?? 1;
  nextLink.value = res?.links?.next ?? null;
  prevLink.value = res?.links?.prev ?? null;
  store.loading = false;
};

const editBranch = (branch) => {
  selectedBranch.value = JSON.parse(JSON.stringify(branch));
};

const disable = async (id) => {
  store.loadingMessage = "Disabling reservation...";
  store.loading = true;
  await store.disableReservation(id);
  await loadBranches(currentPage.value);
  store.loading = false;
};


const nextPage = () => {
  if (nextLink.value) {
     loadBranches(currentPage.value + 1);
     router.replace({ query: { ...route.query, page: currentPage.value + 1 } });
  }

};
const prevPage = () => {
  if (prevLink.value) {loadBranches(currentPage.value - 1);
    router.replace({ query: { ...route.query, page: currentPage.value - 1 } });
  }
};

onMounted(() => loadBranches());
</script>
