import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from "./features/movies/moviesSlice";

const mockInitialState = {
    moviesData: {
        metadata: [],
        isLoading: false,
        error: null
    }
};

export const mockStore = configureStore({
    reducer: {
        moviesData: moviesReducer
    },
    preloadedState: mockInitialState
});

describe("App", () => {
    it("renders the app", () => {
        render(
            <Provider store={mockStore}>
                <App />
            </Provider>
        );
        
        expect(screen.getByText('Matrix')).toBeInTheDocument();
        expect(screen.getByText('Matrix Reloaded')).toBeInTheDocument();
        expect(screen.getByText('Matrix Revolutions')).toBeInTheDocument();
    });
});
