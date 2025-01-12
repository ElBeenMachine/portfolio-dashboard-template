import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	// Get the pathname from the request
	const { pathname } = request.nextUrl;

	// Only handle the `/` route
	if (pathname === "/") {
		// Determine where to redirect the user
		const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
		const url = new URL(`${protocol}://${request.nextUrl.host}/api/public/get-onboarded`);
		const result = await fetch(url);
		const { onboarded } = await result.json();
		const redirectUrl = !onboarded ? "/onboarding" : "/dashboard";

		console.log(`Redirecting to ${redirectUrl}`);

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
