import { getSetting } from "@/lib/db/remote/queries";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Onboarding",
};

export default async function OnboardingHome() {
	const onboardingState = (await getSetting("onboarded")).value;
	if (onboardingState) return redirect("/dashboard");

	return (
		<div className="flex flex-col items-center justify-center h-screen p-10 bg-gray-800 w-full">
			<div className="flex flex-col items-center justify-center gap-5">
				<h1 className="text-6xl font-bold">Welcome to Your Dashboard!</h1>
				<Link
					href={"/onboarding/go"}
					className="self-end  px-5 py-3 bg-gray-600 rounded-md hover:bg-gray-500 transition-all"
				>
					Get Started
				</Link>
			</div>
		</div>
	);
}
