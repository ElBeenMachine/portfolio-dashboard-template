import OnboardingForm from "./OnboardingForm";
import { getSetting } from "@/lib/db/remote/queries";
import { redirect } from "next/navigation";

export default async function OnboardingStep() {
	const onboardingState = (await getSetting("onboarded")).value;
	if (onboardingState) return redirect("/");

	return (
		<div className="flex flex-col items-center justify-center h-dvh w-full bg-gray-800">
			<div className="w-1/2 flex flex-col">
				<OnboardingForm />
			</div>
		</div>
	);
}
