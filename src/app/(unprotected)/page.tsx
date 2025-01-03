/**
 * @author Ollie Beenham
 */

import { getOnboardedState } from "@/lib/db/local/queries";
import { redirect } from "next/navigation";

/**
 * Landing page for the application
 *
 * @returns {JSX.Element} Home page
 */
export default async function Home() {
	const onboardedState = await getOnboardedState();

	/**
	 * If the user has onboarded, redirect them to the dashboard,
	 * otherwise, redirect them to the onboarding page
	 */
	if (onboardedState) {
		redirect("/dashboard");
	} else {
		redirect("/onboarding");
	}
}
