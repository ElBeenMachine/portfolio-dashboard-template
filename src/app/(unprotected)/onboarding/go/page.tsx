import { Metadata } from "next";
import OnboardingForm from "./OnboardingForm";

export const metadata: Metadata = {
	title: "Onboarding",
};

export default async function OnboardingStep() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="w-1/2 flex flex-col">
				<OnboardingForm />
			</div>
		</div>
	);
}
