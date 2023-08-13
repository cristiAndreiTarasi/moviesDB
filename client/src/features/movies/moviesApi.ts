import { fetchAPIInstace } from "../../shared/utils/fetchApiInstance";
import { ApiResponse, Movie } from "./types";

export const fetchMoviesByTitle = async (title: string): Promise<ApiResponse<Movie[]>> => {
    try {
        const response: ApiResponse<Movie[]> = await fetchAPIInstace(`/movie/${title}`);

        return response;
    } catch (error) {
        throw error;
    }
};