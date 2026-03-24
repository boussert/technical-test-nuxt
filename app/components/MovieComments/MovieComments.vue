<template>
    <div class="mt-8 p-4">
        <h2 class="text-lg font-semibold mb-4">Commentaires</h2>
        <MovieCommentList :movie-id="movieId" />
        <MovieCommentForm :movie-id="movieId" />
    </div>
</template>

<script setup lang="ts">
import MovieCommentForm from '~/components/MovieCommentForm/MovieCommentForm.vue';
import MovieCommentList from '~/components/MovieCommentList/MovieCommentList.vue';

const props = defineProps<{
  movieId: number;
}>();
</script>