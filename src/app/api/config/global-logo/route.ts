/**
 * @author Ollie Beenham
 */

import { getLogo } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";

/**
 * API Route to get the dashboard icon
 *
 * @returns {Promise<NextResponse>} The response containing the logo
 */
export async function GET() {
    const { logo } = await getLogo();
    return NextResponse.json({ logo });
}