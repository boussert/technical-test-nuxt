<template>
    <h2>Films actuellement au cinéma</h2>
    <ul v-if="moviesStore.moviesNowPlaying.length" class="movie-cards-list__grid">
        <li v-for="movie in moviesStore.moviesNowPlaying" :key="movie.id">
            <MovieCard :movie="movie" />
        </li>
    </ul>
    <div ref="infiniteLoaderRef">
      <p v-if="moviesStore.loading">
        Chargement...
      </p>
    </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core';
import { useMoviesStore } from '~/store/movies';

const moviesStore = useMoviesStore();

const config = useRuntimeConfig();
const tmdbHeaderAuth = config.public.tmdbHeaderAuth;
const infiniteLoaderRef = ref(null);

// Fetch next page of movies each time we are at the end of the list
const { stop } = useIntersectionObserver(
  infiniteLoaderRef,
  ([entry]) => {
    if (entry?.isIntersecting && !moviesStore.loading && moviesStore.hasMorePages) {
      moviesStore.fetchNextPageMovies(tmdbHeaderAuth);
    }
  },
  { rootMargin: '200px' }
);

onUnmounted(() => stop());
</script>

<style lang="scss" scoped>
.movie-cards-list {
    &__grid {
        display: grid;
        grid-gap: 32px;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    }
}
</style>