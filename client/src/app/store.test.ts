import { store } from "./store";
import { startLoading, setMovies } from "../features/movies/moviesSlice";

describe("Redux Store", () => {
    it("should handle the startLoading action", () => {
        store.dispatch(startLoading());
        const currentState = store.getState();
        expect(currentState.moviesData.isLoading).toBe(true);
    });

    it("should handle the setMovies action", () => {
        const mockMovies = [
            { Title: "Matrix", Year: "1999", Type: "movie", Poster: "", imdbID: "id" }
        ];
        
        store.dispatch(setMovies(mockMovies));
        const currentState = store.getState();
        expect(currentState.moviesData.metadata).toEqual(mockMovies);
        expect(currentState.moviesData.isLoading).toBe(false);
    });
});
