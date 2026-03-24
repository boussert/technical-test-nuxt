<template>
  <div class="flex flex-column ga-4">
    <v-card
      v-for="comment in comments"
      :key="comment.id"
      :data-author="comment.username"
      color="surfaceA10"
      role="comment"
      variant="flat"
    >
      <v-card-text>
        <div class="flex justify-between ga-3 mb-3">
          <div>
            <div class="text-caption">
              {{ comment.username }}
            </div>
            <div class="text-medium-emphasis">
              {{ new Date(comment.createdAt).toLocaleDateString() }}
            </div>
          </div>
          <v-progress-circular
            v-if="comment.rating"
            :model-value="ratingPercentage(comment.rating)"
            :size="40"
          >
            {{ comment.rating }}
          </v-progress-circular>
        </div>
        <div
          class="text-body-large"
          v-html="comment.message"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useCommentsStore } from '~/store/comments';

const props = defineProps<{
  movieId: number;
}>();

const commentsStore = useCommentsStore();

onMounted(() => {
  commentsStore.loadComments();
});

const comments = computed(() =>
  commentsStore.getCommentsByMovie(props.movieId)
);

/**
 * @description Returns the rating value in percentage
 * @param rating Rating a is number between 1-10
 */
const ratingPercentage = (rating: number) => {
    return rating * 10;
}
</script>