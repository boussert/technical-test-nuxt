<template>
    <div class="mt-8 p-4">
        <h3 class="text-lg font-semibold mb-4">Commentaires</h3>
        <MovieCommentForm :movie-id="movieId" />
    </div>
</template>

<script setup lang="ts">
import MovieCommentForm from '~/components/MovieCommentForm/MovieCommentForm.vue';

const props = defineProps<{
  movieId: number;
}>();
</script>