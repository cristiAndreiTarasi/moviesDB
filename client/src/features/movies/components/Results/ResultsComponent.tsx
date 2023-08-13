
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectMovies } from '../../moviesSlice';
import { CenteredContent, GradientOverlay, StyledCard, StyledImage, StyledList } from './ResultsStyles';
import { LoadingSkeleton } from '../../../../shared/components/Loading/LoadingSkeleton';

const ResultsComponent: React.FC = () => {
    const movies = useSelector(selectMovies);
    const isLoading = useSelector(selectIsLoading);

    return (
        <div className="container">
            <StyledList>
                {isLoading 
                    ? Array(movies.length || 10).fill(0).map((_, index)  => <LoadingSkeleton key={index} />)
                    : movies.map((movie) => {
                        const hasPoster = !!movie.Poster && movie.Poster !== "N/A"
                        
                        return  <div className="" key={movie.imdbID}> 
                            <StyledCard style={{
                                backgroundColor: `${hasPoster ? 'transparent' : 'blue'}`   
                            }}>
                                {hasPoster && <StyledImage src={movie.Poster} className="" alt={movie.Title} />}
                                <GradientOverlay />
                                <CenteredContent>
                                    <h5 className="">{movie.Title}</h5>
                                </CenteredContent>
                            </StyledCard>
                        </div>
                    })}
            </StyledList>
        </div>
    );
};

export default ResultsComponent;