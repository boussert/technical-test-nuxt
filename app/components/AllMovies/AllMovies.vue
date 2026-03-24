<template>
  <div class="flex flex-wrap ga-4 align-center justify-space-between">
    <h2
      v-if="!isSearchMode"
      class="text-headline-medium mb-8"
    >
      Films actuellement au cinéma
    </h2>
  </div>
  <MovieCardList :movies="displayedMovies" />

  <div ref="infiniteLoaderRef">
    <p v-if="moviesStore.loading">
      Chargement...
    </p>
  </div>

  <p v-if="!moviesStore.loading && displayedMovies.length === 0 && isSearchMode">
    Aucun film trouvé pour "{{ moviesStore.searchQuery }}"
  </p>
</template>

<script lang="ts" setup>
import MovieCardList from '~/components/MovieCardList/MovieCardList.vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useMoviesStore } from '~/store/movies';

const moviesStore = useMoviesStore();
const config = useRuntimeConfig();
const tmdbHeaderAuth = config.public.tmdbHeaderAuth;
const infiniteLoaderRef = ref(null);

onMounted(() => {
  moviesStore.fetchNextPageMovies(tmdbHeaderAuth);
});

// Fetch next page of movies each time we are at the end of the list
const { stop } = useIntersectionObserver(
  infiniteLoaderRef,
  ([entry]) => {
    if (!entry?.isIntersecting || moviesStore.loading) return;

    if (isSearchMode.value) {
      if (moviesStore.hasMoreSearchPages) {
        moviesStore.searchMovie(tmdbHeaderAuth);
      }
    } else {
      if (moviesStore.hasMoreNowPlayingPages) {
        moviesStore.fetchNextPageMovies(tmdbHeaderAuth);
      }
    }
  },
  { rootMargin: '200px' }
);
onUnmounted(() => stop());

const isSearchMode = computed(() => {
  return moviesStore.searchQuery.length >= moviesStore.MOVIE_QUERY_MIN_LENGTH;
});

const displayedMovies = computed(() => {
  return isSearchMode.value ? moviesStore.moviesSearch : moviesStore.moviesNowPlaying;
});
</script>
