/**
 * @author Ollie Beenham
 */

import { getSettings } from "@/lib/db/remote/queries";
import { NextResponse } from "next/server";

/**
 * API Route to get all stored settings
 *
 * @returns {Promise<NextResponse>} The response containing the settings
 */
export async function GET() {
	try {
		const settings = await getSettings();
		return NextResponse.json({ settings });
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
