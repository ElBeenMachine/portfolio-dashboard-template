/**
 * @author Ollie Beenham
 */

import { getSetting } from "@/lib/db/remote/queries";
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
		logo = String((await getSetting("dashboardLogo")).value);
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	} finally {
		redirect(logo);
	}
}
