/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { getSettings } from "@/lib/db/remote/queries";
import { NextResponse } from "next/server";

/**
 * API Route to get all stored settings
 *
 * @returns {Promise<NextResponse>} The response containing the settings
 */
export async function GET() {
	// Get the session
	const session = await auth();
	if (!session) return NextResponse.json({ error: "Unauthorised request" }, { status: 401 });

	try {
		const settings = await getSettings();
		return NextResponse.json({ settings });
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
