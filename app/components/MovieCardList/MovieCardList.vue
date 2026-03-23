<template>
    <ul v-if="movies.length" class="movie-cards-list__grid">
        <li v-for="movie in movies" :key="movie.id">
            <MovieCard :movie="movie" />
        </li>
    </ul>
</template>

<script lang="ts" setup>
import type { IMovie } from '~/types/IMovie';

const props = defineProps<{
    movies: IMovie[]
}>()
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