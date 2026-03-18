import type { IMovie } from "./IMovie";

export interface ITmdbMoviesResponse {
    dates: any;
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}