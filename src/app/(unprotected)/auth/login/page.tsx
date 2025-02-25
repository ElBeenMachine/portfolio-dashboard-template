/**
 * @author Ollie Beenham
 */

import { Metadata } from "next";
import LoginForm from "./LoginForm";
import IdentityProviders from "./IdentityProviders";
import { getSetting } from "@/lib/db/remote/queries";

/**
 * Metadata for the login page.
 */
export const metadata: Metadata = {
	title: "Login",
};

/**
 * Login page
 *
 * @returns {Promise<JSX.Element>} Login page
 */
export default async function Login({
	searchParams,
}: {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	// Get the redirect URL from the query string
	const redirectURL = ((await searchParams)?.redirectTo as string) || "/dashboard";

	// Get the error if it exists
	const error = ((await searchParams)?.error as string) || null;
	let errorMessage = null;

	switch (error) {
		case "CredentialsSignin":
			errorMessage = "Invalid email or password";
			break;
		case null:
			break;
		default:
			errorMessage = "An unexpected error occurred while trying to log in.";
	}

	// Get the app name
	const appName = (await getSetting("dashboardTitle")).value;

	// Redirect to the login page
	return (
		<div className="flex flex-col items-center justify-center gap-5 p-10 bg-white text-black w-full h-dvh rounded-none sm:rounded-xl sm:w-3/4 md:w-max md:min-w-[400px] sm:h-auto transition-all">
			<img src="/api/public/dashboard-logo" alt="Logo" className="w-24" />

			<h1 className="text-md text-center font-medium">{appName}</h1>

			{/* Login Form */}
			<LoginForm redirect={redirectURL} error={errorMessage} />

			{/* IDP Options */}
			<IdentityProviders redirect={redirectURL} />
		</div>
	);
}
