import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	// Get the pathname from the request
	const { pathname } = request.nextUrl;

	// Only handle the `/` route
	if (pathname === "/") {
		// Determine where to redirect the user
		const protocol = request.nextUrl.protocol === "https:" ? "https" : "http";
		const host = request.headers.get("host");
		const url = new URL(`${protocol}://${host}/api/public/get-onboarded`);

		// Check the onboarded status
		const result = await fetch(url);
		const { onboarded } = await result.json();

		// Create the redirect URL
		const redirectUrl = new URL(
			`${protocol}://${host}${!onboarded ? "/onboarding" : "/dashboard"}`
		);

		// Redirect to the appropriate page
		return NextResponse.redirect(redirectUrl);
	}

	// Default response for other routes
	return NextResponse.next();
}

// Match only the `/` route
export const config = {
	matcher: "/",
};
