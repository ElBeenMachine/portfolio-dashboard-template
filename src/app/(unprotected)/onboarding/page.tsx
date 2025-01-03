import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Onboarding",
};

export default function OnboardingHome() {
	return (
		<div className="flex flex-col items-center justify-center h-screen p-10">
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
