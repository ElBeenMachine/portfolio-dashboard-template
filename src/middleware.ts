import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Handle the `/` route
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

	// Handle the `/dashboard/editor` route
	if (pathname === "/dashboard/editor") {
		// Create the redirect URL
		const redirectUrl = new URL(`${request.nextUrl.origin}/dashboard/projects`);

		// Redirect to the `/dashboard/projects` page
		return NextResponse.redirect(redirectUrl);
	}

	// Default response for other routes
	return NextResponse.next();
}

// Match the `/` and `/dashboard/editor` routes
export const config = {
	matcher: ["/", "/dashboard/editor"],
};
