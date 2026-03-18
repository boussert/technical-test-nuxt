<template>
    <h2>Films actuellement au cinéma</h2>
    <ul v-if="moviesStore.moviesNowPlaying.length" class="movie-cards-list__grid">
        <li v-for="movie in moviesStore.moviesNowPlaying" :key="movie.id">
            <MovieCard :movie="movie" />
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { useMoviesStore } from '~/store/movies';

const moviesStore = useMoviesStore();

const config = useRuntimeConfig();
const tmdbHeaderAuth = config.public.tmdbHeaderAuth;

async function fetchMoviesNowPlaying() {
    await moviesStore.fetchMoviesNowPlaying(tmdbHeaderAuth);
}

await fetchMoviesNowPlaying();
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