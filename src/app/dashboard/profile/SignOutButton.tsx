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
		<button
			className="bg-gray-800 hover:bg-gray-600 px-5 py-3 text-white rounded-md transition-all mt-5"
			onClick={() => signOut({ redirect: true, redirectTo: "/" })}
		>
			Sign Out
		</button>
	);
}
