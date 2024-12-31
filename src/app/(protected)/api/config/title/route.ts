/**
 * @author Ollie Beenham
 */

import { updateTitle } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";

/**
 * API Route to update the dashboard title
 *
 * @returns {Promise<NextResponse>} A response containing the result of the query
 */
export async function POST(request: Request) {
	// Get the body
	const body = await request.json();

	// Check if the title is provided
	if (!body.title)
		return NextResponse.json({ error: new Error("No title provided") }, { status: 400 });

	try {
		// Update the title
		const response = await updateTitle(body.title);

		// Return the update response
		return NextResponse.json({ status: response });
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
