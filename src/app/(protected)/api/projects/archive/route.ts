/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { addAuditTrail, archiveProjectById } from "@/lib/db/remote/queries";
import Project from "@/types/project.interface";
import { NextRequest, NextResponse } from "next/server";

/**
 * Archive a project by ID
 *
 * @param request The request
 * @returns {Response} The response
 */
export async function POST(request: NextRequest) {
	// Get the session
	const session = await auth();
	if (!session) return NextResponse.json({ error: "Unauthorised request" }, { status: 401 });

	// Get the body
	const body = await request.json();

	// Get the id from the body
	const { _id } = body;

	// If no id was provided, return a 400 error
	if (!_id) return NextResponse.json({ error: "No project id provided" }, { status: 400 });

	// Archive the project
	const result = (await archiveProjectById(_id)) as Project;

	// If the project was not archived, return a 500 error
	if (!result) return NextResponse.json({ error: "Failed to archive project" }, { status: 500 });

	// Add an audit trail
	await addAuditTrail({
		name: session?.user?.name || "Unknown",
		action: "archived",
		project: result._id,
	});

	// Return the response
	return NextResponse.json({ status: "success" });
}
