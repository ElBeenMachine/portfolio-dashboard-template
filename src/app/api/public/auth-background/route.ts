/**
 * @author Ollie Beenham
 */

import { getAuthBackground } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

/**
 * API Route to get the auth background
 *
 * @returns {Promise<NextResponse>} The response containing the background
 */
export async function GET() {
	try {
		const { url } = await getAuthBackground();
		redirect(url);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
