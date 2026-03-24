<template>
  <v-text-field
    v-model="searchQuery"
    prepend-inner-icon="$search"
    label="Rechercher un film"
    type="search"
    clearable
    hide-details
    variant="underlined"
    @update:model-value="updateMovieSearch"
    @click:clear="resetSearchQuery"
  />
</template>

<script lang="ts" setup>
const emit = defineEmits(['update-search']);
const searchQuery = ref('');

const updateMovieSearch = () => {
  // If there is no value (after clearing the field), searchQuery will be null, and we want to avoid sending null values
  emit("update-search", searchQuery.value ?? '');
}

const resetSearchQuery = () => {
  searchQuery.value = '';
}
</script>
