import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import ResultsComponent from "./ResultsComponent";
import { selectIsLoading, selectMovies } from "../../moviesSlice";

// Mocking redux useSelector hook
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
}));

describe("<ResultsComponent />", () => {
    beforeEach(() => {
        (useSelector as jest.Mock).mockClear();
    });

    it("renders loading skeletons when loading", () => {
        (useSelector as jest.Mock).mockImplementation((selector) => {
            if (selector === selectIsLoading) return true;
            if (selector === selectMovies) return [];
            return undefined;
        });

        const { getAllByTestId } = render(<ResultsComponent />);
        expect(getAllByTestId("skeleton-element").length).toBe(10);
    });

    it("renders movie posters when not loading", () => {
        const mockMovies = [
            { Title: "Matrix", Poster: "poster-url", imdbID: 1 },
            { Title: "Matrix Reloaded", Poster: "N/A", imdbID: 2 },
        ];

        (useSelector as jest.Mock).mockImplementation((selector) => {
            if (selector === selectIsLoading) return false;
            if (selector === selectMovies) return mockMovies;
            return undefined;
        });

        const { getByAltText } = render(<ResultsComponent />);
        expect(getByAltText("Matrix")).toBeInTheDocument();
        expect(() => getByAltText("Matrix Reloaded")).toThrow();
    });
});
