import { defineStore } from 'pinia';
import type { IMovie } from '~/types/IMovie';
import type { ITmdbMoviesResponse } from '~/types/ITmdbMoviesResponse';

export const useMoviesStore = defineStore('movies', () => {
    // Shared data between both movies "now playing" list and movie search list
    const loading = ref<boolean>(false);
    const baseUrl = "https://api.themoviedb.org/3";

    // Movies "now playing" data
    const moviesNowPlaying = ref<IMovie[]>([]);
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);
    const hasMoreNowPlayingPages = ref<boolean>(true);

    // Movies search data
    const searchQuery = ref<string>('');
    const lastSearchQuery = ref<string>('');
    const moviesSearch = ref<IMovie[]>([]);
    const currentSearchPage = ref<number>(1);
    const totalSearchPages = ref<number>(1);
    const hasMoreSearchPages = ref<boolean>(true);

    /** Minimum length needed for movie query that we are taking into account */
    const MOVIE_QUERY_MIN_LENGTH = 2;

    /**
     * @description Fetch movies that are now playing theaters
     * @param tmdbHeaderAuth Access Token Auth of TMDB that should be fetched from .env
     */
    async function fetchNextPageMovies(tmdbHeaderAuth: string) {
        if (loading.value || !hasMoreNowPlayingPages.value) return;

        try {
            loading.value = true;
            const endpoint = `${baseUrl}/movie/now_playing`;

            const data = await $fetch<ITmdbMoviesResponse>(endpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tmdbHeaderAuth}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    language: 'fr-FR',
                    page: currentPage.value
                }
            });

            moviesNowPlaying.value = [...moviesNowPlaying.value, ...data.results];
            currentPage.value++;
            totalPages.value = data.total_pages;
            hasMoreNowPlayingPages.value = currentPage.value <= totalPages.value;
        } catch (err) {
            console.error('Error while fetching next page of movies: ', err);
        } finally {
            loading.value = false;
        }
    }

    async function updateSearchQuery(tmdbHeaderAuth: string, query: string) {
        searchQuery.value = query;
        searchMovie(tmdbHeaderAuth);
    }

    async function searchMovie(tmdbHeaderAuth: string) {
        if (loading.value || searchQuery.value.length < MOVIE_QUERY_MIN_LENGTH) return;

        // We want to reset values if this is a new search
        if (searchQuery.value !== lastSearchQuery.value) {
            moviesSearch.value = [];
            currentSearchPage.value = 1;
            totalSearchPages.value = 1;
            hasMoreSearchPages.value = true;
            lastSearchQuery.value = searchQuery.value;
        }

        if (!hasMoreSearchPages) return;

        try {
            loading.value = true;

            const endpoint = `${baseUrl}/search/movie`;

            const data = await $fetch<ITmdbMoviesResponse>(endpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tmdbHeaderAuth}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    language: 'fr-FR',
                    page: currentSearchPage.value,
                    query: searchQuery.value
                }
            });

            moviesSearch.value = [...moviesSearch.value, ...data.results];
            currentSearchPage.value++;
            totalSearchPages.value = data.total_pages;
            hasMoreSearchPages.value = currentSearchPage.value <= totalSearchPages.value;
        } catch (err) {
            console.error('Error while searching movie: ', err);
        } finally {
            loading.value = false;
        }
    }

    return {
        fetchNextPageMovies,
        searchMovie,
        updateSearchQuery,
        currentPage,
        currentSearchPage,
        hasMoreNowPlayingPages,
        hasMoreSearchPages,
        loading,
        moviesNowPlaying,
        moviesSearch,
        searchQuery,
        totalPages,
        MOVIE_QUERY_MIN_LENGTH
    }
});