/**
 * @author Ollie Beenham
 */

"use client";

import { signOut } from "next-auth/react";

/**
 * Sign out button
 *
 * @returns {JSX.Element} Sign out button
 */
export default function SignOutButton() {
	return (
		<button onClick={() => signOut({ redirect: true, redirectTo: "/" })}>
			Sign Out
		</button>
	);
}
