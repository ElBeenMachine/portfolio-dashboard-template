/**
 * @author Ollie Beenham
 */

import { updateMongoURI } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";

/**
 * API Route to update the database uri
 *
 * @returns {Promise<NextResponse>} A response containing the result of the query
 */
export async function POST(request: Request) {
	// Get the body
	const body = await request.json();

	// Check if the title is provided
	if (!body.uri)
		return NextResponse.json({ error: new Error("No uri provided") }, { status: 400 });

	try {
		// Update the title
		const response = await updateMongoURI(body.uri);

		// Return the update response
		return NextResponse.json({ status: response });
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
