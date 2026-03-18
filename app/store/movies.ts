import { defineStore } from 'pinia';
import type { IMovie } from '~/types/IMovie';
import type { ITmdbMoviesResponse } from '~/types/ITmdbMoviesResponse';

export const useMoviesStore = defineStore('movies', () => {
    const moviesNowPlaying = ref<IMovie[]>([]);
    const loading = ref<boolean>(false);

    /**
     * @description Fetch movies that are now playing theaters
     * @param tmdbHeaderAuth Access Token Auth of TMDB that should be fetched from .env
     */
    async function fetchMoviesNowPlaying(tmdbHeaderAuth: string) {
        try {
            loading.value = true;

            const baseUrl = "https://api.themoviedb.org/3";
            const endpoint = `${baseUrl}/movie/now_playing?language=fr-FR&page=1`;
            const headers = {
                'Authorization': `Bearer ${tmdbHeaderAuth}`,
                'Content-Type': 'application/json',
            };

            const data = await $fetch<ITmdbMoviesResponse>(endpoint, {
                method: 'GET',
                headers: headers,
            });
            moviesNowPlaying.value = data.results;
        } catch (err) {
            console.error('Error while fetching all movies: ', err);
        } finally {
            loading.value = false;
        }
    }

    return {
        fetchMoviesNowPlaying,
        moviesNowPlaying
    }
});