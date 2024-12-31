/**
 * @author Ollie Beenham
 */

import { getLogo } from "@/lib/db/local/queries";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

/**
 * API Route to get the dashboard icon
 *
 * @returns {Promise<NextResponse>} The response containing the logo
 */
export async function GET() {
	let logo = "/img/default-logo.jpg";

	try {
		logo = (await getLogo()).logo;
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	} finally {
		redirect(logo);
	}
}
