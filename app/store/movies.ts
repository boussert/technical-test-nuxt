import { defineStore } from 'pinia';
import type { IMovie } from '~/types/IMovie';
import type { ITmdbMoviesResponse } from '~/types/ITmdbMoviesResponse';

export const useMoviesStore = defineStore('movies', () => {
    const moviesNowPlaying = ref<IMovie[]>([]);
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);
    const hasMorePages = ref<boolean>(true);
    const loading = ref<boolean>(false);
    const baseUrl = "https://api.themoviedb.org/3";

    /**
     * @description Fetch movies that are now playing theaters
     * @param tmdbHeaderAuth Access Token Auth of TMDB that should be fetched from .env
     */
    async function fetchNextPageMovies(tmdbHeaderAuth: string) {
        if (loading.value || !hasMorePages.value) return;

        try {
            loading.value = true;
            const nextPage = currentPage.value + 1;

            const endpoint = `${baseUrl}/movie/now_playing`;
            const headers = {
                'Authorization': `Bearer ${tmdbHeaderAuth}`,
                'Content-Type': 'application/json',
            };

            const data = await $fetch<ITmdbMoviesResponse>(endpoint, {
                method: 'GET',
                headers: headers,
                params: {
                    language: 'fr-FR',
                    page: nextPage
                }
            });
            moviesNowPlaying.value = [...moviesNowPlaying.value, ...data.results];
            currentPage.value = data.page;
            totalPages.value = data.total_pages;
            hasMorePages.value = data.page < data.total_pages;
        } catch (err) {
            console.error('Error while fetching next page of movies: ', err);
        } finally {
            loading.value = false;
        }
    }

    return {
        fetchNextPageMovies,
        currentPage,
        hasMorePages,
        loading,
        moviesNowPlaying,
        totalPages
    }
});