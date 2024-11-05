/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth";
import SignOutButton from "./SignOutButton";

/**
 * Dashboard home page
 *
 * @returns {JSX.Element} Dashboard home page
 */
export default async function DashboardHome() {
	// Get the user's session
	const session = await auth();

	return (
		<main>
			<h1 className="text-3xl text-semibold mb-5">Dashboard</h1>
			<p>
				Welcome to the dashboard, {session?.user?.name?.split(" ")[0]}!
				This is a protected page that can only be accessed by
				authenticated users.
			</p>

			{session && <SignOutButton />}
		</main>
	);
}
