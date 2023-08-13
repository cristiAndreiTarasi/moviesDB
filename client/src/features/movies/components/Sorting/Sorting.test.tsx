import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer, { sortMovies } from "../../moviesSlice";

import SortingComponent from "./SortingComponent";

describe("SortingComponent", () => {
    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: moviesReducer,
        });
        store.dispatch = jest.fn();
    });

    it("should handle sort change", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <SortingComponent />
            </Provider>
        );

        const selectElem = getByLabelText("Sort by:") as HTMLSelectElement;
        expect(selectElem.value).toBe("Title"); 

        fireEvent.change(selectElem, { target: { value: "Year" } });
        expect(selectElem.value).toBe("Year");

        expect(store.dispatch).toHaveBeenCalledWith(sortMovies("Year")); 
    });
});
