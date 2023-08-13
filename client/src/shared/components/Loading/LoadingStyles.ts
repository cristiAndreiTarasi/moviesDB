import styled from 'styled-components';
import { StyledCard } from '../../../features/movies/components/Results/ResultsStyles';

const SkeletonElement = styled.div`
    background: linear-gradient(45deg, rgba(224, 224, 224, 0.1) 25%, rgba(248, 248, 248, 0.1) 50%, rgba(224, 224, 224, 0.1) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    height: 100%;
    width: 100%;

    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }
`;

const SkeletonStyledCard = styled(StyledCard)`
    border-color: 10px solid rgba(255, 255, 255, 0.1); 
`;

export { SkeletonElement, SkeletonStyledCard };
