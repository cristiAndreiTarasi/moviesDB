import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieSortableFields, MoviesState } from './types';

const initialState: MoviesState = {
    metadata: [],
    isLoading: true,
    error: null,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        startLoading: state  => {
            state.isLoading = true;
        },

        loadingFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.metadata = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        sortMovies: (state, action: PayloadAction<MovieSortableFields>) => {
            const field = action.payload;

            state.metadata.sort((a, b) => {
                if (a[field] < b[field]) return -1;
                if (a[field] > b[field]) return 1;

                return 0;
            });
        },
    },
});

export const { setMovies, sortMovies, startLoading, loadingFailed } = moviesSlice.actions;

export const selectMovies = (state: { moviesData: MoviesState }): Movie[] => state.moviesData.metadata;
export const selectIsLoading = (state: { moviesData: MoviesState }): boolean => state.moviesData.isLoading;
export const selectError = (state: { moviesData: MoviesState }): string | null => state.moviesData.error;

export default moviesSlice.reducer;
