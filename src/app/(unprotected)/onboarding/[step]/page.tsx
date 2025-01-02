import OnboardingNavigation from "./Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Onboarding",
};

export default function OnboardingStep() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-6xl font-bold">Onboarding Page</h1>

			<OnboardingNavigation />
		</div>
	);
}
