export interface Movie {
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
    imdbID: string;
};

export interface MoviesState {
    metadata: Movie[],
    isLoading: boolean;
    error: string | null;
};

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
};

export type MovieSortableFields = "Title" | "Year" | "Type" | "imdbID";