/**
 * @author Ollie Beenham
 */

import { getAllContentTypes } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";

/**
 * API Route to get all available content types
 *
 * @returns {Promise<NextResponse>} The response containing all available content types
 */
export async function GET() {
	try {
		// Query the local database for all available content types
		const contentTypes = await getAllContentTypes();
		return NextResponse.json(contentTypes);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
