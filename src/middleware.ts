/**
 * @author Ollie Beenham
 *
 * Middleware component for authentication, provided by the next-auth (now auth.js) library.
 */

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Middleware to redirect to the sign-in page if the user is not authenticated.
 */
export default auth((req) => {
	// Prepare the redirect link
	const redirect = `${req.nextUrl.protocol}//${req.nextUrl.host}/api/auth/signin?redirectTo=${req.nextUrl.pathname}`;

	// If the user is not authenticated, redirect to the sign in page.
	if (!req.auth) return NextResponse.redirect(redirect);
	return NextResponse.next();
});

// Match anything under /dashboard and /api routes. Excluding the authentication route from the API.
export const config = { matcher: ["/dashboard(.*)", "/api/((?!auth).*)"] };
