<template>
    <NuxtLink to="/" class="back-link">Accueil</NuxtLink>
    <div class="flex gap-4">
        <div class="movie__image-container">
            <img
                v-if="movieData?.poster_path"
                :src="`https://image.tmdb.org/t/p/w500${movieData.poster_path}`"
                class="movie-card__image"
                alt="" 
                loading="lazy"
                width="500" 
                height="750"
            />
        </div>

        <div class="flex-1">
            <h1>{{ movieData?.title }}</h1>
            <p>{{ movieData?.overview }}</p>
            <ul v-if="movieData?.genres.length">
                <li v-for="genre in movieData?.genres" :key="genre.id">
                    {{  genre.name }}
                </li>
            </ul>
            <div v-if="movieData?.vote_average">{{  movieData.vote_average }} / 10</div>
            <div v-if="movieData?.vote_count">{{  movieData.vote_count }} votes</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMovieDetail } from '~/types/IMovieDetail';

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
</script>