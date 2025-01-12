/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";

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
			<div className="w-[calc(100%+40px)] p-2 text-center bg-red-500 -ml-5 -mt-5 mb-5">
				<p className="text-white">
					WARNING: Any authenticated user can access and edit portfolio properties. Ensure
					user and group access is configured in Entra.
				</p>
			</div>
			<h1 className="text-3xl text-semibold mb-5">Dashboard</h1>
			<p>
				Welcome to the dashboard, {session?.user?.name?.split(" ")[0]}! This is a protected
				page that can only be accessed by authenticated users.
			</p>
		</main>
	);
}
