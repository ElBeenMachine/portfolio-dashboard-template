/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { getAllProjects } from "@/lib/db/remote/queries";
import { NextResponse } from "next/server";

/**
 * API Route to get all projects
 *
 * @returns {Promise<NextResponse>} The response containing all projects
 */
export async function GET() {
	// Get the session
	const session = await auth();
	if (!session) return NextResponse.json({ error: "Unauthorised request" }, { status: 401 });

	const result = await getAllProjects();
	const projects = result?.projects || [];

	return NextResponse.json(projects);
}
