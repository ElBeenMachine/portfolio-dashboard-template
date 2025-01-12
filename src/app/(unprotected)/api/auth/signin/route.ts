/**
 * @author Ollie Beenham
 */

import { signIn } from "@/lib/auth/auth";
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
	const provider = req.nextUrl.searchParams.get("provider") || "local";

	// Sign in with Microsoft Entra ID
	return signIn(provider, {
		redirectTo: redirectURL,
		redirect: true,
	});
}
