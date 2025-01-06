/**
 * @author Ollie Beenham
 */

import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { getSetting } from "@/lib/db/remote/queries";

/**
 * API Route to get the auth background
 *
 * @returns {Promise<NextResponse>} The response containing the background
 */
export async function GET() {
	let url: string = "";

	try {
		url = String((await getSetting("authBackground")).value);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	} finally {
		redirect(url);
	}
}
