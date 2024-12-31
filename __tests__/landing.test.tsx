import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/(unprotected)/page";

describe("Home", () => {
	it("Renders a heading", () => {
		render(<Home />);

		const heading = screen.getByRole("heading", { level: 1 });

		expect(heading).toBeInTheDocument();
	});
});
