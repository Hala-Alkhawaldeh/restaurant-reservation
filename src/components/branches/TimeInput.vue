<template>
  <div v-if="slots.length === 0" class="text-primary text-sm italic m-2 ">
    No time slots added. Please add a time slot.
  </div>
  <div v-else v-for="(slot, index) in slots" :key="index">
    <div class="flex items-center justify-between gap-2 m-2">
      <div class="flex items-center gap-2">
        <!-- Start time -->
        <input
          type="time"
          v-model="slots[index][0]"
          @change="validateAll"
          class="border rounded px-2 py-1 md:w-32 w-24"
        />

        <span>→</span>

        <!-- End time -->
        <input
          type="time"
          v-model="slots[index][1]"
          @change="validateAll"
          class="border rounded px-2 py-1 md:w-32 w-24"
        />
      </div>

      <!-- Remove button -->
      <button @click="$emit('remove', index)" class="text-red-500">
        <img src="@/assets/icons/delete.svg" alt="Delete" class="w-5 h-5" />
      </button>
    </div>

    <!-- Error -->
    <p v-if="errors[index]" class="text-red-500 text-xs mx-2">
      {{ errors[index] }}
    </p>
  </div>
</template>

<script setup>
import { ref,  computed , watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "remove",
  "isValid",
  "update:isValid",
]);
const errors = ref([]);

const slots = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});


const getMinutesDiff = (start, end) => {
  const [h1, m1] = start.split(":").map(Number);
  const [h2, m2] = end.split(":").map(Number);
  return h2 * 60 + m2 - (h1 * 60 + m1);
};

const validateAll = () => {
  const sortedSlots = [...slots.value].sort((a, b) => a[0].localeCompare(b[0]));

  errors.value = slots.value.map((slot, index) => {
    const [start, end] = slot;

    if (!start || !end) {
      emit("isValid", false);
      return "Both times are required";
    }
    if (start >= end) {
      emit("isValid", false);
      return "Start must be before end";
    }

    const diff = getMinutesDiff(start, end);
    if (diff < props.duration) {
      emit("isValid", false);
      return `Time slot must be at least ${props.duration} minutes long`;
    }
    if (index > 0) {
      const [prevStart, prevEnd] = sortedSlots[index - 1];
      if (start < prevEnd) {
        emit("isValid", false);
        return "This time slot overlaps with the previous slot";
      }
    }

    emit("isValid", true);
    return "";
  });
};

defineExpose({
  validateAll,
});

// watch(slots, validateAll, { deep: true, immediate: true })
</script>
