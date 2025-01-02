import { Metadata } from "next";
import OnboardingForm from "./OnboardingForm";

export const metadata: Metadata = {
	title: "Onboarding",
};

export default function OnboardingStep() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<OnboardingForm />
		</div>
	);
}
