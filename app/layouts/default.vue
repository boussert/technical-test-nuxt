<template>
  <main>
    <NavBar />
    <slot />
  </main>
</template>

<script setup lang="ts">
import NavBar from '~/components/NavBar/NavBar.vue';
</script>