import React from 'react';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { StyledLink } from './ButtonStyles';

export type ButtonComponentProps = {
    title: string;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({ title }) => {
    const fetchMovies = useFetchMovies();

    const handleClick = async () => {
        try {
            await fetchMovies(title);
        } catch (error) {
            alert("Error fetching movies");
        }
    };

    return  <li className="nav-item">
        <StyledLink className="nav-link" onClick={handleClick}>{title}</StyledLink>
    </li>;
};

export default ButtonComponent;
