import { SkeletonElement, SkeletonStyledCard } from "./LoadingStyles";

const LoadingSkeleton: React.FC = () => {
    return (
        <SkeletonStyledCard>
            <SkeletonElement data-testid="skeleton-element" />
        </SkeletonStyledCard>
    );
};

export { LoadingSkeleton };