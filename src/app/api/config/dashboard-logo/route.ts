/**
 * @author Ollie Beenham
 */

import { updateLogo } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";

/**
 * API Route to update the dashboard logo
 *
 * @returns {Promise<NextResponse>} A response containing the result of the query
 */
export async function POST(request: Request) {
	// Get the body
	const body = await request.json();

	// Get the url from the body
	const url = body.url || "/img/default-logo.jpg";

	try {
		// Update the title
		const response = await updateLogo(url);

		// Return the update response
		return NextResponse.json({ status: response });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
