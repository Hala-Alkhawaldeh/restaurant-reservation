<template>
   <div
    class="max-w-full w-full min-h-screen h-full flex flex-col justify-between"
  >
    <div class="h-full">
    <Header />

    <main class=" min-h-screen">
      <slot />
    </main>
    </div>

    <Footer />
  </div>
  <base-snackbar />
</template>

<script setup lang="ts">
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import BaseSnackbar from '@/components/common/BaseSnackbar.vue';
</script>
