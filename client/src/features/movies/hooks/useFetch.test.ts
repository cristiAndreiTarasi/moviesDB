import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchMovies } from "./useFetchMovies";
import { fetchMoviesByTitle } from "../moviesApi";
import { ApiResponse, Movie } from "../types";
import { useDispatch } from "react-redux";
import { startLoading, setMovies, loadingFailed } from "../moviesSlice";

jest.useFakeTimers();

jest.mock("../moviesApi");
jest.mock("react-redux");

describe("useFetchMovies", () => {
    const mockDispatch = jest.fn();

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
      
    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        // Mock useDispatch to return our mockDispatch function
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should dispatch startLoading and then setMovies if fetching is successful", async () => {
        const mockData: Movie[] = [{ Title: "Test Movie", Year: "2000", Type: "movie", Poster: "", imdbID: "id1" }];
        const mockApiResponse: ApiResponse<Movie[]> = { success: true, data: mockData, message: "" };

        (fetchMoviesByTitle as jest.Mock).mockResolvedValue(mockApiResponse);

        const { result } = renderHook(() => useFetchMovies());

        await act(async () => {
            result.current("Test Movie");
            jest.runAllTimers(); // This will immediately run the callback in setTimeout
        });        

        expect(mockDispatch).toHaveBeenNthCalledWith(1, startLoading());
        expect(mockDispatch).toHaveBeenNthCalledWith(2, setMovies(mockData));
    });

    it("should dispatch startLoading and then loadingFailed if fetching is unsuccessful", async () => {
        const mockApiResponse: ApiResponse<Movie[]> = { success: false, data: [], message: "Error fetching" };

        (fetchMoviesByTitle as jest.Mock).mockResolvedValue(mockApiResponse);

        const { result } = renderHook(() => useFetchMovies());

        await act(async () => {
            result.current("Test Movie");
            jest.runAllTimers(); 
        });
        
        expect(mockDispatch).toHaveBeenNthCalledWith(1, startLoading());
        expect(mockDispatch).toHaveBeenNthCalledWith(2, loadingFailed("Error fetching"));        
    });
});
