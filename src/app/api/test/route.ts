/**
 * @author Ollie Beenham
 */

import { NextResponse } from "next/server";

/**
 * API Route to test the API authentication protection
 *
 * @returns
 */
export function GET() {
	return NextResponse.json({ message: "Hello, world!" });
}
