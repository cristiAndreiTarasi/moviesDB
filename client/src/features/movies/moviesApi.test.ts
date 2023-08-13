import { fetchMoviesByTitle } from "./moviesApi";
import { fetchAPIInstace } from "../../shared/utils/fetchApiInstance";
import { ApiResponse, Movie } from "./types";

// Mock the fetchAPIInstace
jest.mock("../../shared/utils/fetchApiInstance");

describe("moviesApi", () => {
    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });

    it("should fetch movies by title successfully", async () => {
        // Mock resolved value
        (fetchAPIInstace as jest.Mock).mockResolvedValueOnce({
            data: [{ Title: "Matrix", Year: "1999", Type: "movie", Poster: "", imdbID: "id" }],
        });

        const response: ApiResponse<Movie[]> = await fetchMoviesByTitle("Matrix");

        expect(response.data[0].Title).toBe("Matrix");
        expect(fetchAPIInstace).toHaveBeenCalledWith("/movie/Matrix");
    });

    it("should throw error if fetch fails", async () => {
        // Mock rejected value
        (fetchAPIInstace as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

        await expect(fetchMoviesByTitle("Matrix")).rejects.toThrow("Failed to fetch");
        expect(fetchAPIInstace).toHaveBeenCalledWith("/movie/Matrix");
    });
});
