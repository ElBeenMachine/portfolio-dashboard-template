/**
 * @author Ollie Beenham
 */

import { updateAuthBackground } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";

/**
 * API Route to update the auth background uri
 *
 * @returns {Promise<NextResponse>} A response containing the result of the query
 */
export async function POST(request: Request) {
	// Get the body
	const body = await request.json();

	// Get the url from the body
	const url = body.url || "/img/default-auth-background.jpg";

	try {
		// Update the title
		const response = await updateAuthBackground(url);

		// Return the update response
		return NextResponse.json({ status: response });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
