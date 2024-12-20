/**
 * @author Ollie Beenham
 */

import { getAllProjects } from "@/lib/db/remote/queries";
import { NextResponse } from "next/server";

/**
 * API Route to get all projects
 *
 * @returns {Promise<NextResponse>} The response containing all projects
 */
export async function GET() {
	const result = await getAllProjects();
	const projects = result?.projects || [];

	return NextResponse.json(projects);
}
