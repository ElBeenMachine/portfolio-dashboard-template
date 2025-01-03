import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import OnboardingHome from "@/app/(unprotected)/onboarding/page";

// Homepage test
describe("Home", () => {
	it("Renders a heading", () => {
		render(<OnboardingHome />);

		const heading = screen.getByRole("heading", { level: 1 });

		expect(heading).toBeInTheDocument();
	});
});
