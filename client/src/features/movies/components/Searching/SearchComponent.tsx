import React from "react";
import { useFetchMovies } from "../../hooks/useFetchMovies";

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const fetchMovies = useFetchMovies();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        fetchMovies(searchQuery);
        setSearchQuery("");
    };

    return (
        <div className="d-flex justify-content-center my-3">
            <form style={{ width: "50%" }} className="input-group mb-3" onSubmit={handleSearchSubmit}>
                <input
                    value={searchQuery}
                    onChange={handleSearchChange} 
                    type="text" 
                    className="form-control" 
                    placeholder="Search for a movie..." 
                    aria-label="" 
                    aria-describedby="button-addon2" 
                />
                <button className="btn btn-primary" type="submit" id="button-addon2">Get Movies</button>
            </form>
        </div>
    );
}

export { SearchComponent };