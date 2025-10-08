<template>
  <LoadingSpinner v-if="store.loading" :message="store.loadingMessage" />
  <main>
    <section class="banner relative">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1599458252573-56ae36120de1?ixlib=rb-4.0.3&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=3600"
        referrerpolicy="same-origin"
        class="object-cover rounded-none w-full h-[128vh] max-h-[300px] opacity-100 object-[center_69.54%]"
      />
    </section>
    <!-- Main Content -->
    <section class="p-4">
      <h1 class="text-2xl font-bold mb-4">Reservation</h1>

      <!-- Top actions -->
      <div class="flex justify-between mb-4">
        <button
          @click="openAddModal = true"
          class="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white md:text-base text-sm"
        >
          + Add Branches
        </button>

        <button
          @click="disableAll"
          class="px-4 py-2 border border-red-600 text-red-700 rounded hover:bg-red-700 hover:text-white md:text-base text-sm"
        >
          Disable All Reservations
        </button>
      </div>

      <branchs-list ref="branchs_table" />

      <!-- Modals -->
      <AddBranchModal
        v-if="openAddModal"
        @close="openAddModal = false"
        @added="loadBranches"
      />
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useBranchStore } from "../stores/branches";
import BranchsList from "../components/branches/BranchsList.vue";
import AddBranchModal from "../components/branches/AddBranchModal.vue";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

useHead({
  title: "Restaurant Reservation Management",
  meta: [
    {
      name: "description",
      content:
        "Manage your restaurant reservations efficiently with our reservation management system.",
    },
    {
      name: "keywords",
      content: "reservation, management, restaurant, bookings, tables",
    },
  ],
});

const store = useBranchStore();
const route = useRoute();
const router = useRouter();
const currentPage = ref(Number(route.query.page) || 1);
const openAddModal = ref(false);
const branchs_table = ref(null);

const disableAll = async () => {
  store.loadingMessage = "Disabling all reservations...";
  store.loading = true;
  try {
    for (const branch of store.open_reservations_branches) {
      await store.disableReservation(branch.id);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await store.loadBranches(store.meta.current_page, store.meta.per_page);
    store.loading = false;
    store.loadingMessage = "";
  }
};

onMounted(() => {
  router.replace({ query: { ...route.query, page: currentPage.value } });
});
</script>
