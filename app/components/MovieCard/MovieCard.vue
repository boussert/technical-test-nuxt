<template>
  <NuxtLink
    :to="`/movie/${movie.id}`"
    class="movie-card"
  >
    <div class="movie-card__image-container">
      <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        class="movie-card__image"
        alt="" 
        loading="lazy"
        width="500" 
        height="750"
      >
    </div>
    <h3 class="movie-card__title">
      {{ movie.title }}
    </h3>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { IMovie } from '~/types/IMovie';

defineProps<{
    movie: IMovie
}>()
</script>

<style lang="scss" scoped>
.movie-card {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    overflow: hidden;
    background: var(--clr-surface-a10);
    border-radius: 6px;

    &:hover {
        .movie-card__image {
            transform: scaleX(1.1) scaleY(1.1);
        }
        .movie-card__title {
            text-decoration: underline;
        }
    }

    &__image-container {
        height: 230px;
        background-color: var(--clr-surface-a20); // Default background color for placeholder in case the movie has no poster image
        overflow: hidden;
    }

    &__image {
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition-duration: 0.2s; // Transition for the transform effect on hover
    }

    &__title {
        padding: 12px;
        min-height: 95px;
    }
}
</style>