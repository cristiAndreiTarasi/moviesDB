import { render } from "@testing-library/react";
import { LoadingSkeleton } from "./LoadingSkeleton";

describe("<LoadingSkeleton />", () => {
    it("renders correctly", () => {
        const { getByTestId } = render(<LoadingSkeleton />);
        expect(getByTestId("skeleton-element")).toBeInTheDocument();
    });
});
