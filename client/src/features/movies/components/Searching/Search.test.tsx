import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SearchComponent } from "./SearchComponent"; // Update with the correct relative path
import { useFetchMovies } from "../../hooks/useFetchMovies";

jest.mock("../../hooks/useFetchMovies");

describe("SearchComponent", () => {
    let mockFetchMovies: jest.Mock;

    beforeEach(() => {
        mockFetchMovies = jest.fn();
        (useFetchMovies as jest.Mock).mockReturnValue(mockFetchMovies);
    });

    it("updates the search input value when typed into", () => {
        const { getByPlaceholderText } = render(<SearchComponent />);
        const searchInput = getByPlaceholderText("Search for a movie...") as HTMLInputElement;

        fireEvent.change(searchInput, { target: { value: "Matrix" } });

        expect(searchInput.value).toBe("Matrix");
    });

    it("calls fetchMovies with the search input value when the form is submitted", () => {
        const { getByPlaceholderText, getByText } = render(<SearchComponent />);
        const searchInput = getByPlaceholderText("Search for a movie...") as HTMLInputElement;

        fireEvent.change(searchInput, { target: { value: "Matrix" } });
        fireEvent.click(getByText("Get Movies"));

        expect(mockFetchMovies).toHaveBeenCalledWith("Matrix");
    });

    it("resets the input value after form submission", () => {
        const { getByPlaceholderText, getByText } = render(<SearchComponent />);
        const searchInput = getByPlaceholderText("Search for a movie...") as HTMLInputElement;

        fireEvent.change(searchInput, { target: { value: "Matrix" } });
        fireEvent.click(getByText("Get Movies"));

        expect(searchInput.value).toBe("");
    });
});
