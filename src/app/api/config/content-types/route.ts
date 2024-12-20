/**
 * @author Ollie Beenham
 */

import { getAllContentTypes } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";

/**
 * API Route to get all available content types
 *
 * @returns {Promise<NextResponse>} The response containing all available content types
 */
export async function GET() {
    // Query the local database for all available content types
    const contentTypes = await getAllContentTypes();
    return NextResponse.json(contentTypes);
}