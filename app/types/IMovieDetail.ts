import type { ICreditCast } from "./ICreditCast";
import type { ICreditCrew } from "./ICreditCrew";

export interface IMovieDetail {
    backdrop_path: string;
    credits: {
        cast: ICreditCast[];
        crew: ICreditCrew[];
    }
    genres: {
        id: number;
        name: string;
    }[];
    id: number;
    overview: string;
    poster_path: string;
    title: string;
    vote_average: number;
    vote_count: number;
}
