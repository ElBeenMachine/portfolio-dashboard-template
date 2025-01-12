/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { getSetting } from "@/lib/db/remote/queries";
import { NextResponse } from "next/server";

/**
 * API Route to get all available content types
 *
 * @returns {Promise<NextResponse>} The response containing all available content types
 */
export async function GET() {
	// Get the session
	const session = await auth();
	if (!session) return NextResponse.json({ error: "Unauthorised request" }, { status: 401 });

	try {
		// Query the local database for all available content types
		const contentTypes = (await getSetting("contentTypes")).value;
		return NextResponse.json(contentTypes);
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
