<template>
  <main>
    <Navbar />
    <slot />
  </main>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar/Navbar.vue';
</script>