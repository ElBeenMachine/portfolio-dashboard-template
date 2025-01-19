/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { globalSearch } from "@/lib/db/remote/queries";
import { NextRequest, NextResponse } from "next/server";

/**
 * API Route to search globally across users and projects
 *
 * @returns {Promise<NextResponse>} The response containing the search results
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	// Get the session
	const session = await auth();
	if (!session) return NextResponse.json({ error: "Unauthorised request" }, { status: 401 });

	// Get the query string
	const query = request.nextUrl.searchParams.get("q");

	// Perform a global search
	const searchResults = await globalSearch(query as string, 10);

	return NextResponse.json(searchResults);
}
