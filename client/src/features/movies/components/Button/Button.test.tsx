import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonComponent from './ButtonComponent';
import { useFetchMovies } from '../../hooks/useFetchMovies';

// Mocking the hook useFetchMovies
jest.mock('../../hooks/useFetchMovies');

describe('<ButtonComponent />', () => {

    beforeEach(() => {
        (useFetchMovies as jest.Mock).mockClear();
    });

    it('renders correctly', () => {
        const { getByText } = render(<ButtonComponent title="Matrix" />);
        expect(getByText('Matrix')).toBeInTheDocument();
    });

    it('calls fetchMovies on button click', async () => {
        const mockFetchMovies = jest.fn();
        (useFetchMovies as jest.Mock).mockReturnValue(mockFetchMovies);

        const { getByText } = render(<ButtonComponent title="Matrix" />);
        fireEvent.click(getByText('Matrix'));

        expect(mockFetchMovies).toHaveBeenCalledWith("Matrix");
    });

    it('displays an alert on fetchMovies error', async () => {
        const mockFetchMovies = jest.fn(() => {
            throw new Error("Failed to fetch");
        });

        (useFetchMovies as jest.Mock).mockReturnValue(mockFetchMovies);

        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

        const { getByText } = render(<ButtonComponent title="Matrix" />);
        fireEvent.click(getByText('Matrix'));

        expect(mockAlert).toHaveBeenCalledWith('Error fetching movies');

        mockAlert.mockRestore();
    });
});
