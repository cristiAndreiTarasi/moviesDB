
import { useDispatch } from "react-redux";
import { fetchMoviesByTitle } from "../moviesApi";
import { loadingFailed, setMovies, startLoading } from "../moviesSlice";
import { useCallback } from "react";
import { ApiResponse, Movie } from "../types";

export const useFetchMovies = () => {
    const dispatch = useDispatch();

    const fetchData = useCallback(async (title: string) => {
        dispatch(startLoading());
        
        // small delay to have time to observe the loading skeleton
        setTimeout(async () => {
            try {
                const response: ApiResponse<Movie[]> = await fetchMoviesByTitle(title);
    
                if (response.success) dispatch(setMovies(response.data));
                else dispatch(loadingFailed(response.message)); 
            } catch (error) {
                dispatch(loadingFailed("Fetching movies failed."));
                console.error("Fetching movies failed: ", error);
            };
        });
    }, [dispatch]);

    return fetchData;
};

