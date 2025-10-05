<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto p-4"
  >
    <div
      class="bg-white p-6 rounded w-full max-w-xl max-h-[600px] overflow-auto"
    >
      <h2 class="text-xl font-bold mb-4">
        Reservation Settings - {{ branch.name }}
      </h2>

      <div
        class="working-hours-alert mb-4 p-4 bg-secondary border-l-4 border-[#9d6109] text-[#9d6109]"
      >
        <p>
          branch's working hours {{ branch.opening_from }} -
          {{ branch.opening_to }}
        </p>
      </div>
      <!-- Duration -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold"
          >Reservation Duration (minutes) *</label
        >
        <input
          type="number"
          v-model.number="formData.duration"
          min="1"
          required
          class="w-full border px-2 py-1 rounded"
        />
      </div>

      <!-- Table selection -->
      <label class="flex mb-1 font-semibold">Tables</label>
      <SectionTable
        :sections="branch.sections"
        :selected="formData.selectedTable"
        @toggle="handleSelectTable"
      />

      <!-- Time slots -->
      <div class="my-4 space-y-4">
        <div v-for="(day, index) in days" :key="day">
          <div class="flex justify-between items-center mb-1 bg-primary/5 px-2">
            <span class="font-semibold">{{ day }}</span>
            <div class="flex items-center gap-2">
              <button
                @click="applySaturdayToAll(day)"
                v-if="day === 'Saturday'"
                class="px-4 py-1 text-sm bg-primary text-white rounded hover:bg-primary/80"
              >
                Apply to all days
              </button>

              <button
                @click="addTimeSlot(day, index)"
                class="px-2 py-1 my-2 text-sm border border-primary text-primary rounded hover:bg-primary/10"
                :disabled="formData.reservation_times[day].length >= 3"
              >
                +
              </button>
            </div>
          </div>

          <div class="">
            <TimeSlotInput
              ref="timeSlotInputRef"
              v-model="formData.reservation_times[day]"
              :day="day"
              :duration="formData.duration"
              @remove="removeSlot(day, $event , index)"
              @isValid="isValid = $event"
            />
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="save"
          class="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80"
          :class="{ 'opacity-50 cursor-not-allowed': !isValid }"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TimeSlotInput from "./TimeInput.vue";
import { useBranchStore } from "../../stores/branches";
import SectionTable from "./SectionTables.vue";
import { useSnackbar } from "@/composables/useSnackbar";

const { showSuccess, showError } = useSnackbar();
const props = defineProps({
  branch: { type: Object, required: true },
});

const emit = defineEmits(["close", "saved"]);

const branchStore = useBranchStore();
const tablesList = ref([]);
const isValid = ref(true);
const timeSlotInputRef = ref(null);
const reservationTimes = ref(props.branch.reservation_times || {});

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const formData = ref({
  duration: props.branch.reservation_duration || 60,
  selectedTable: [],
  reservation_times: Object.fromEntries(days.map((day) => [day, []])),
});

onMounted(() => {
  initTables();
  initReservationTimes();
});

const initTables = () => {
  tablesList.value = props.branch.sections.flatMap((section) =>
    section.tables.map((t) => ({
      id: t.id,
      name: t.name,
      section: section.name,
      accepts_reservations: t.accepts_reservations,
    }))
  );

  formData.value.selectedTable = tablesList.value
    .filter((t) => t.accepts_reservations)
    .map((t) => t.id);
};

const initReservationTimes = () => {
  if (reservationTimes.value) {
    for (const [dayKey, slots] of Object.entries(reservationTimes.value)) {
      // Capitalize day name (e.g., "monday" → "Monday")
      const normalizedDay = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
      if (formData.value.reservation_times[normalizedDay]) {
        formData.value.reservation_times[normalizedDay] = slots;
      }
    }
  }
};

const handleSelectTable = (id) => {
  const selected = formData.value.selectedTable;
  const index = selected.indexOf(id);

  if (index === -1) {
    selected.push(id);
  } else {
    selected.splice(index, 1);
  }
};

const addTimeSlot = (day, index) => {
  const slots = formData.value.reservation_times[day];

  if (slots.length >= 3) return;

  let newSlot;
  if (slots.length === 0) {
    newSlot = ["12:00", "13:00"];
  } else {
    const [lastStart, lastEnd] = slots[slots.length - 1];
    const [h, m] = lastEnd.split(":").map(Number);

    // add 1 hour after last slot end
    const newStartH = h;
    const newStartM = m;
    let newEndH = h + 1;
    const newEndM = m;

    if (newEndH > 23) newEndH = 23;

    const pad = (num) => String(num).padStart(2, "0");
    newSlot = [
      `${pad(newStartH)}:${pad(newStartM)}`,
      `${pad(newEndH)}:${pad(newEndM)}`,
    ];
  }

  slots.push(newSlot);

  timeSlotInputRef.value[index].validateAll();
};

const removeSlot = (day, slotIndex , dayIndex) => {
  formData.value.reservation_times[day].splice(slotIndex, 1);
  timeSlotInputRef.value[dayIndex].validateAll();
};

const applySaturdayToAll = () => {
  // get sutarday slots
  const saturdaySlots = formData.value.reservation_times["Saturday"];
  for (const d of days) {
    if (d !== "Saturday") {
      formData.value.reservation_times[d] = [...saturdaySlots];
    }
  }
};

const save = async () => {
  // if (!formData.value.selectedTable) {
  //   alert("Please select a table.");
  //   return;
  // }

  if (!isValid.value) {
    return;
  }
  if (formData.value.duration < 1) {
    showError("Reservation duration must be at least 1 minute.");
    return;
  }

  //  Convert day names back to lowercase for API
  const formattedTimes = Object.fromEntries(
    Object.entries(formData.value.reservation_times).map(([day, slots]) => [
      day.toLowerCase(),
      slots,
    ])
  );

  await branchStore.updateReservationSettings(props.branch.id, {
    reservation_duration: formData.value.duration,
    reservation_times: formattedTimes,
    table_ids: formData.value.selectedTable,
  });
  if (!branchStore.error) {
    showSuccess("Reservation settings saved successfully!");
    emit("saved");
    emit("close");
  } else {
    showError("Failed to save reservation settings: " + branchStore.error);
  }
};
</script>

<style scoped>
.table-selected {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}
</style>
