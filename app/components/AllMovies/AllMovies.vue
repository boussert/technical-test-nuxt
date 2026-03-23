<template>
    <h2>Films actuellement au cinéma</h2>
    <MovieSearch @update-search="updateSearch" />
    <MovieCardList :movies="displayedMovies" />

    <div ref="infiniteLoaderRef">
      <p v-if="moviesStore.loading">
        Chargement...
      </p>
    </div>

    <p v-if="!moviesStore.loading && displayedMovies.length === 0 && isSearchMode">
      Aucun film trouvé pour "{{ searchQuery }}"
    </p>
</template>

<script lang="ts" setup>
import MovieCardList from '~/components/MovieCardList/MovieCardList.vue';
import MovieSearch from '~/components/MovieSearch/MovieSearch.vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useMoviesStore } from '~/store/movies';

const moviesStore = useMoviesStore();
const config = useRuntimeConfig();
const tmdbHeaderAuth = config.public.tmdbHeaderAuth;
const infiniteLoaderRef = ref(null);

const searchQuery = ref('');

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
        moviesStore.searchMovie(tmdbHeaderAuth, searchQuery.value);
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

const updateSearch = (query: string) => {
  searchQuery.value = query;
  moviesStore.searchMovie(tmdbHeaderAuth, searchQuery.value);
}

const isSearchMode = computed(() => {
  return searchQuery.value?.length >= moviesStore.MOVIE_QUERY_MIN_LENGTH;
});

const displayedMovies = computed(() => {
  return isSearchMode.value ? moviesStore.moviesSearch : moviesStore.moviesNowPlaying;
});
</script>
