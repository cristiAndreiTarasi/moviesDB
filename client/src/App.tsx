import React, { useEffect } from 'react';
import ButtonComponent from './features/movies/components/Button/ButtonComponent';
import ResultsComponent from './features/movies/components/Results/ResultsComponent';
import SortingComponent from './features/movies/components/Sorting/SortingComponent';
import { SearchComponent } from './features/movies/components/Searching/SearchComponent';
import { useFetchMovies } from './features/movies/hooks/useFetchMovies';

function App() {
    const fetchMovies = useFetchMovies();

    useEffect(() => {
        fetchMovies("Matrix");
    }, [fetchMovies]);
    
    return (
        <div className="container-fluid bg-dark vh-100" style={{ overflowY: "auto" }}>
            <ul className="navbar navbar-dark bg-dark justify-content-center">
                <ButtonComponent title="Matrix" />
                <ButtonComponent title="Matrix Reloaded" />
                <ButtonComponent title="Matrix Revolutions" />
            </ul>
            
            <SearchComponent />
            <SortingComponent />
            <ResultsComponent />
        </div>
    );
}

export default App;
