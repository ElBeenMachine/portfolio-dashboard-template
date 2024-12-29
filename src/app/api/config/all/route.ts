/**
 * @author Ollie Beenham
 */

import { getAllSettings } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";

/**
 * API Route to get all stored settings
 *
 * @returns {Promise<NextResponse>} The response containing the settings
 */
export async function GET() {
	try {
		const settings = await getAllSettings();
		return NextResponse.json({ settings });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
