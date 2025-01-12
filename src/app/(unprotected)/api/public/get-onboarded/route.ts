/**
 * @author Ollie Beenham
 */

import { getSetting } from "@/lib/db/remote/queries";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

/**
 * API Route to get the onboarded state
 *
 * @returns {Promise<NextResponse>} The response containing the onboarded state
 */
export async function GET() {
	let state = false;

	try {
		state = Boolean((await getSetting("onboarded")).value);
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	} finally {
		return NextResponse.json({ onboarded: state });
	}
}
