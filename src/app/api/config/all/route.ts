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
	const settings = await getAllSettings();
	return NextResponse.json({ settings });
}
