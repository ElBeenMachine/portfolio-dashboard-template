/**
 * @author Ollie Beenham
 */

import { signIn } from "@/lib/auth";
import { NextRequest } from "next/server";

/**
 * API Route to log in with Entra ID
 *
 * @param {NextRequest} req The incoming request
 * @returns {Promise<void>} The response
 */
export function GET(req: NextRequest) {
	// Get the redirect URL from the query string
	const redirectURL = req.nextUrl.searchParams.get("redirectTo") || "/";

	// Sign in with Microsoft Entra ID
	return signIn("microsoft-entra-id", {
		redirectTo: redirectURL,
		redirect: true,
	});
}
