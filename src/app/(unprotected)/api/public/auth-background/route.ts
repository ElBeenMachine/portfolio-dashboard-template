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
	let url = "/img/default-auth-background.jpg";

	try {
		url = (await getAuthBackground()).url;
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	} finally {
		redirect(url);
	}
}
