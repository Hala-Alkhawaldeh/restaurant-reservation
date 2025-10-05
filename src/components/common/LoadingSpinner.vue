<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
    <div class="bg-primary p-4 rounded-lg shadow-lg flex flex-col items-center">
      <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f37d-fe0f.svg" alt="Logo" class=" animate-spin  h-12 w-12 mb-2"/>
      <p class="text-sm font-medium text-gray-500">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...',
  },
})
</script>
