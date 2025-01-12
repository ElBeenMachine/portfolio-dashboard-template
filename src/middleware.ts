import { NextRequest, NextResponse } from "next/server";
import { getSetting } from "./lib/db/remote/queries";

export async function middleware(request: NextRequest) {
	// Get the pathname from the request
	const { pathname } = request.nextUrl;

	// Only handle the `/` route
	if (pathname === "/") {
		// Logic to determine the redirection
		const result = await fetch(new URL("/api/public/get-onboarded", request.url));
		const { onboarded } = await result.json();
		const redirectUrl = !onboarded ? "/onboarding" : "/dashboard";

		// Redirect to the appropriate page
		return NextResponse.redirect(new URL(redirectUrl, request.url));
	}

	// Default response for other routes
	return NextResponse.next();
}

// Match only the `/` route
export const config = {
	matcher: "/",
};
