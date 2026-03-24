<template>
  <div class="wrapper">
    <div class="full-bleed relative pa-4 pt-10 mb-12">
      <div class="absolute top-0 left-0 w-full h-full -z-1 max-h-[30rem]">
        <div class="movie__backdrop-overlay" />
        <img
          v-if="movieData?.backdrop_path"
          :src="`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movieData.backdrop_path}`"
          class="w-full h-full object-cover"
          alt="" 
          loading="lazy"
          width="500" 
          height="750"
        >
      </div>
      <div class="wrapper flex ga-8">
        <div class="flex ga-8">
          <div class="relative -inset-be-[40px] flex-0-0 overflow-hidden rounded-md w-[230px]">
            <img
              v-if="movieData?.poster_path"
              class="object-contain"
              :src="`https://image.tmdb.org/t/p/w500${movieData.poster_path}`"
              alt="" 
              loading="lazy"
              width="500" 
              height="750"
            >
          </div>

          <div class="relative text-white">
            <h1 class="text-headline-large font-semibold mb-4">
              {{ movieData?.title }}
            </h1>
            <p class="mb-4 max-w-[42rem]">
              {{ movieData?.overview }}
            </p>
            <div
              v-if="movieData?.genres.length"
              class="flex flex-wrap ga-2 mb-3"
            >
              <v-chip
                v-for="genre in movieData?.genres"
                :key="genre.id"
                variant="flat"
              >
                {{ genre.name }}
              </v-chip>
            </div>
            <div class="flex ga-8">
              <div
                v-if="movieData?.vote_average"
                class="flex align-center ga-2"
              >
                <v-icon
                  icon="mdi-star"
                  size="small"
                />
                {{ movieData.vote_average }} / 10
              </div>
              <div v-if="movieData?.vote_count">
                {{ movieData.vote_count }} votes
              </div>
            </div>
          </div>
        </div>
      </div>            
    </div>

    <div class="flex pa-4 ga-6 flex-column">
      <div v-if="movieDirectors">
        <h2 class="text-lg font-semibold mb-4">
          Réalisateurs
        </h2>
        <ul class="flex ga-4 flex-wrap">
          <li
            v-for="director in movieDirectors"
            :key="director.id"
          >
            <v-avatar
              :image="'https://image.tmdb.org/t/p/w185' + director.profile_path"
            />
            {{ director.name }}
          </li>
        </ul>
      </div>
      <div v-if="movieCast">
        <h2 class="text-lg font-semibold mb-4">
          Têtes d'affiche
        </h2>
        <ul class="flex ga-4 flex-wrap">
          <li
            v-for="actor in movieCast"
            :key="actor.id"
          >
            <v-avatar
              :image="'https://image.tmdb.org/t/p/w185' + actor.profile_path"
            />
            {{ actor.name }}
          </li>
        </ul>
      </div>
    </div>

    <MovieComments :movie-id="Number(movieId)" />
  </div>
</template>

<script setup lang="ts">
import type { IMovieDetail } from '~/types/IMovieDetail';
import MovieComments from '~/components/MovieComments/MovieComments.vue';

const route = useRoute();
const movieId = route.params.id;

const config = useRuntimeConfig();
const tmdbHeaderAuth = config.public.tmdbHeaderAuth;
const baseUrl = "https://api.themoviedb.org/3";

const { data: movieData, error, pending, refresh } = await useFetch<IMovieDetail>(
    `${baseUrl}/movie/${movieId}`,
    {
        method: 'GET',
        params: {
            language: 'fr-FR',
            append_to_response: 'credits'
        },
        headers: {
            'Authorization': `Bearer ${tmdbHeaderAuth}`,
            'Content-Type': 'application/json',
        },
        key: `movie-${movieId}`,
        immediate: !!movieId // Avoid to fetch the movie if there is no valid id
    }
);

const movieDirectors = computed(() => {
    return movieData.value?.credits.crew.filter(crewPerson => crewPerson.job === 'Director')
});

const movieCast = computed(() => {
  return movieData.value?.credits.cast.slice(0, 5);
});
</script>

<style lang="scss" scoped>
.movie__backdrop-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.9),
    rgba(0,0,0,0.6),
    transparent
  );
}
</style>