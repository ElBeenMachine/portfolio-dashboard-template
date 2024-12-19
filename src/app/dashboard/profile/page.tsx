/**
 * @author Ollie Beenham
 */

import { auth, signOut } from "@/lib/auth";
import { Metadata } from "next";
import SignOutButton from "./SignOutButton";

/**
 * Export the metadata for the page
 */
export const metadata: Metadata = {
	title: "Profile",
};

/**
 * Dashboard profile page
 *
 * @returns {JSX.Element} Dashboard profile page
 */
export default async function ProfilePage() {
	// Get the user's session
	const session = await auth();

	return (
		<main className="h-[10000px]">
			<h1 className="text-3xl text-semibold mb-5">Profile</h1>
			<p>
				Welcome to your profile, {session?.user?.name?.split(" ")[0]}!
			</p>

			{session && <SignOutButton />}
		</main>
	);
}
