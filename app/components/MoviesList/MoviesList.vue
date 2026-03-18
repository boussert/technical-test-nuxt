<template>
    Movies list
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