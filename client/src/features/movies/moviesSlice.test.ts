import moviesReducer, { startLoading, loadingFailed, setMovies, sortMovies } from "./moviesSlice";
import { Movie, MoviesState } from "./types";

describe("moviesSlice", () => {
    let initialState: MoviesState;

    beforeEach(() => {
        initialState = {
            metadata: [],
            isLoading: true,
            error: null,
        };
    });

    it("should handle startLoading action", () => {
        const nextState = moviesReducer(initialState, startLoading());
        expect(nextState.isLoading).toBe(true);
    });

    it("should handle loadingFailed action", () => {
        const error = "Error occurred";
        const nextState = moviesReducer(initialState, loadingFailed(error));
        expect(nextState.isLoading).toBe(false);
        expect(nextState.error).toBe(error);
    });

    it("should handle setMovies action", () => {
        const movies: Movie[] = [{ Title: "Matrix", Year: "1999", Type: "movie", Poster: "", imdbID: "id" }];
        const nextState = moviesReducer(initialState, setMovies(movies));
        expect(nextState.metadata).toEqual(movies);
        expect(nextState.isLoading).toBe(false);
        expect(nextState.error).toBe(null);
    });

    it("should handle sortMovies action", () => {
        const movies: Movie[] = [
            { Title: "Zorro", Year: "2000", Type: "movie", Poster: "", imdbID: "id_1" },
            { Title: "Batman", Year: "1995", Type: "movie", Poster: "", imdbID: "id_2" },
        ];
        initialState.metadata = movies;
        const nextState = moviesReducer(initialState, sortMovies("Title"));
        expect(nextState.metadata[0].Title).toBe("Batman");
        expect(nextState.metadata[1].Title).toBe("Zorro");
    });
});
