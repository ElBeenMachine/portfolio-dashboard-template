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
	try {
		const { logo } = await getLogo();
		redirect(logo);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
}
