/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { addAuditTrail, updateSetting } from "@/lib/db/remote/queries";
import { NextResponse } from "next/server";

/**
 * API Route to update the dashboard title
 *
 * @returns {Promise<NextResponse>} A response containing the result of the query
 */
export async function POST(request: Request) {
	// Get the session
	const session = await auth();
	if (!session) return NextResponse.json({ error: "Unauthorised request" }, { status: 401 });

	// Get the body
	const body = await request.json();

	// Check if the title is provided
	if (!body.title)
		return NextResponse.json({ error: new Error("No title provided") }, { status: 400 });

	try {
		// Update the title
		const response = await updateSetting("dashboardTitle", body.title);

		// Return the update response
		return NextResponse.json({ status: response });
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
