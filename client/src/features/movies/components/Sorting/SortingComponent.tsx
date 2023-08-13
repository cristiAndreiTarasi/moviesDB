import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MovieSortableFields } from '../../types';
import { sortMovies } from '../../moviesSlice';

const SortingComponent = () => {
    const [sortField, setSortField] = useState<MovieSortableFields>("Title");
    const dispatch = useDispatch();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as MovieSortableFields;
        setSortField(value);

        dispatch(sortMovies(value));
    };

    return (
        <div className="d-flex justify-content-center">
            <label htmlFor="sort" className="text-light">Sort by: &nbsp;</label>
            <select id="sort" value={sortField} onChange={handleSortChange}>
                <option value="Title">Title</option>
                <option value="Year">Year</option>
                <option value="Type">Type</option>
            </select>
        </div>
    );
};

export default SortingComponent;
