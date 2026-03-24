<template>
  <header
    class="flex flex-wrap align-center justify-space-between ga-4 pa-8 min-h-[80px]"
    style="background-color: var(--clr-surface-a10);"
  >
    <NuxtLink to="/">
      <img
        src="/img/hellocse.svg"
        alt="Logo Hello CSE"
      >
    </NuxtLink>
    <MovieSearch
      v-if="isHomePage"
      class="max-w-96 min-w-64"
      @update-search="updateSearch"
    />
  </header>
</template>

<script lang="ts" setup>
import MovieSearch from '~/components/MovieSearch/MovieSearch.vue';
import { useMoviesStore } from '~/store/movies';
import { useRoute } from 'vue-router';

const moviesStore = useMoviesStore();
const config = useRuntimeConfig();
const tmdbHeaderAuth = config.public.tmdbHeaderAuth;
const route = useRoute();

const isHomePage = computed(() => route.path === '/');

const updateSearch = (query: string) => {
  moviesStore.updateSearchQuery(tmdbHeaderAuth, query);
}
</script>