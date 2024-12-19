/**
 * @author Ollie Beenham
 */

import { updateTitle } from "@/lib/db/local/queries";
import { NextRequest, NextResponse } from "next/server";

/**
 * API Route to update the dashboard title
 *
 * @returns {Promise<NextResponse>} A response containing the result of the query
 */
export async function POST( request: Request ) {
    // Get the body
    const body = await request.json();

    // Check if the title is provided
    if(!body.title) return NextResponse.json({ error: new Error("No title provided") }, { status: 400 });

    // Update the title
    const response = await updateTitle(body.title);

    // Return the update response
    return NextResponse.json({ status: response });
}