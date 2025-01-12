/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { updateSetting } from "@/lib/db/remote/queries";
import { NextResponse } from "next/server";

/**
 * API Route to update the auth background uri
 *
 * @returns {Promise<NextResponse>} A response containing the result of the query
 */
export async function POST(request: Request) {
	// Get the session
	const session = await auth();
	if (!session) return NextResponse.json({ error: "Unauthorised request" }, { status: 401 });

	// Get the body
	const body = await request.json();

	// Get the url from the body
	const url = body.url || "https://bingw.jasonzeng.dev?resolution=1920x1080&index=random";

	try {
		// Update the title
		const response = await updateSetting("authBackground", url);

		// Return the update response
		return NextResponse.json({ status: response });
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
